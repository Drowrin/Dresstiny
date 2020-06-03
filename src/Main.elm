port module Main exposing (main)

import Browser
import Browser.Events
import Html exposing (Html)
import Html.Events
import Html.Attributes
import Json.Decode exposing (errorToString)

import Element exposing (
    Element, el, none, layoutWith,
    Device, classifyDevice, DeviceClass(..), Orientation(..),
    Color, rgb255,
    row, column, wrappedRow,
    width, height, minimum, maximum, fill, shrink, px,
    scrollbarY,
    centerX, centerY,
    padding, spacing, paddingXY,
    focused,
    alignTop, alignLeft, alignBottom, alignRight,
    text, image, paragraph, link,
    pointer
    )
import Element.Input as Input
import Element.Font as Font
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events

import Const exposing (root)
import ApiModel exposing (Item)
import Shared exposing (
    FilterType(..), filterStr, validFilters,
    OutPortData(..), encodeOutPortData,
    InPortData(..), decodeInPortData,
    do
    )

type alias Flags =
    { w : Int
    , h : Int
    , permission : Bool
    }

main : Program Flags Model Msg
main = Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

port sendPort : String -> Cmd msg
port recvPort : (String -> msg) -> Sub msg

port storePermission : Bool -> Cmd msg

subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onResize (\w h -> WindowResize w h)
        , recvPort GotPortMessage
        ]

type SyncState
    = Synced
    | Getting String

type State
    = Error String
    | Loading String
    | Ready SyncState

type ViewState
    = MainView
    | SingleItem Item
    | About

type SelectState
    = NoSelect
    | SelectingSet
    | SelectingFilter

type alias Model =
    { w : Int
    , h : Int
    , device : Device

    , storagePermission : Bool
    , displayPermission : Bool

    , string : String
    , results : List Item
    , validSearch : Bool

    , currentSets : List String
    , filter : FilterType
    , selecting : SelectState

    , state : State
    , viewState : ViewState
    }

type Msg
    = WindowResize Int Int

    | GotPortMessage String

    | AllowStoragePermission
    | DenyStoragePermission

    | SearchString String

    | ToggleSelecting SelectState
    | FilterSelected FilterType
    | SetSelected String

    | ImageError String

    | ReturnToList
    | FocusItem Item
    | AboutPressed

