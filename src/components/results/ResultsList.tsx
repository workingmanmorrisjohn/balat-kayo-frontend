import { useGameContext } from "../../providers/GameProvider"
import PlayerCardResults from "./PlayerCardResults";

const ResultsList = () => {
    const { votes } = useGameContext();

    console.log(votes);

    return (
        <div className="w-full max-w-md flex flex-col gap-4 bg-slate-200 py-8 px-4 rounded-2xl shadow-lg">
            {votes.map((vote) => (
                <PlayerCardResults
                    key={vote.player_id}
                    vote={vote}
                />
            ))}
        </div>
    )


}

export default ResultsList;