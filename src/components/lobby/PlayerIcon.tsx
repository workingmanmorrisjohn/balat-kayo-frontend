import { Player } from "../../types/Player";

interface PlayerIconProps {
    player: Player
}

const PlayerIcon = ({ player }: PlayerIconProps) => {
    return (<>
        <div className="flex flex-col items-centerbg-white gap-2 indicator bg-white p-2 rounded-lg shadow-sm">
            {
                player.is_ready && <span className="indicator-item badge badge-xs badge-success text-white">Ready</span>
            }

            <label className="cursor-pointer">
                <img
                    src={
                        player.player_image_url != ""
                            ? player.player_image_url
                            : "https://blog.spoongraphics.co.uk/wp-content/uploads/2017/vector-characters/24.png"
                    }
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
            </label>

            <div className="text-sm font-black text-center break-words max-w-[80px] line-clamp-2">
                {player.player_name}
            </div>

        </div>
    </>)
}

export default PlayerIcon;