module Main exposing (main)

import Browser
import Browser.Events
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

type alias Flags =
    { w : Int
    , h : Int
    }

main : Program Flags Model Msg
main = Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onResize (\w h -> WindowResize w h)

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
    , collectibleHash : Maybe String
    }

type alias Item =
    { hash : String
    , name : String
    , icon : String
    , screenshot : String
    , description : String
    , classType : Int
    , source : String
    , sets : List String
    }

decodeRawItem : Decoder RawItem
decodeRawItem =
    Decode.map6 RawItem
        ( field "displayProperties" <| field "name" string )
        ( field "displayProperties" <| maybe <| field "icon" string )
        ( maybe <| field "screenshot" string )
        ( field "displayProperties" <| maybe <| field "description" string )
        ( field "classType" int )
        ( maybe <| Decode.map String.fromInt <| field "collectibleHash" int )

getCollectible : Dict String Collectible -> Maybe String -> Maybe Collectible
getCollectible cdict ms =
    Maybe.andThen (\s -> Dict.get s cdict) ms

resolveItem : Dict String Collectible -> String -> RawItem -> Dict String Item -> Dict String Item
resolveItem cdict hash item accumulator =
    case ( item.icon, item.screenshot, item.description ) of
        ( Just icon, Just screenshot, Just description ) ->
            case getCollectible cdict item.collectibleHash of
                Just collectible ->
                    Dict.insert
                        hash
                        { hash = hash
                        , name = item.name
                        , icon = icon
                        , screenshot = screenshot
                        , description = description
                        , classType = item.classType
                        , source = collectible.source
                        , sets = collectible.parents
                        } 
                        accumulator
                Nothing -> accumulator
        _ ->
            accumulator

resolveItems : Dict String Collectible -> Dict String RawItem -> Dict String Item
resolveItems cdict ridict =
    Dict.foldl ( resolveItem cdict ) Dict.empty ridict

decodeItems : Dict String Collectible -> Decoder (Dict String Item)
decodeItems cdict =
    Decode.map ( resolveItems cdict ) ( dict decodeRawItem )

type alias RawCollectible =
    { parentHashes : List String
    , source : String
    }

type alias Collectible =
    { parents : List PresNode
    , source : String
    }

decodeRawCollectible : Decoder RawCollectible
decodeRawCollectible =
    Decode.map2 RawCollectible
        ( field "parentNodeHashes" <| list <| Decode.map String.fromInt <| int )
        ( field "sourceString" string )

foldPresNodes : Dict String PresNode -> String -> List String -> List String
foldPresNodes pdict hash l =
    case Dict.get hash pdict of
        Just pnode ->
            pnode :: l
        _ ->
            l

resolveCollectible : Dict String PresNode -> String -> RawCollectible -> Dict String Collectible -> Dict String Collectible
resolveCollectible pdict hash rc accumulator =
    Dict.insert
        hash
        { source = rc.source
        , parents = List.foldl ( foldPresNodes pdict ) [] rc.parentHashes
        }
        accumulator

resolveCollectibles : Dict String PresNode -> Dict String RawCollectible -> Dict String Collectible
resolveCollectibles pdict rcdict =
    Dict.foldl ( resolveCollectible pdict ) Dict.empty rcdict

decodeCollectibles : Dict String PresNode -> Decoder (Dict String Collectible)
decodeCollectibles pdict =
    Decode.map
        ( resolveCollectibles pdict )
        ( dict decodeRawCollectible )

type alias RawPresNode = Maybe String

type alias PresNode = String

decodeRawPresNode : Decoder RawPresNode
decodeRawPresNode =
    field "displayProperties" <| maybe <| field "name" string

resolvePresNode : String -> RawPresNode -> Dict String PresNode -> Dict String PresNode
resolvePresNode hash rp accumulator =
    case rp of
        Just p ->
            Dict.insert hash p accumulator
        Nothing ->
            accumulator

resolvePresNodes : Dict String RawPresNode -> Dict String PresNode
resolvePresNodes rpdict =
    Dict.foldl resolvePresNode Dict.empty rpdict

decodePresNodes : Decoder (Dict String PresNode)
decodePresNodes =
    Decode.map
        resolvePresNodes
        ( dict decodeRawPresNode )

type alias ErrorType = Http.Error
type alias Data = Dict String Item

type alias Index = ElmTextSearch.Index Item

foldData : String -> Item -> Index -> Index
foldData _ item index =
    let
        r = ElmTextSearch.add item index
    in
        case r of
            Ok i -> i
            Err _ -> index

createIndex : Data -> Index
createIndex data =
    Dict.foldl foldData
    ( ElmTextSearch.new
        { ref = .hash
        , fields =
            [ ( .name, 4.0 )
            , ( .source, 2.0 )
            , ( .description, 1.0 )
            ]
        , listFields =
            [ ( .sets, 3.0 )
            ]
        }
    )
    data

