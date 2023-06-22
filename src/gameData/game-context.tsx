/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";


const GameContext = createContext<gameContext>({
    gameInterface: { landingPage: true, vsComputer: false, vsFriend: false },
    playWithAIHandler(): void { },
    playWithAFriendHandler(): void { },
    exitGameHandler(): void { },
});

export default GameContext;