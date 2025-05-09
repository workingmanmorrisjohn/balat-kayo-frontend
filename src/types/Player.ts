export interface Player {
    player_id: string,
    player_image_url: string,
    player_name: string,
    is_ready: boolean,
    turn_ended: boolean,
    has_voted: boolean,
    currently_discussing: boolean
}