sortFold : Dict String Item -> (String, Float) -> List Item -> List Item
sortFold idict t l =
    case Dict.get ( Tuple.first t ) idict of
        Just i -> i :: l
        Nothing -> l

resultToSortedItems : Dict String Item -> List (String, Float) -> List Item
resultToSortedItems idict l =
    List.foldl ( sortFold idict ) [] ( List.sortBy Tuple.second l )
        

search : Dict String Item -> String -> Index -> Result String ( List Item )
search idict string index =
    Result.map
        (\t -> resultToSortedItems idict <| Tuple.second t )
        <| ElmTextSearch.search string index

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

type State
    = Error ErrorType
    | Loading String
    | Ready Index Data (List Item)

type ViewState
    = MainView
    | SingleItem Item
    | About

type alias Model =
    { w : Int
    , h : Int
    , device : Device
    , string : String
    , selectingFilter : Bool
    , filter : FilterType
    , state : State
    , viewState : ViewState
    }

type Msg
    = WindowResize Int Int

    | GotError ErrorType

    | GotManifest Manifest
    | GotPresNodeData Manifest (Dict String PresNode)
    | GotCollectibleData Manifest (Dict String Collectible)
    | GotItemData Data

    | SearchString String

    | ToggleSelectingFitler
    | FilterSelected FilterType

    | ReturnToList
    | FocusItem Item
    | AboutPressed

unpack : (e -> b) -> (a -> b) -> Result e a -> b
unpack errF okF result =
    case result of
        Ok ok -> okF ok
        Err err -> errF err

root : String
root = "https://www.bungie.net"

