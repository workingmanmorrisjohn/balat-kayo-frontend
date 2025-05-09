import { Event } from "../enums/Event";
import { EventData } from "./EventData";

export interface WebSocketMessage {
    event: Event;
    data: EventData;
}