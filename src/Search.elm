port module Search exposing (main)

import Platform exposing (Program)
import Dict exposing (Dict)
import Json.Decode exposing (errorToString)
import Http
import Task

import ElmTextSearch

import ApiModel exposing(
    root,
    Item, decodeItems,
    Manifest, decodeManifest,
    PresNode, decodePresNodes,
    Collectible, decodeCollectibles
    )
import Shared exposing (
    ErrorType, unpack, errStr,
    OutPortData(..), decodeOutPortData,
    InPortData(..), encodeInPortData,
    FilterType(..), filterPred
    )

type alias Index = ElmTextSearch.Index Item

type alias Data = Dict String Item

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
        

search : Dict String Item -> Index -> String -> Result String ( List Item )
search idict index string =
    Result.map
        (\t -> resultToSortedItems idict <| Tuple.second t )
        <| ElmTextSearch.search string index

main : Program () Model Msg
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }

type State
    = Loading
    | Error
    | Ready Index Data

type alias Model =
    { state : State
    , string : String
    , filter : FilterType
    , fullResults : List Item
    , allItems : List Item
    }

init : () -> ( Model, Cmd Msg )
init _ =
    ( Model Loading "" None [] []
    , Cmd.batch
        [ Http.get
            { url = root ++ "/Platform/Destiny2/Manifest"
            , expect = Http.expectJson
                ( unpack GotError GotManifest )
                decodeManifest
            }
        , sendPort <| encodeInPortData <| Status "Loading Manifest" False
        ]
    )

type Msg
    = GotError ErrorType

    | GotManifest Manifest
    | GotPresNodeData Manifest (Dict String PresNode)
    | GotCollectibleData Manifest (Dict String Collectible)
    | GotItemData Data
    | IndexData Data

    | GotPortMessage String

    | DoSearch
    | DoFilter
    | SendResults (List Item)

port sendPort : String -> Cmd msg
port recvPort : (String -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions _ =
    recvPort GotPortMessage

do : Msg -> Cmd Msg
do msg =
    Task.perform (\_ -> msg) <| Task.succeed ()

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotError e ->
            ( { model | state = Error }
            , sendPort <| encodeInPortData <| PortError <| errStr e
            )
        
        GotManifest manifest ->
            ( model
            , Cmd.batch 
                [ Http.get
                    { url = root ++ manifest.presNodeUrl
                    , expect = Http.expectJson
                        ( unpack GotError ( GotPresNodeData manifest ) )
                        decodePresNodes
                    }
                , sendPort <| encodeInPortData <| Status "Loading Item Sets" False
                ]
            )
        
        GotPresNodeData manifest pdict ->
            ( model
            , Cmd.batch
                [ Http.get
                    { url = root ++ manifest.collectibleUrl
                    , expect = Http.expectJson
                        ( unpack GotError ( GotCollectibleData manifest ) )
                        ( decodeCollectibles pdict )
                    }
                , sendPort <| encodeInPortData <| Status "Loading Item Sources" False
                ]
            )
        
        GotCollectibleData manifest cdict ->
            ( model
            , Cmd.batch
                [ Http.get
                    { url = root ++ manifest.itemDefUrl
                    , expect = Http.expectJson
                        ( unpack GotError GotItemData )
                        ( decodeItems cdict )
                    }
                , sendPort <| encodeInPortData <| Status "Loading Items" False
                ]
            )
        
        GotItemData data ->
            ( { model | allItems = Dict.values data }
            , Cmd.batch
                [ do (IndexData data)
                , sendPort <| encodeInPortData <| Status "Indexing Data, this may take some time" False
                ]
            )
        
        IndexData data ->
            ( { model | state = Ready ( createIndex data ) data }
            , sendPort <| encodeInPortData <| Status "Done" True
            )
        
        GotPortMessage message ->
            case decodeOutPortData message of
                Err e ->
                    ( model
                    , sendPort <| encodeInPortData <| PortError <| errorToString e
                    )
                Ok ( Query s ) -> 
                    if String.length s <= 2
                    then
                        ( { model | string = s, fullResults = [] }
                        , do DoFilter
                        )
                    else
                        ( { model | string = s }
                        , do DoSearch
                        )
                        
                Ok ( Filter f ) ->
                    ( { model | filter = f }
                    , do DoFilter
                    )
        
        DoSearch ->
            case model.state of
                Ready index data ->
                    ( { model | fullResults = Result.withDefault [] <| search data index model.string }
                    , do DoFilter
                    )
                _ ->
                    ( model
                    , Cmd.none
                    )

        
        DoFilter ->
            let
                fres = 
                    if ( not <| model.filter == None ) && List.isEmpty model.fullResults
                    then model.allItems
                    else model.fullResults
                res = List.filter (filterPred model.filter) fres
            in
                ( model
                , do (SendResults res)
                )
        
        SendResults res ->
            ( model
            , sendPort <| encodeInPortData <| Results
                ( ( String.length model.string > 2)  || ( not <| model.filter == None ) )
                res
            )

