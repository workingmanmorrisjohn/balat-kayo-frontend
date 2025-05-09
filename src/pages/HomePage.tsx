import { ArrowRight } from "lucide-react";
import Page from "../components/core/Page"
import { useNavigate } from "react-router";
import { RoutePath } from "../enums/RoutePath";

const HomePage = () => {
    const navigate = useNavigate();

    const goToRoomCodePage = () => {
        navigate(RoutePath.ROOM_CODE);
    }

    return (
        <>
            <Page> 
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full h-1/6" />

                    <div className="w-full h-4/6 flex flex-col items-center justify-center gap-8">
                        <h1 className="text-4xl font-bold">Balatkayo</h1>
                        <button className="btn btn-ghost text-2xl italic font-light" onClick={goToRoomCodePage}>start <ArrowRight strokeWidth={2}/></button>
                    </div>


                    <div className="w-full h-1/6" />
                </div>
            </Page>
        </>
    )
}

export default HomePage;