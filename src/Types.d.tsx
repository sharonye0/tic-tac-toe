/* eslint-disable @typescript-eslint/no-unused-vars */
type Player = "X" | "O";
type Square = "X" | "O" | null;
type TheWinner = "X" | "O" | "Tie" | null;

interface boardContext {
    squares: Array<Square>;
    player: "human" | "computer";
    currentHumanOrComputerPlayer: Player,
    currentPlayer: Player;
    winner: TheWinner;
    reset: () => void;
    returnToStartingPage: () => void;
    setSquareValue: (index: number | null) => void;
    chooseASquareRandomly: () => number | null;
    switchPlayer: (player: "human" | "computer") => void,
    minimax: (newBoard: Array<Square>, player: Player) => number;
    checkWinner: (squares: Array<Square>) => TheWinner;
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

