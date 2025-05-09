import { useGameContext } from "../../providers/GameProvider";


const ImpostorCard = () => {
    const { players, gameResult } = useGameContext();

    const player = players.find(p => p.player_id === gameResult?.impostor) || null;

    return (
    <div className="flex items-center justify-between rounded-xl p-4 w-full bg-white shadow-lg">
        <div className="flex items-center gap-4">
            <img
                src={player?.player_image_url ? player.player_image_url : "https://blog.spoongraphics.co.uk/wp-content/uploads/2017/vector-characters/24.png"}
                alt={`${player?.player_name} avatar`}
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="font-medium text-red-600">{player?.player_name}</div>
        </div>
    </div>
    )
};

export default ImpostorCard;