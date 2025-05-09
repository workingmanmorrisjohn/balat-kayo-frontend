import { useGameContext } from "../../providers/GameProvider";
import { VoteSummary } from "../../types/GameResult";

interface PlayerCardResults {
    vote: VoteSummary
}

const PlayerCardResults = ({ vote }: PlayerCardResults) => {
    const { players } = useGameContext();

    const player = players.find(p => p.player_id === vote.player_id) || null;
    
    return (
    <div className="flex items-center justify-between rounded-xl p-4 w-full bg-white shadow-lg">
        <div className="flex items-center gap-4">
            <img
                src={player?.player_image_url ? player.player_image_url : "https://blog.spoongraphics.co.uk/wp-content/uploads/2017/vector-characters/24.png"}
                alt={`${player?.player_name} avatar`}
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="font-medium">{player?.player_name}</div>
        </div>
        <div className="flex gap-2">
            {vote.voted_this_guy.map((voterUrl, index) => (
                <img
                    key={index}
                    src={voterUrl ? voterUrl : "https://blog.spoongraphics.co.uk/wp-content/uploads/2017/vector-characters/24.png"}
                    alt="voter avatar"
                    className="w-4 h-4 rounded-full  object-cover"
                />
            ))}
        </div>
    </div>
    )
};

export default PlayerCardResults;