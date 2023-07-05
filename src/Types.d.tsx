/* eslint-disable @typescript-eslint/no-unused-vars */
type Player = "X" | "O";
type Square = "X" | "O" | null;
type MinimaxSquare = "X" | "O" | number;
type TheWinner = "X" | "O" | "Tie" | null | number;
type Move = { score: number, index: number };

interface boardContext {
    squares: Array<Square>;
    currentPlayer: Player;
    winner: TheWinner;
    reset: () => void;
    returnToStartingPage: () => void;
    setSquareValue: (index: number | null) => void;
    setSquares: (newData: Array<Square>) => void;
    checkWinner: (squares: Array<Square> | Array<MinimaxSquare>) => TheWinner;
    settingTheWinner: (theWinner: TheWinner) => void;
}

interface gameInterface {
    landingPage: boolean;
    vsComputer: boolean;
    vsFriend: boolean;
}

interface gameContext {
    gameInterface: gameInterface;
    playWithAIHandler: () => void;
    playWithAFriendHandler: () => void;
    exitGameHandler: () => void;
}