init : Flags -> (Model, Cmd Msg)
init f =
    let
        device = classifyDevice { height = f.h, width = f.w }
        filter = None
        dataState = Loading "Locating Manifests"
        viewState = MainView
    in
        ( Model f.w f.h device "" False filter dataState viewState
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
        WindowResize w h ->
            ( { model | w = w, h = h }
            , Cmd.none
            )

        GotError e ->
            ( { model | state = Error e }
            , Cmd.none
            )
        
        GotManifest manifest ->
            ( { model | state = Loading "Loading Sets" }
            , Http.get
                { url = root ++ manifest.presNodeUrl
                , expect = Http.expectJson
                    ( unpack GotError ( GotPresNodeData manifest ) )
                    decodePresNodes
                }
            )
        
        GotPresNodeData manifest pdict ->
            ( { model | state = Loading "Item Sources" }
            , Http.get
                { url = root ++ manifest.collectibleUrl
                , expect = Http.expectJson
                    ( unpack GotError ( GotCollectibleData manifest ) )
                    ( decodeCollectibles pdict )
                }
            )
        
        GotCollectibleData manifest cdict ->
            ( { model | state = Loading "Loading Items. This may take some time." }
            , Http.get
                { url = root ++ manifest.itemDefUrl
                , expect = Http.expectJson
                    ( unpack GotError GotItemData )
                    ( decodeItems cdict )
                }
            )
        
        GotItemData data ->
            ( { model | state = Ready ( createIndex data ) data [] }
            , Cmd.none
            )
        
        SearchString s ->
            case model.state of
                Ready index data _ ->
                    ( { model | string = s, state = 
                        if String.length model.string < 2
                        then Ready index data []
                        else case search data model.string index of
                            Err _ -> Ready index data []
                            Ok results ->
                                Ready index data
                                    <| List.filter ( filterPred model.filter ) results
                        }
                    , Cmd.none
                    )
                _ ->
                    ( { model | string = s }
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
            ( { model | viewState = SingleItem i }
            , Cmd.none
            )
        
        ReturnToList ->
            ( { model | viewState = MainView }
            , Cmd.none
            )
        
        AboutPressed ->
            ( { model | viewState = About }
            , Cmd.none
            )

bgColor : Color
bgColor = rgb255 20 20 20

bgColor2 : Color
bgColor2 = rgb255 40 40 40

txtColor : Color
txtColor = rgb255 250 250 250

accColor : Color
accColor = rgb255 120 120 190

selColor : Color
selColor = rgb255 140 140 200

textSize : Model -> Int
textSize _ = 20

bigTextSize : Model -> Int
bigTextSize _ = 30

smallTextSize : Model -> Int
smallTextSize _ = 12

viewItemLite : Model -> Item -> Element Msg
viewItemLite model item =
    column
        [ width <| minimum 350 <| maximum 950 <| fill
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
            , Font.size <| smallTextSize model
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
                    { onPress = Just ReturnToList
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

hDivider : Element Msg
hDivider =
    row
        [ width fill ]
        [ el [ width <| px 10 ] none
        , el
            [ Background.color bgColor2
            , width fill
            , height <| px 1
            ]
            none
        , el [ width <| px 10 ] none
        ]
        

vDivider : Element Msg
vDivider =
    column
        [ height fill ]
        [ el [ height <| px 10 ] none
        , el
            [ Background.color bgColor2
            , height fill
            , width <| px 1
            ]
            none
        , el [ height <| px 10 ] none
        ]

viewHeader : Model -> Element Msg
viewHeader model =
    let
        headerRowHeight = px 50

        input =
            Input.text
                [ width fill
                , height headerRowHeight
                , Background.color bgColor
                , Border.width 0
                , focused []
                , Input.focusedOnLoad
                , Element.paddingEach { top = 15, right = 15, bottom = 0, left = 15 }
                ]
                { onChange = SearchString
                , text = model.string
                , placeholder = Just <| Input.placeholder [] <| text <| "Search..."
                , label = Input.labelHidden "Search Box"
                }
        
        filterbox = row
            [ width fill
            , height headerRowHeight
            , Background.color <|
                if model.selectingFilter 
                then accColor
                else bgColor
            , Events.onClick ToggleSelectingFitler
            ]
            [ el
                [ width fill
                , height fill
                , centerY
                , padding 15
                ]
                <| text <| filterStr model.filter
            , Input.button
                [ focused [], padding 10 ]
                { onPress = Just (FilterSelected None)
                , label = text "x"
                }
            ]
        
        filterSelect =
            if model.selectingFilter
            then row
                [ width fill ] 
                [ Input.radioRow
                    [ height headerRowHeight
                    , width fill
                    , spacing 10
                    , Background.color accColor
                    ]
                    { onChange = FilterSelected
                    , selected = Just model.filter
                    , label = Input.labelHidden "Filter Selection"
                    , options = List.map viewFilterOption validFilters
                    }
                ]
            
            else none
        
        headerRow = case ( model.device.class, model.device.orientation ) of
            ( Phone, Portrait ) -> False
            _ -> model.w >= 600
    
    in
        if headerRow
        then column
            [ width fill, height shrink ]
            [ row
                [ width fill
                , height shrink
                ]
                [ input
                , vDivider
                , filterbox
                ]
            
            , filterSelect
            ]

        else column
            [ width fill, height shrink ]
            [ input
            , hDivider
            , filterbox
            , filterSelect
            ]
            

viewAbout : Model -> Element Msg
viewAbout model =
    column
        [ width fill, centerY, spacing 10 ]
        [ paragraph
            [ centerX, centerY, width <| maximum 600 <| fill ]
            [ el
                [ alignLeft, padding 8, Font.bold, Font.size <| bigTextSize model ]
                <| text "Dresstiny"
            , text <|
                """
                This page will display screenshots and
                brief details on almost all equippable items in Destiny 2.
                Type in the bar above to search through the items.
                You can also filter results, for example to a specific class's gear.
                This information is drawn from the Destiny 2 Manifest.
                This means it is possible for it to view content that is not yet in the game
                if Bungie has not hidden it. Take care if you are avoiding spoilers.
                """
            ]
        , Input.button
            [ centerX, padding 5, focused [], Font.bold ]
            { onPress = Just ReturnToList
            , label = text "Return"
            }
        ]

viewError : Model -> ErrorType -> Element Msg
viewError _ e =
    text <| case e of
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

viewFooter : Model -> Element Msg
viewFooter model =
    row
        [ Font.size <| smallTextSize model, spacing 10, padding 7, centerX, alignBottom ]
        [ link
            []
            { url = "https://github.com/Drowrin/Dresstiny"
            , label = text "Source Code"
            }
        , text "|"
        , Input.button
            [ focused [] ]
            { onPress = Just AboutPressed
            , label = text "What is this?"
            }
        ]

view : Model -> Html Msg
view model =
    layout
    [ width fill
    , height fill
    , Font.size <| textSize model
    , Font.color txtColor
    , Background.color bgColor
    ]
    <| column
        [ width fill
        , height fill
        ]
        [ viewHeader model
        
        , hDivider
        
        , case model.viewState of
            SingleItem item -> viewItemFull True item
            
            About -> viewAbout model

            MainView -> el [ width fill, height fill, scrollbarY ]
                <| case model.state of
                    Error e -> viewError model e
                    
                    Loading s ->
                        el
                        [ centerX
                        , centerY
                        ]
                        <| paragraph
                            []
                            [ text s
                            ]

                    Ready _ _ items ->
                        if String.length model.string < 2
                        then
                            el [centerX, centerY ] <| text "Ready to search!"
                        else
                            case items of
                                [] -> el [centerX, centerY ] <| text "No Results"
                                
                                [ result ] ->
                                    viewItemFull False result
                                
                                fullList ->
                                    wrappedRow
                                        [ centerX ]
                                        <| List.map
                                            ( lazy <| viewItemLite model )
                                            fullList
        
        , viewFooter model   
        ]