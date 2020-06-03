port module Search exposing (main)

import Platform exposing (Program)
import Dict exposing (Dict)
import Json.Decode as Decode exposing (errorToString)
import Json.Encode as Encode
import Http
import Task

import ElmTextSearch
import ElmTextSearch.Json.Encoder

import Const exposing (root, dataVersion)
import ApiModel exposing (
    Item, decodeItems, decodeItem, encodeItem,
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

type alias StoredData = 
    { version : String
    , data : Data
    , index : Maybe Index
    }

encodeStoredData : StoredData -> String
encodeStoredData sd =
    Encode.encode 0
        <| Encode.object <| [ ( dataVersion, Encode.object
            [ ( "version", Encode.string sd.version )
            , ( "data", Encode.dict identity encodeItem sd.data )
            , ( "index", case sd.index of
                Just index ->
                    ElmTextSearch.Json.Encoder.encoder index
                Nothing ->
                    Encode.null
            )
            ]
        ) ]

decodeStoredData : Decode.Decoder StoredData
decodeStoredData = 
    Decode.field dataVersion
    <| Decode.map3 StoredData
        ( Decode.field "version" Decode.string )
        ( Decode.field "data" <| Decode.dict decodeItem )
        ( Decode.map loadIndex <| Decode.field "index" Decode.value )

foldData : String -> Item -> Index -> Index
foldData _ item index =
    let
        r = ElmTextSearch.add item index
    in
        case r of
            Ok i -> i
            Err _ -> index

indexConfig : ElmTextSearch.SimpleConfig Item
indexConfig = 
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

createIndex : Data -> Index
createIndex data =
    Dict.foldl foldData
    ( ElmTextSearch.new indexConfig )
    data

loadIndex : Decode.Value -> Maybe Index
loadIndex value =
    case ElmTextSearch.fromValue indexConfig value of
        Ok index -> Just index
        Err _ -> Nothing

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

main : Program Flags Model Msg
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }

type State
    = Loading
    | Error
    | Ready String Index Data

type alias Model =
    { state : State
    , storagePermission : Bool
    , string : String
    , filter : FilterType
    , fullResults : List Item
    , allItems : List Item
    }

type alias Flags =
    { permission: Bool
    , data: Maybe String
    }

init : Flags -> ( Model, Cmd Msg )
init fs =
    ( Model Loading fs.permission "" None [] []
    , Cmd.batch
        [ sendPort <| encodeInPortData <| Status "Checking Local Data" False
        , do <| GetManifest <| case fs.data of
            Just str -> case Decode.decodeString decodeStoredData str of
                Ok d -> Just d
                Err _ -> Nothing
            _ -> Nothing
        ]
    )

type Msg
    = GotError ErrorType

    | GetManifest (Maybe StoredData)
    | GotManifest (Maybe StoredData) Manifest
    | GotPresNodeData Manifest (Dict String PresNode)
    | GotCollectibleData Manifest (Dict String Collectible)
    | GotItemData Manifest Data
    | IndexData Manifest Data
    
    | SaveData

    | GotPortMessage String

    | DoSearch
    | DoFilter
    | SendResults (List Item)

port sendPort : String -> Cmd msg
port recvPort : (String -> msg) -> Sub msg

port storeData : String -> Cmd msg

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
        
        GetManifest data ->
            ( model
            , Cmd.batch
                [ Http.get
                    { url = root ++ "/Platform/Destiny2/Manifest"
                    , expect = Http.expectJson
                        ( unpack GotError ( GotManifest data ) )
                        decodeManifest
                    }
                , sendPort <| encodeInPortData <| Status "Checking for Manifest updates" False
                ]
            )
        
        GotManifest mdata manifest ->
            let
                readyData = case mdata of
                    Just data ->
                        if data.version == manifest.version
                        then case data.index of
                            Just i -> Just (i, data.data)
                            _ -> Nothing
                        else Nothing
                    _ -> Nothing
            in
                case readyData of
                    Just ( index, data ) ->
                        ( { model | state = Ready manifest.version index data }
                        , sendPort <| encodeInPortData <| Status "Done" True
                        )
                    _ ->
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
                        ( unpack GotError ( GotItemData manifest ) )
                        ( decodeItems cdict )
                    }
                , sendPort <| encodeInPortData <| Status "Loading Items" False
                ]
            )
        
        GotItemData manifest data ->
            ( { model | allItems = Dict.values data }
            , Cmd.batch
                [ do (IndexData manifest data)
                , sendPort <| encodeInPortData <| Status "Indexing Data, this may take some time" False
                ]
            )
        
        IndexData manifest data ->
            let
                index = createIndex data
            in
                ( { model | state = Ready manifest.version index data }
                , Cmd.batch
                    [ sendPort <| encodeInPortData <| Status "Done" True
                    , do SaveData
                    ]
                )
        
        SaveData ->
            case model.state of
                Ready version index data ->
                    if model.storagePermission then
                        ( model
                        , storeData <| encodeStoredData <| StoredData version data ( Just index )
                        )
                    else
                        ( model
                        , Cmd.none
                        )
                _ ->
                    ( model
                    , Cmd.none
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
                
                Ok ( AllowStorage b ) ->
                    ( { model | storagePermission = b }
                    , do SaveData
                    )
        
        DoSearch ->
            case model.state of
                Ready _ index data ->
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

