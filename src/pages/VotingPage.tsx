import Page from "../components/core/Page";
import Spacer from "../components/core/Spacer";
import PlayerGridVoting from "../components/voting/PlayerGridVoting";
import RoomIdHeaderVoting from "../components/voting/RoomIdHeaderVoting";
import VotingHud from "../components/voting/VotingHud";

const VotingPage = () => {
    return (
        <>
        <Page>
            <div className="w-full h-full flex flex-col relative">
                <div className="w-full h-[calc(100vh-150px)] flex flex-col">
                    <Spacer />

                    <RoomIdHeaderVoting />

                    <Spacer />

                    <PlayerGridVoting />
                    
                </div>
                <VotingHud />
            </div>

        </Page>
    </>
    )
}

export default VotingPage;