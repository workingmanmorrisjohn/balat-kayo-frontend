import { useNavigate } from "react-router";
import { useState } from "react";
import Page from "../components/core/Page";
import { RoutePath } from "../enums/RoutePath";
import { useGameContext } from "../providers/GameProvider";
import { ROOM_BASE_URL } from "../utils/BaseUrl";

const RoomCodePage = () => {
    const navigate = useNavigate();
    const { joinRoom } = useGameContext();
    const [roomCode, setRoomCode] = useState("");
    const [numberOfRounds, setNumberOfRounds] = useState(1);

    const createRoom = async (): Promise<string | null> => {
        if (numberOfRounds == 0) {
            alert("Number of rounds Can't be 0!");
            return null;
        }

        try {
            const response = await fetch(`${ROOM_BASE_URL}/create-room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ numberOfRounds })
            });
    
            if (!response.ok) {
                throw new Error(`Failed to create room: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Room created with ID:', data.room_id);
            return data.room_id;
        } catch (error) {
            console.error('Error creating room:', error);
        }
    
        return null;
    };    

    const validRoom = async (roomId: string): Promise<boolean | null> => {
        try {
            const response = await fetch(`${ROOM_BASE_URL}/room-status/${roomId}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Failed to check room status: ${response.status}`);
            }

            const data = await response.json();

            const room_status = data.status

            if (room_status == "STARTED") {
                return false;
            }

            if (room_status == "WAITING") {
                return true;
            }
        } catch (error) {
            console.error('Error creating room:', error);
        }

        return null;
    }

    const handleCreateRoom = async () => {
        const room_id = await createRoom();
        if (room_id) {
            joinRoom(room_id);
            navigate(RoutePath.LOBBY);
        }
    };

    const openNewRoomModal = () => {
        (document.getElementById("new_room_modal") as HTMLDialogElement).showModal();
    }

    const handleJoinRoom = async () => {
        if (!roomCode.trim()) {
            alert("Please enter a room code.");
            return;
        }

        const isRoomValid = await validRoom(roomCode.trim());

        if (isRoomValid) {
            joinRoom(roomCode.trim());
            navigate(RoutePath.LOBBY);
        }

        if (!isRoomValid) {
            if (isRoomValid == null) {
                alert("Room does not exist!");
            }
            else {
                alert("Game already started! Wait for it to finish before joining.")
            }
        }



    };

    return (
        <Page>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full h-5/12 flex items-end justify-center">
                    <button onClick={openNewRoomModal} className="btn btn-primary h-2/4 w-3/4 text-xl font-bold text-white">
                        New Room
                    </button>
                </div>

                <div className="w-full h-2/12 flex flex-col items-center justify-center gap-8">
                    <div className="divider font-bold text-2xl">OR</div>
                </div>

                <div className="w-full h-5/12 flex flex-col items-center gap-4">
                    <input
                        type="text"
                        placeholder="Enter room code"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        className="input w-3/4 h-1/4 text-xl font-black text-center"
                    />
                    <button onClick={handleJoinRoom} className="btn btn-primary h-1/4 w-3/4 text-xl font-bold text-white">
                        Join
                    </button>
                </div>
            </div>

            <dialog id="new_room_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Room</h3>
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Number Of Rounds</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter number of rounds"
                            className="input input-bordered text-lg font-black"
                            min={1}
                            value={numberOfRounds}
                            onChange={(e) => setNumberOfRounds(Number(e.target.value))}
                            name="roomNumber"
                        />
                    </div>

                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={handleCreateRoom}>Create</button>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </Page>
    );
};

export default RoomCodePage;
