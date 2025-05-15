import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Room } from "../types/Room";
import { Event } from '../enums/Event';
import { EventData } from '../backend/EventData';
import { IdentifyData } from '../backend/EventDataTypes';
import { WebSocketMessage } from '../backend/WebsocketMessage';
import { EventHandler, EventMap } from '../backend/EventHandler';
import { Player } from '../types/Player';
import { useNavigate } from 'react-router';
import { RoutePath } from '../enums/RoutePath';
import { GameResult, VoteSummary } from '../types/GameResult';
import { WEBSOCKET_URL } from '../utils/BaseUrl';
import { LocalStorageKey } from '../enums/LocalStorageKey';


interface GameContextType {
    room: Room | null,
    currentPlayer: string | null,
    players: Player[],
    minPlayerFilled: boolean,
    numOfPlayers: number,
    isImpostor: boolean,
    theWord: string,
    myTurn: boolean,
    selectedPlayer: Player | null,
    voted: boolean,
    gameResult: GameResult | null,
    votes: VoteSummary[],
    joinRoom: (room_id: string) => void,
    sendMessage: (event: Event, data: EventData) => void,
    endTurn: () => void,
    setSelectedPlayer: (player: Player) => void,
    vote: () => void
    reset: () => void
}

const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const websocketRef = useRef<WebSocket | null>(null);

    const navigate = useNavigate();

    const [room, setRoom] = useState<Room | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [minPlayerFilled, setMinPlayerFilled] = useState(false);
    const [numOfPlayers, setNumOfPlayers] = useState(0);
    const [isImpostor, setIsImpostor] = useState(false);
    const [theWord, setTheWord] = useState("");
    const [myTurn, setMyTurn] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [voted, setVoted] = useState(false);
    const [gameResult, setGameResult] = useState<GameResult | null>(null);
    const [votes, setVotes] = useState<VoteSummary[]>([]);

    const playersRef = useRef<Player[]>([]);

    const joinRoom = (room_id: string) => {
        setRoom({ room_id: room_id });
    }

    const endTurn = () => {
        setMyTurn(false);
    }
    
    const vote = () => {
        setVoted(true);
    }

    const reset = () => {
        setVoted(false);
        setMyTurn(false);
        setSelectedPlayer(null);
        setVoted(false);
    }

    const eventHandlers: {
        [K in keyof EventMap]: EventHandler<K>;
    } = {
        [Event.IDENTIFY]: (data) => {
            console.log("Joined:", data.player_name);
        },
        [Event.PLAYER_JOINED] : (data) => {
            setCurrentPlayer(data.current_player.player_id);
        },
        [Event.UPDATED_PLAYERS_LIST] : (data) => {
            setPlayers(data.players);
            setMinPlayerFilled(data.players.length >= 3);
            setNumOfPlayers(data.players.length);
        },
        [Event.COUNTDOWN_START] : (_data) => {
            navigate(RoutePath.COUNTDOWN);
        },
        [Event.GAME_START] : (data) => {
            setIsImpostor(data.is_impostor)
            setTheWord(data.word)
            navigate(RoutePath.GAMEPLAY)
        },
        [Event.START_TURN] : (_data) => {
            setMyTurn(true);
        },
        [Event.VOTING_START] : (_data) => {
            navigate(RoutePath.VOTING);
        },
        [Event.SHOW_IMPOSTOR]: (data) => {
            setGameResult(data);
            navigate(RoutePath.RESULTS);
            setVotes(data.votes);
        }
        
    };

    function handleEvent<K extends keyof EventMap>(event: K, data: EventMap[K]) {
        eventHandlers[event](data);
    }

    function isKnownEvent<K extends keyof EventMap>(
        event: string,
        _data: unknown
    ): event is K {
        return event in eventHandlers;
    }

    useEffect(() => {
        console.log("player updated: ", currentPlayer)
    }, [currentPlayer]);

    useEffect(() => {
        playersRef.current = players;
    }, [players]);

    useEffect(() => {
        if (!room) return;

        const websocket = new WebSocket(`${WEBSOCKET_URL}/ws/game/${room.room_id}`);
        websocketRef.current = websocket;

        websocket.onopen = () => {
            console.log("WebSocket connected");

            const savedName = localStorage.getItem(LocalStorageKey.PLAYER_NAME);
            const savedUrl = localStorage.getItem(LocalStorageKey.PLAYER_IMAGE_URL)

            const data: IdentifyData = { 
                player_name: savedName ? savedName : "",
                player_image_url: savedUrl ? savedUrl : "", 
                is_ready: false }

            sendMessage(Event.IDENTIFY, data);
        };

        websocket.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data) as WebSocketMessage;
            const { event: eventType, data } = message;

            console.log("Event type:", eventType);
            console.log("Received data:", data);

            if (isKnownEvent(eventType, data)) {
                handleEvent(eventType, data as any); // 'as any' is safe here due to narrowing
            } else {
                console.warn(`No handler for event: ${eventType}`);
            }
        };

        websocket.onclose = () => {
            console.log("WebSocket closed");
        };

        websocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            websocket.close();
        };

    }, [room]);

    const sendMessage = (event: Event, data: EventData) => {
        const ws = websocketRef.current;
        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log("Sent identify message");
            const message = JSON.stringify({ event, data });
            ws.send(message);
        } else {
            console.warn("WebSocket not open, message not sent");
        }
    };

    return (
        <GameContext.Provider value={{ 
            room, 
            currentPlayer, 
            players, 
            minPlayerFilled, 
            numOfPlayers,
            isImpostor,
            theWord,
            myTurn,
            selectedPlayer,
            voted,
            gameResult,
            votes,
            joinRoom, 
            sendMessage,
            endTurn,
            setSelectedPlayer,
            vote,
            reset
        }}>
            {children}
        </GameContext.Provider>
    );
}


export const useGameContext = () => {
    const context = useContext(GameContext);

    if (context === null) {
        throw new Error('useGameContext must be used within a GameContextProvider');
    }

    return context;
};
