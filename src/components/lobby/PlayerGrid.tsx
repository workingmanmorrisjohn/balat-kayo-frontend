import { useGameContext } from "../../providers/GameProvider";
import PlayerIcon from "./PlayerIcon";

const PlayerGrid = () => {
    const { players, currentPlayer } = useGameContext();

    return (
        <>
            <div className="w-full h-3/5 overflow-y-scroll">
                <div className="w-fit mx-auto grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 p-4 ">
                    {
                        players.map((player) => {
                            if (player.player_id == currentPlayer) return null;
                            return <PlayerIcon player={player} key={player.player_id} />;
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default PlayerGrid;