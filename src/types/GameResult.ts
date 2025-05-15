
export interface GameResult {
    impostor: string;
    winner: 'impostor' | 'players';
    votes: VoteSummary[];
    word: string;
}

export interface VoteSummary {
  player_id: string;
  voted_this_guy: string[];
}