init : Flags -> (Model, Cmd Msg)
init f =
    let
        device = classifyDevice { height = f.h, width = f.w }
        filter = None
        dataState = Loading "Checking Local Storage"
        viewState = MainView
    in
        ( Model
            f.w f.h device
            f.permission (not f.permission)
            "" [] False
            [] filter NoSelect
            dataState viewState
        , Cmd.none
        )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        WindowResize w h ->
            ( { model | w = w, h = h }
            , Cmd.none
            )
        
        GotPortMessage message ->
            case decodeInPortData message of
                Err e ->
                    ( { model | state = Error <| errorToString e }
                    , Cmd.none
                    )
                Ok ipd ->
                    case ipd of
                        PortError e ->
                            ( { model | state = Error e }
                            , Cmd.none
                            )
                        
                        Status s r ->
                            if r
                            then
                                ( { model | state = Ready Synced }
                                , Cmd.none
                                )
                            else
                                ( { model | state = Loading s }
                                , Cmd.none
                                )
                        
                        Results validSearch items sets ->
                            let
                                m = { model
                                    | state = Ready Synced
                                    , results = items
                                    , currentSets = sets
                                    , validSearch = validSearch
                                    }
                            in
                                case model.state of
                                    Ready (Getting s) ->
                                        if s == model.string
                                        then
                                            ( m
                                            , Cmd.none
                                            )
                                        else
                                            ( { m | state = Ready <| Getting model.string }
                                            , sendPort <| encodeOutPortData <|
                                                Query model.string
                                            )
                                    _ ->
                                        ( m
                                        , Cmd.none
                                        )
        
        AllowStoragePermission ->
            ( { model | displayPermission = False }
            , Cmd.batch
                [ storePermission <| True
                , sendPort <| encodeOutPortData <| AllowStorage True
                ]
            )
        
        DenyStoragePermission ->
            ( { model | displayPermission = False }
            , Cmd.none
            )
        
        SearchString s ->
            case model.state of
                Ready Synced ->
                    ( { model | string = s }
                    , sendPort <| encodeOutPortData <| Query s
                    )
                _ ->
                    ( { model | string = s }
                    , Cmd.none
                    )
        
        ToggleSelecting ss ->
            if model.selecting == ss then
                ( { model | selecting = NoSelect }
                , Cmd.none
                )
            else
                ( { model | selecting = ss }
                , Cmd.none
                )
        
        FilterSelected ft ->
            ( { model
                | selecting = NoSelect
                , filter = ft
              }
            , sendPort <| encodeOutPortData <| Filter ft
            )
        
        SetSelected s ->
            ( { model | selecting = NoSelect }
            , do ( SearchString s )
            )
        
        ImageError hash ->
            ( { model | results = List.map
                (\item ->
                    if item.hash == hash
                    then { item | screenshot = "" }
                    else item
                )
                model.results
                }
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

bgColor3 : Color
bgColor3 = rgb255 15 15 15

txtColor : Color
txtColor = rgb255 250 250 250

accColor : Color
accColor = rgb255 120 120 190

selColor : Color
selColor = rgb255 140 140 200

textSize : Model -> Int
textSize _ = 20

medTextSize : Model -> Int
medTextSize _ = 17

bigTextSize : Model -> Int
bigTextSize _ = 30

smallTextSize : Model -> Int
smallTextSize _ = 12

itemImage : Item -> Element Msg
itemImage item =
    if item.screenshot == ""
    then el
        [ width fill, height fill, Background.color bgColor3 ]
        <| el [ centerX, centerY ] <| text "Error Loading Image" 
    else Element.html
        <| Html.img
            [ Html.Attributes.src <| root ++ item.screenshot
            , Html.Attributes.style "height" "auto"
            , Html.Attributes.style "max-width" "100%"
            , Html.Events.on "error"
                <| Json.Decode.succeed ( ImageError item.hash )
            ]
            []

viewItemLite : Model -> Item -> Element Msg
viewItemLite model item =
    column
        [ width <| minimum 450 <| maximum 950 <| fill
        , height fill
        , Events.onClick ( FocusItem item )
        , pointer
        ]
        [ itemImage item
        , el
            [ centerX
            , centerY
            , padding 3
            , Font.size <| smallTextSize model
            ]
            <| text <| String.join " | " ( item.name :: item.sets )
        ]

viewItemFull : Bool -> Item -> Element Msg
viewItemFull closeButton item =
    column
        [ width fill
        , height fill
        ]
        [ itemImage item
        , row
            [ width fill, paddingXY 0 10]
            [ image
                [ height <| px 96 ]
                { src = root ++ item.icon
                , description = item.name
                }
            
            , paragraph
                [ padding 15 ]
                [ el [ Font.bold ] <|
                    text <| String.join " | " ( item.name :: item.sets )
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
        
        , paragraph
            [ centerX ]
            [ text item.source ]
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

        setToggle =
            Input.button
                [ focused []
                , width shrink
                , height fill
                , padding 15
                , alignRight
                ]
                { onPress = Just ( ToggleSelecting SelectingSet )
                , label = text "View Sets"
                }

        input = row
            [ width fill
            , height shrink
            ]
            [ Input.text
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
            
            , setToggle
            ]
        
        selectBox = case model.selecting of
            SelectingFilter -> row
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
            
            SelectingSet -> wrappedRow
                [ width fill
                , Background.color accColor
                , scrollbarY
                ]
                <| List.map
                    (\s -> Input.button
                        [ height headerRowHeight
                        , spacing 10
                        ]
                        { onPress = Just ( SetSelected s )
                        , label = el [ padding 15 ] <| text s
                        }
                    )
                    model.currentSets
            
            NoSelect -> none

        filterbox = row
            [ width fill
            , height headerRowHeight
            , Background.color <|
                case model.selecting of
                    SelectingFilter -> accColor
                    _ -> bgColor
            , Events.onClick ( ToggleSelecting SelectingFilter )
            ]
            [ el
                [ width fill
                , height fill
                , centerY
                , padding 15
                ]
                <| text <| filterStr model.filter
            ]
        
        headerRow = case ( model.device.class, model.device.orientation ) of
            ( Phone, Portrait ) -> False
            _ -> model.w >= 600
        
        container = if headerRow then row else column

        div = if headerRow then vDivider else hDivider
    in
        container
            [ width fill
            , height shrink
            , Element.below selectBox
            ]
            [ input
            , div
            , filterbox
            ]
            

viewAbout : Model -> Element Msg
viewAbout model =
    column
        [ width fill, centerY, spacing 10 ]
        [ paragraph
            [ centerX
            , centerY
            , width <| maximum 610 <| fill
            , Font.center
            ]
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
            [ centerX, padding 5, focused [], Font.bold, Font.color selColor ]
            { onPress = Just ReturnToList
            , label = text "Return"
            }
        ]

viewFooter : Model -> Element Msg
viewFooter model =
    column
        [ width fill
        , height shrink
        , alignBottom
        , Background.color <| if model.displayPermission then bgColor2 else bgColor
        ]
        [ if model.displayPermission
            then row
                [ spacing 10
                , padding 5
                , centerX
                ]
                [ paragraph
                    [ Font.size <| medTextSize model
                    , width fill
                    , alignRight
                    ]
                    [ el [ Element.alignRight ] <| text "Local Storage Permissions: "]
                , Input.button
                    [ focused []
                    , height <| px 35
                    , width <| px 75
                    , Background.color selColor
                    ]
                    { onPress = Just AllowStoragePermission
                    , label = el
                        [ centerX, centerY ]
                        <| text "Allow"
                    }
                , Input.button
                    [ focused []
                    , height <| px 35
                    , width <| px 75
                    , Background.color bgColor3
                    ]
                    { onPress = Just DenyStoragePermission
                    , label = el
                        [ centerX, centerY ] 
                        <|text "Deny"
                    }
                , paragraph
                    [ Font.size 10
                    , width fill
                    ]
                    [ text "This stores indexed data so it doesn't have to be regenerated every time." ]
                ]
            else none
        , row
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
        ]

view : Model -> Html Msg
view model =
    layoutWith
    { options = []
    }
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
        
        , el
        [ padding 10
        , width fill
        , height fill
        , scrollbarY
        ]
        <| case model.viewState of
            SingleItem item -> viewItemFull True item
            
            About -> viewAbout model

            MainView -> el [ width fill, height fill ]
                <| case model.state of
                    Error e -> text e
                    
                    Loading s ->
                        el
                        [ centerX
                        , centerY
                        ]
                        <| paragraph
                            []
                            [ text s
                            ]

                    Ready syncstate ->
                        if not model.validSearch
                        then
                            el [centerX, centerY ] <| text "Ready to search!"
                        else
                            case ( model.results, syncstate ) of
                                ( [], Synced ) -> el [ centerX, centerY ] <| text "No Results"
                                ( [], Getting _ ) -> el [ centerX, centerY ] <| text "Searching..."
                                
                                ( [ result ], _ ) ->
                                    viewItemFull False result
                                
                                ( fullList, _ ) ->
                                    wrappedRow
                                        [ centerX, spacing 10 ]
                                        <| List.map
                                            ( viewItemLite model )
                                            fullList
        
        , viewFooter model   
        ]