import { useGameContext } from "../../providers/GameProvider";
import { useState, useEffect } from "react";
import { Event } from "../../enums/Event";
import { EmptyEventData, NewNameData } from "../../backend/EventDataTypes";
import { usePocketBase } from "../../providers/PocketbaseProvider";

const PlayerHud = () => {
    const pb = usePocketBase();
    const { currentPlayer, sendMessage, players, minPlayerFilled } = useGameContext();

    const player = players.find(p => p.player_id === currentPlayer) || null;
    const [name, setName] = useState("");
    const [_image, setImage] = useState<File | null>(null);

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editing) {
            return;
        }

        if (player?.player_name) {
            setName(player.player_name);
        }
    }, [player]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditing(true);

        setName(e.target.value);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);

            const formData = new FormData();
            formData.append("image", file);

            try {
                const record = await pb.collection('player_image').create(formData);
                console.log("Image uploaded:", record);

                // If PocketBase returns a URL or record ID
                sendMessage(Event.SET_IMAGE, {
                    player_image_url: pb.files.getURL(record, record.image), // adjust based on your field name
                });
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }
    };

    const handleSave = () => {
        console.log("Saved Name:", name);
        const newNameData: NewNameData = { new_name: name };
        sendMessage(Event.SET_NAME, newNameData);
        setEditing(false);
    };

    const handleReady = () => {
        const emptyData: EmptyEventData = {};
        if (player?.is_ready) {
            sendMessage(Event.REMOVE_READY, emptyData);
        } else {
            sendMessage(Event.SET_READY, emptyData);
        }
    };

    return (
        <div className="absolute bottom-0 font-bold w-full h-[150px]">
            <div className="flex w-full h-full justify-center items-center relative">
                <div className="w-full h-full bg-white shadow-2xl rounded-2xl flex flex-row items-center justify-center gap-8 p-2">
                    <div className="flex flex-col items-center gap-4 indicator">
                        {player?.is_ready && (
                            <span className="indicator-item badge badge-xs badge-success text-white">
                                Ready
                            </span>
                        )}
                        <label className="cursor-pointer">
                            <img
                                src={
                                    player?.player_image_url
                                        ? player.player_image_url
                                        : "https://blog.spoongraphics.co.uk/wp-content/uploads/2017/vector-characters/24.png"
                                }
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    <div className="flex flex-col h-full gap-4 items-center justify-center">
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="input font-black text-center"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <div className="w-full flex flex-row items-center justify-center gap-4">
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                            <button
                                onClick={handleReady}
                                className="btn btn-success text-white"
                                disabled={!minPlayerFilled}
                            >
                                Ready
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerHud;
