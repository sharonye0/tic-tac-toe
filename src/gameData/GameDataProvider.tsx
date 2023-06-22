import { useState } from "react";
import GameContext from "./game-context";

const defaultGameState: gameInterface = { landingPage: true, vsComputer: false, vsFriend: false };

const GameDataProvider = (props: any) => {

    const [gameInterface, setGameInterface] = useState<gameInterface>(defaultGameState);

    const playWithAIHandler = (): void => {
        setGameInterface({ landingPage: false, vsComputer: true, vsFriend: false });
    }

    const playWithAFriendHandler = (): void => {
        setGameInterface({ landingPage: false, vsComputer: false, vsFriend: true });
    }

    const exitGameHandler = (): void => {
        setGameInterface({ landingPage: true, vsComputer: false, vsFriend: false });
    }

    const gameContext = {
        gameInterface: gameInterface,
        playWithAIHandler,
        playWithAFriendHandler,
        exitGameHandler
    };

    return (
        <GameContext.Provider value={gameContext}>
            {props.children}
        </GameContext.Provider>
    );
};

export default GameDataProvider;
