import Page from "../components/core/Page";
import Spacer from "../components/core/Spacer";
import PlayerGrid from "../components/lobby/PlayerGrid";
import PlayerHud from "../components/lobby/PlayerHud";
import RoomIdHeader from "../components/lobby/RoomIdHeader";

const LobbyPage = () => {
    

    return (
        <>
            <Page>
                <div className="w-full h-full flex flex-col relative">
                    <div className="w-full h-[calc(100vh-150px)] flex flex-col">
                        <Spacer />

                        <RoomIdHeader />

                        <Spacer />

                        <PlayerGrid />
                        
                    </div>
                    <PlayerHud />
                </div>

            </Page>
        </>
    )
}

export default LobbyPage;