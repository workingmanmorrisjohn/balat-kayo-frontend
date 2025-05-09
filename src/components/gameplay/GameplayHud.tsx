import { EmptyEventData } from "../../backend/EventDataTypes";
import { Event } from "../../enums/Event";
import { useGameContext } from "../../providers/GameProvider";

const GameplayHud = () => {
    const { isImpostor, theWord, myTurn, sendMessage, endTurn } = useGameContext();

    const handleEndTurn = () => {
        const emptyData: EmptyEventData = {};

        sendMessage(Event.END_TURN, emptyData);

        endTurn();
    }

    return (
        <>
            <div className="absolute bottom-0 font-bold w-full h-[200px]">
                <div className="flex w-full h-full justify-center items-center relative">
                    <div className="w-full h-full bg-white shadow-2xl rounded-2xl p-2 relative">
                        {
                            myTurn &&
                            <button
                                className="btn btn-success text-white absolute top-4 right-4 z-10"
                                onClick={handleEndTurn}>
                                End Turn
                            </button>
                        }

                        <div className="flex flex-col h-full gap-2 items-center justify-center">
                            <h1 className="text-sm">{!isImpostor && "the word"}</h1>
                            <h2 className={"text-2xl font-black " + (isImpostor && "text-red-700")}>{isImpostor ? "IMPOSTOR" : theWord}</h2>
                            {isImpostor && <h1 className="text-md">clue: {theWord}</h1>}
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default GameplayHud;