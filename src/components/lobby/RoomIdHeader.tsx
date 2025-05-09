import { useGameContext } from "../../providers/GameProvider";

const RoomIdHeader = () => {
    const {room, numOfPlayers} = useGameContext();

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
                    {numOfPlayers == 1 ? "Only you in the room" : `${numOfPlayers} players in the room`}
                </span>

            </div>
        </>
    )
}

export default RoomIdHeader;