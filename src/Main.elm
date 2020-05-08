module Main exposing (main)

import Browser
import Dict exposing (Dict)
import Html exposing (Html)

import Http
import Json.Decode as Decode exposing (Decoder, at, field, list, dict, maybe, string, int)

import Element exposing (..)
import Element.Input as Input
import Element.Font as Font
import Element.Background as Background
import Element.Border as Border
import Element.Lazy exposing (lazy)
import Element.Events as Events

import ElmTextSearch


main : Program () Model Msg
main = Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

subscriptions : Model -> Sub Msg
subscriptions _ = Sub.none

type alias Manifest =
    { presNodeUrl : String
    , collectibleUrl : String
    , itemDefUrl : String
    }

decodeManifest : Decoder Manifest
decodeManifest =
    at [ "Response", "jsonWorldComponentContentPaths", "en" ] <|
        Decode.map3 Manifest
            ( field "DestinyPresentationNodeDefinition" string )
            ( field "DestinyCollectibleDefinition" string )
            ( field "DestinyInventoryItemDefinition" string )

type alias RawItem =
    { name : String
    , icon : Maybe String
    , screenshot : Maybe String
    , description : Maybe String
    , classType : Int
    }

type ItemState
    = Valid
    | Invalid

type alias Item =
    { state : ItemState
    , hash : String
    , name : String
    , icon : String
    , screenshot : String
    , description : String
    , classType : Int
    }

defaultItem : Item
defaultItem = 
    Item Invalid "" "Unknown" "" "" "" -1

decodeRawItem : Decoder RawItem
decodeRawItem =
    Decode.map5 RawItem
        ( field "displayProperties" <| field "name" string )
        ( field "displayProperties" <| maybe <| field "icon" string )
        ( maybe <| field "screenshot" string )
        ( field "displayProperties" <| maybe <| field "description" string )
        ( field "classType" int )

resolveItem : String -> RawItem -> Dict String Item -> Dict String Item
resolveItem hash item accumulator =
    case ( item.icon, item.screenshot, item.description ) of
        ( Just icon, Just screenshot, Just description ) ->
            Dict.insert hash ( Item Valid hash item.name icon screenshot description item.classType ) accumulator
        _ ->
            accumulator

resolveItems : Dict String RawItem -> Dict String Item
resolveItems ridict =
    Dict.foldl resolveItem Dict.empty ridict

decodeItems : Decoder (Dict String Item)
decodeItems =
    Decode.map resolveItems ( dict decodeRawItem )

type alias RawCollectible =
    { name : Maybe String
    , itemHash : String
    }

type alias Collectible =
    { name : String
    , item : Item
    }

decodeRawCollectible : Decoder RawCollectible
decodeRawCollectible =
    Decode.map2 RawCollectible
        ( field "displayProperties" <| maybe <| field "name" string )
        ( Decode.map String.fromInt <| field "itemHash" int )

resolveCollectible : Dict String Item -> String -> RawCollectible -> Dict String Collectible -> Dict String Collectible
resolveCollectible idict hash rc accumulator =
    case ( rc.name, Dict.get rc.itemHash idict ) of
        ( Just name, Just item ) ->
            Dict.insert hash ( Collectible name item ) accumulator
        _ ->
            accumulator

resolveCollectibles : Dict String Item -> Dict String RawCollectible -> Dict String Collectible
resolveCollectibles idict rcdict =
    Dict.foldl ( resolveCollectible idict ) Dict.empty rcdict

decodeCollectibles : Dict String Item -> Decoder (Dict String Collectible)
decodeCollectibles idict =
    Decode.map
        ( resolveCollectibles idict )
        ( dict decodeRawCollectible )

type alias RawPresNode =
    { name : Maybe String
    , children : Maybe (List String)
    }

decodeRawPresNode : Decoder RawPresNode
decodeRawPresNode =
    Decode.map2 RawPresNode
        ( field "displayProperties" <| maybe <| field "name" string )
        ( at [ "children", "collectibles" ] <| maybe <| list <|
            Decode.map String.fromInt <| field "collectibleHash" int )

resolveCList : Dict String Collectible -> String -> List Item -> List Item
resolveCList cdict hash accumulator =
    case Dict.get hash cdict of
        Just c -> c.item :: accumulator
        Nothing -> accumulator

resolvePresNode : Dict String Collectible -> String -> RawPresNode -> Data -> Data
resolvePresNode cdict _ pn accumulator =
    let 
        clist = case pn.children of
            Just ls -> List.foldl ( resolveCList cdict ) [] ls
            Nothing -> []
    in
        case ( pn.name, List.isEmpty clist ) of
            ( Just name, False ) ->
                Dict.insert name clist accumulator
            _ ->
                accumulator


resolvePresNodes : Dict String Collectible -> Dict String RawPresNode -> Data
resolvePresNodes cdict pndict =
    Dict.foldl ( resolvePresNode cdict ) Dict.empty pndict

