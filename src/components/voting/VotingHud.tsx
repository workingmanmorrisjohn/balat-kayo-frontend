import { VoteData } from "../../backend/EventDataTypes";
import { Event } from "../../enums/Event";
import { useGameContext } from "../../providers/GameProvider";

const VotingHud = () => {
    const { selectedPlayer, sendMessage, vote, voted, players } = useGameContext();

    const handleVote = () => {
        const voteData: VoteData = { voted: selectedPlayer ? selectedPlayer.player_id : "" };

        sendMessage(Event.SET_VOTE, voteData);

        vote();
    }

    return (
        <>
            <div className="absolute bottom-0 font-bold w-full h-[200px]">
                <div className="flex w-full h-full justify-center items-center relative">
                    <div className="w-full h-full bg-white shadow-2xl rounded-2xl p-2 relative">
                        {
                            !voted && (selectedPlayer != null) && players.includes(selectedPlayer) &&
                            <button
                                className="btn btn-success text-white absolute top-4 right-4 z-10"
                                onClick={handleVote}>
                                Submit Vote
                            </button>
                        }

                        <div className="flex flex-col h-full gap-2 items-center justify-center">
                            <h1 className="text-sm">{"the impostor is"}</h1>
                            <h2 className="text-2xl font-black text-red-700">
                                {selectedPlayer != null && players.some(p => p.player_id === selectedPlayer.player_id)
                                    ? selectedPlayer.player_name
                                    : ""}
                            </h2>

                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default VotingHud;