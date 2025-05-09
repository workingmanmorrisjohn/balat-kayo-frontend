import Page from "../components/core/Page";
import Spacer from "../components/core/Spacer";
import GameplayHud from "../components/gameplay/GameplayHud";
import PlayerGridGameplay from "../components/gameplay/PlayerGridGameplay";
import RoomIdHeaderGameplay from "../components/gameplay/RoomIdHeaderGameplay";

const GameplayPage = () => {
    return (
        <>
        <Page>
            <div className="w-full h-full flex flex-col relative">
                <div className="w-full h-[calc(100vh-150px)] flex flex-col">
                    <Spacer />

                    <RoomIdHeaderGameplay />

                    <Spacer />

                    <PlayerGridGameplay />
                    
                </div>
                <GameplayHud />
            </div>

        </Page>
    </>
    )
}

export default GameplayPage;