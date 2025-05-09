import Page from "../components/core/Page";
import CountdownTimer from "../components/countdown/CountdownTimer";
import { CountdownProvider } from "../providers/CountdownProvider";

const CountdownPage = () => {
    return (
        <>
        <Page>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1>The game will start in:</h1>
                <CountdownProvider initialSeconds={3}>
                    <CountdownTimer />
                </CountdownProvider>
            </div>

        </Page>
        </>
    )
}

export default CountdownPage;