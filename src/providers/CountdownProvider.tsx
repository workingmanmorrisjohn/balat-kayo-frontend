import { createContext, useContext, useEffect, useState } from "react";

interface CountdownContextType {
    timer: number;
}

const CountdownContext = createContext<CountdownContextType | null>(null);

interface CountdownProviderProps {
    children: React.ReactNode;
    initialSeconds?: number;
}

export const CountdownProvider: React.FC<CountdownProviderProps> = ({ children, initialSeconds = 60 }) => {
    const [timer, setTimer] = useState(initialSeconds);

    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <CountdownContext.Provider value={{ timer }}>
            {children}
        </CountdownContext.Provider>
    );
};

export const useTimerContext = () => {
    const context = useContext(CountdownContext);

    if (context === null) {
        throw new Error("useTimerContext must be used within a TimerContextProvider");
    }

    return context;
};
