module ApiModel exposing (
    Manifest, decodeManifest,
    Item, decodeItems, encodeItem, decodeItem,
    PresNode, decodePresNodes,
    Collectible, decodeCollectibles
    )

import Dict exposing (Dict)

import Json.Decode as Decode exposing (
    Decoder, at, field, list, dict, maybe, string, int
    )
import Json.Encode as Encode

setBlackList : List String
setBlackList = [ "Hunter", "Warlock", "Titan" ]

type alias Manifest =
    { version : String
    , presNodeUrl : String
    , collectibleUrl : String
    , itemDefUrl : String
    }

decodeManifest : Decoder Manifest
decodeManifest =
    field "Response" <| Decode.map4 Manifest
        ( field "version" string )
        ( at [ "jsonWorldComponentContentPaths", "en", "DestinyPresentationNodeDefinition" ] string )
        ( at [ "jsonWorldComponentContentPaths", "en", "DestinyCollectibleDefinition" ] string )
        ( at [ "jsonWorldComponentContentPaths", "en", "DestinyInventoryItemDefinition" ] string )

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

encodeItem : Item -> Encode.Value
encodeItem item =
    Encode.object
        [ ( "hash", Encode.string item.hash )
        , ( "name", Encode.string item.name )
        , ( "icon", Encode.string item.icon )
        , ( "screenshot", Encode.string item.screenshot )
        , ( "description", Encode.string item.description )
        , ( "classType", Encode.int item.classType )
        , ( "source", Encode.string item.source )
        , ( "sets", Encode.list Encode.string item.sets )
        ]

decodeItem : Decoder Item
decodeItem =
    Decode.map8 Item
        ( field "hash" string )
        ( field "name" string )
        ( field "icon" string )
        ( field "screenshot" string )
        ( field "description" string )
        ( field "classType" int )
        ( field "source" string )
        ( field "sets" <| list string)

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

resolveCollectible : Dict String PresNode -> String -> Maybe RawCollectible -> Dict String Collectible -> Dict String Collectible
resolveCollectible pdict hash mrc accumulator =
    case mrc of
        Just rc ->
            Dict.insert
                hash
                { source = rc.source
                , parents = List.foldl ( foldPresNodes pdict ) [] rc.parentHashes
                }
                accumulator
        Nothing ->
            accumulator

resolveCollectibles : Dict String PresNode -> Dict String (Maybe RawCollectible) -> Dict String Collectible
resolveCollectibles pdict rcdict =
    Dict.foldl ( resolveCollectible pdict ) Dict.empty rcdict

decodeCollectibles : Dict String PresNode -> Decoder (Dict String Collectible)
decodeCollectibles pdict =
    Decode.map
        ( resolveCollectibles pdict )
        ( dict <| maybe decodeRawCollectible )

type alias RawPresNode = Maybe String

type alias PresNode = String

decodeRawPresNode : Decoder RawPresNode
decodeRawPresNode =
    field "displayProperties" <| maybe <| field "name" string

resolvePresNode : String -> RawPresNode -> Dict String PresNode -> Dict String PresNode
resolvePresNode hash rp accumulator =
    case rp of
        Just p ->
            if not <| List.member p setBlackList
            then Dict.insert hash p accumulator
            else accumulator
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