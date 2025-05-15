import { VoteSummary } from "../types/GameResult"
import { Player } from "../types/Player"

export interface EmptyEventData {}

export interface IdentifyData {
    player_name: string,
    player_image_url: string
    is_ready: boolean
}

export interface PlayerListData {
    players: Player[]
}

export interface PlayerJoinedData {
    current_player: Player
}

export interface NewNameData {
    new_name: string
}

export interface GameStartData {
    is_impostor: boolean
    word: string
}

export interface VoteData {
    voted: string
}

export interface GameResultData {
    impostor: string;
    winner: 'impostor' | 'players';
    votes: VoteSummary[];
    word: string;
}