import { useTimerContext } from "../../providers/CountdownProvider";

const CountdownTimer = () => {
    const {timer} = useTimerContext();

    return (
        <>
            <h1 className=" text-9xl mt-4">{timer}</h1>
        </>
    )
}

export default CountdownTimer;