decodePresNodes : Dict String Collectible -> Decoder Data
decodePresNodes cdict =
    Decode.map
        ( resolvePresNodes cdict )
        ( dict decodeRawPresNode )

type alias ErrorType = Http.Error
type alias Data = Dict String (List Item)

type alias Doc =
    { hash : String
    , name : String
    , presNode : String
    , description : String
    }

type alias Index = ElmTextSearch.Index Doc

foldIList : String -> Item -> Index -> Index
foldIList presNode item index =
    let
        r = ElmTextSearch.add
            { hash = item.hash
            , name = item.name
            , presNode = presNode
            , description = item.description
            }
            index
    in
        case r of
            Ok i -> i
            Err _ -> index

        

foldData : String -> List Item -> Index -> Index
foldData presNode items index =
    List.foldl ( foldIList presNode ) index items

createIndex : Data -> Index
createIndex data =
    Dict.foldl foldData
    ( ElmTextSearch.new
        { ref = .hash
        , fields =
            [ ( .presNode, 3.0 )
            , ( .name, 2.0 )
            , ( .description, 1.0 )
            ]
        , listFields = []
        }
    )
    data

sortMap : List (String, Float) -> Dict String Item -> List Item
sortMap l idict =
    List.map
        (\t -> Maybe.withDefault defaultItem <| Dict.get ( Tuple.first t ) idict )
        ( List.sortBy Tuple.second l )

search : String -> Index -> Dict String Item -> Result String ( List Item )
search string index idict =
    Result.map
        (\t -> sortMap (Tuple.second t ) idict )
        <| ElmTextSearch.search string index

type State
    = Error ErrorType
    | Loading String
    | Ready Index (Dict String Item)

type FilterType
    = None
    | Hunter
    | Warlock
    | Titan

validFilters : List FilterType
validFilters = [ Hunter, Warlock, Titan ]

filterStr : FilterType -> String
filterStr ft =
    case ft of
        None ->
            "No Filter"
        Hunter ->
            "Hunter"
        Warlock ->
            "Warlock"
        Titan ->
            "Titan"

filterPred : FilterType -> ( Item -> Bool )
filterPred ft =
    case ft of
        None ->
            (\_ -> True)
        Hunter ->
            (\i -> i.classType == 1)
        Warlock ->
            (\i -> i.classType == 2)
        Titan ->
            (\i -> i.classType == 0)

type alias Model =
    { string : String
    , selectingFilter : Bool
    , filter : FilterType
    , focused : Maybe Item
    , state : State
    }

type Msg
    = GotError ErrorType

    | GotManifest Manifest
    | GotItemData Manifest (Dict String Item)
    | GotCollectibleData Manifest (Dict String Item) (Dict String Collectible)
    | GotPresNodeData (Dict String Item) Data

    | SearchString String

    | ToggleSelectingFitler
    | FilterSelected FilterType

    | FocusItem Item
    | UnFocusItem

unpack : (e -> b) -> (a -> b) -> Result e a -> b
unpack errF okF result =
    case result of
        Ok ok -> okF ok
        Err err -> errF err

root : String
root = "https://www.bungie.net"

init : () -> (Model, Cmd Msg)
init _ =
    ( Model "" False None Nothing <| Loading "Manifest"
    , Http.get
        { url = root ++ "/Platform/Destiny2/Manifest"
        , expect = Http.expectJson
            ( unpack GotError GotManifest )
            decodeManifest
        }
    )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        GotError e ->
            ( { model | state = Error e }
            , Cmd.none
            )
        
        GotManifest m ->
            ( { model | state = Loading "Loading Items" }
            , Http.get
                { url = root ++ m.itemDefUrl
                , expect = Http.expectJson
                    ( unpack GotError ( GotItemData m ) )
                    decodeItems 
                }
            )
        
        GotItemData m idict ->
            ( { model | state = Loading "Loading Sets" }
            , Http.get
                { url = root ++ m.collectibleUrl
                , expect = Http.expectJson
                    ( unpack GotError ( GotCollectibleData m idict ) )
                    ( decodeCollectibles idict )
                }
            )
        
        GotCollectibleData m idict cdict ->
            ( { model | state = Loading "Indexing Data. This may take some time." }
            , Http.get
                { url = root ++ m.presNodeUrl
                , expect = Http.expectJson
                    ( unpack GotError ( GotPresNodeData idict ) )
                    ( decodePresNodes cdict )
                }
            )
        
        GotPresNodeData idict data ->
            ( { model | state = Ready ( createIndex data ) idict }
            , Cmd.none
            )
        
        SearchString s ->
            ( { model | string = s}
            , Cmd.none
            )
        
        ToggleSelectingFitler ->
            ( { model | selectingFilter = not model.selectingFilter }
            , Cmd.none
            )
        
        FilterSelected ft ->
            ( { model | selectingFilter = False, filter = ft }
            , Cmd.none
            )
        
        FocusItem i ->
            ( { model | focused = Just i }
            , Cmd.none
            )
        
        UnFocusItem ->
            ( { model | focused = Nothing }
            , Cmd.none
            )

