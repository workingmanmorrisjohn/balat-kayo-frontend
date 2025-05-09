import { useGameContext } from "../../providers/GameProvider";

const RoomIdHeaderResults = () => {
    const { room } = useGameContext();

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center p-2 gap-2">
                <span className="font-semibold">
                    Room ID:
                </span>
                <span className="text-2xl font-bold">
                    {room ? room.room_id : "INVALID ROOM"}
                </span>

                <span className="text-lg font-semibold">
                    Results
                </span>

            </div>
        </>
    )
}

export default RoomIdHeaderResults;