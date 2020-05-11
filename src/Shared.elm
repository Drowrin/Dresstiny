module Shared exposing (
    ErrorType, unpack, errStr,
    FilterType(..), validFilters, filterPred, filterStr,
    InPortData(..), encodeInPortData, decodeInPortData,
    OutPortData(..), encodeOutPortData, decodeOutPortData
    )

import Http
import Json.Decode as Decode
import Json.Encode as Encode

import ApiModel exposing (Item, encodeItem, decodeItem)

type alias ErrorType = Http.Error

errStr : ErrorType -> String
errStr e =
    case e of
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

unpack : (e -> b) -> (a -> b) -> Result e a -> b
unpack errF okF result =
    case result of
        Ok ok -> okF ok
        Err err -> errF err

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
        None -> "No Filter"
        Hunter -> "Hunter"
        Warlock -> "Warlock"
        Titan -> "Titan"

ifilterStr : String -> FilterType
ifilterStr s =
    case s of
        "Hunter" -> Hunter
        "Warlock" -> Warlock
        "Titan" -> Titan
        _ -> None

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

type InPortData
    = PortError String
    | Status String Bool
    | Results (List Item)

encodeInPortData : InPortData -> String
encodeInPortData d =
    Encode.encode 0 
        <| Encode.object <| case d of
            PortError s ->
                [ ( "PortError", Encode.string s ) ]
            
            Status message ready ->
                [ ( "Status", Encode.object
                    [ ( "message", Encode.string message )
                    , ( "ready", Encode.bool ready )
                    ]
                ) ]
            
            Results list ->
                [ ( "Results", Encode.list encodeItem list ) ]

decodeInPortData : String -> Result Decode.Error InPortData
decodeInPortData s =
    Decode.decodeString 
        ( Decode.oneOf
            [ Decode.field "PortError" 
                ( Decode.map PortError Decode.string )
            , Decode.field "Status"
                <| Decode.map2 Status
                    ( Decode.field "message" Decode.string )
                    ( Decode.field "ready" Decode.bool )
            , Decode.map Results
                ( Decode.field "Results" <| Decode.list decodeItem )
            ]
        )
        s

type OutPortData
    = Query String
    | Filter FilterType

encodeOutPortData : OutPortData -> String
encodeOutPortData d =
    Encode.encode 0
        <| Encode.object <| case d of
            Query s ->
                [ ( "Query", Encode.string s ) ]
            Filter ft ->
                [ ( "Filter", Encode.string <| filterStr ft ) ]

decodeOutPortData : String -> Result Decode.Error OutPortData
decodeOutPortData s =
    Decode.decodeString
        ( Decode.oneOf
            [ Decode.field "Query"
                ( Decode.map Query Decode.string )
            , Decode.field "Filter"
                ( Decode.map Filter <| Decode.map ifilterStr <| Decode.string )
            ]
        )
        s