bgColor : Color
bgColor = rgb255 20 20 20

txtColor : Color
txtColor = rgb255 250 250 250

accColor : Color
accColor = rgb255 120 120 190

selColor : Color
selColor = rgb255 140 140 200

viewItemLite : Item -> Element Msg
viewItemLite item =
    column
        [ width <| minimum 450 <| maximum 950 <| fill
        , padding 4
        , Events.onClick ( FocusItem item )
        ]
        [ image
            [ width fill ]
            { src = root ++ item.screenshot
            , description = item.name
            }
        , el
            [ centerX
            , centerY
            , padding 3
            , Font.size 12
            ]
            <| text item.name
        ]

viewItemFull : Bool -> Item -> Element Msg
viewItemFull closeButton item =
    column
        [ width fill
        , height fill
        , padding 10
        , scrollbarY
        ]
        [ image
            [ width fill ]
            { src = root ++ item.screenshot
            , description = item.name
            }
        , row
            [ width fill, paddingXY 0 10]
            [ image
                [ height <| px 96 ]
                { src = root ++ item.icon
                , description = item.name
                }
            
            , paragraph
                [ padding 15 ]
                [ el [ Font.bold ] <| text item.name
                , paragraph
                    []
                    [ text item.description ]
                ]
            
            , if closeButton
                then Input.button
                    [ focused [], alignTop ]
                    { onPress = Just UnFocusItem
                    , label = text "x"
                    }
                else none
            ]
        ]

viewFilterOption : FilterType -> Input.Option FilterType Msg
viewFilterOption ft =
    Input.optionWith ft <| (\state ->
        el
            [ centerX
            , centerY
            , Background.color <|
                case state of
                    Input.Selected -> selColor
                    _ -> accColor
            ]
            <| el [ padding 15 ] <| text <| filterStr ft
    )

view : Model -> Html Msg
view model =
    layout
    [ width fill
    , height fill
    , Font.size 20
    , Font.color txtColor
    , Background.color bgColor
    ]
    <| column [ width fill, height fill ]
        [ wrappedRow
            [ width <| minimum 318 <| fill, height <| px 50 ]
            [ Input.text
                [ width fill
                , Background.color bgColor
                , Border.width 0
                , Border.color accColor
                , Border.rounded 0
                , focused []
                , Input.focusedOnLoad
                ]
                { onChange = SearchString
                , text = model.string
                , placeholder = Just <| Input.placeholder [] <| text " Search..."
                , label = Input.labelHidden "Search Box"
                }

            , row
                [ width fill
                , height fill
                , Background.color <|
                    if model.selectingFilter 
                    then accColor
                    else bgColor
                ]
                [ el
                    [ width fill, height fill, Events.onClick ToggleSelectingFitler ]
                    <| el [ centerY, padding 15 ] <| text <| filterStr model.filter
                , Input.button
                    [ focused [], padding 10 ]
                    { onPress = Just (FilterSelected None)
                    , label = text "x"
                    }
                ]
            ]
        
        , if model.selectingFilter
            then el [ Background.color accColor, width fill ] <|
                Input.radioRow
                    [ height <| px 50, spacing 10 ]
                    { onChange = FilterSelected
                    , selected = Just model.filter
                    , label = Input.labelHidden "Filter Selection"
                    , options = List.map viewFilterOption validFilters
                    }
            else none
        
        , case model.focused of
            Just item ->
                viewItemFull True item
            Nothing ->
                el [ width fill, height fill, scrollbarY ] <| case model.state of
                    Error e -> text <| case e of
                        Http.BadUrl s ->
                            "BAD URL: " ++ s
                        Http.Timeout -> 
                            "TIMEOUT"
                        Http.NetworkError ->
                            "NETWORK ERROR"
                        Http.BadStatus i ->
                            "BAD STATUS: " ++ String.fromInt i
                        Http.BadBody s ->
                            "BAD BODY: " ++ s
                    
                    Loading s ->
                        el [ centerX, centerY ] <| text s

                    Ready index idict ->
                        if String.length model.string < 2
                        then el [centerX, centerY ] <| text "Ready to search!"
                        else case search model.string index idict of
                            Err _ -> el [centerX, centerY ] <| text "No Results"
                            
                            Ok results ->
                                case List.filter ( filterPred model.filter ) results of
                                    [] ->
                                        el [centerX, centerY ] <| text "No Results"
                                    [ result ] ->
                                        viewItemFull False result
                                    fullList ->
                                        wrappedRow
                                            [ centerX ]
                                            <| List.map ( lazy viewItemLite ) fullList
        ]