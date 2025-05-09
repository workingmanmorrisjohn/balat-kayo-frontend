import { EmptyEventData, IdentifyData, PlayerListData } from "./EventDataTypes";

export type EventData = IdentifyData | PlayerListData | EmptyEventData;