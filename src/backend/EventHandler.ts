import { Event } from "../enums/Event";
import { EmptyEventData, GameResultData, GameStartData, IdentifyData, PlayerJoinedData, PlayerListData } from "./EventDataTypes";

export type EventMap = {
    [Event.IDENTIFY]: IdentifyData,
    [Event.PLAYER_JOINED] : PlayerJoinedData,
    [Event.UPDATED_PLAYERS_LIST] : PlayerListData,
    [Event.COUNTDOWN_START] : EmptyEventData,
    [Event.GAME_START] : GameStartData,
    [Event.START_TURN] : EmptyEventData,
    [Event.VOTING_START] : EmptyEventData,
    [Event.SHOW_IMPOSTOR] : GameResultData
};

export type EventHandler<K extends keyof EventMap> = (data: EventMap[K]) => void;