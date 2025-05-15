import { useNavigate } from "react-router";
import Page from "../components/core/Page";
import Spacer from "../components/core/Spacer";
import ResultsList from "../components/results/ResultsList";
import RoomIdHeaderResults from "../components/results/RoomIdHeaderResults";
import { RoutePath } from "../enums/RoutePath";
import { useGameContext } from "../providers/GameProvider";
import ImpostorCard from "../components/results/ImpostorCard";


const ResultsPage = () => {
    const navigate = useNavigate();
    const {reset, gameResult} = useGameContext();

    const handleBackToLobby = () => {
        navigate(RoutePath.LOBBY);
        reset();
    }

    return (
        <Page>
            <div className="w-full h-full flex flex-col relative">
                <div className="w-full h-[calc(100vh-150px)] flex flex-col items-center px-4">
                    <Spacer />
                    <RoomIdHeaderResults />
                    <Spacer />

                    <div className="w-full flex flex-col items-center rounded-xl p-4 bg-white shadow-lg">
                        <h1 className="text-lg font-black">{gameResult?.word}</h1>
                    </div>

                    <Spacer />
                    <h2 className="mb-2 text-lg font-semibold">Impostor</h2>
                    <ImpostorCard />
                    <Spacer />



                    <h2 className="mb-2 text-lg font-semibold">Votes</h2>

                    <ResultsList />

                    <button className="btn btn-neutral mt-8" onClick={handleBackToLobby}>Back To Lobby</button>
                </div>
            </div>
        </Page>
    );
};

export default ResultsPage;
