import React, { useContext, useState } from "react";
import BoardContext from "./board-context";
import GameContext from "./game-context";



const BoardDataProvider = ({ children }: { children?: React.ReactNode }) => {
    // this needs to be one big reducer |or| replace all this with classes (1 parent class that both modes can inherit)
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState<"human" | "computer">("human");

    // This state is for playing against a human (a Friend)
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');

    // This state is for human and computer
    const [currentHumanOrComputerPlayer, setCurrentHumanOrComputerPlayer] = useState<"X" | "O">(player === "computer" ? "X" : "O");
    const [winner, setWinner] = useState<TheWinner>(null);
    const gameData = useContext(GameContext);

    const boardContext: boardContext = {
        squares: squares,
        player: player,
        currentPlayer: currentPlayer,
        currentHumanOrComputerPlayer: currentHumanOrComputerPlayer,
        winner: winner,
        reset(): void {
            setSquares(Array(9).fill(null));
            if (gameData.gameInterface.vsFriend)
                setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
            if (gameData.gameInterface.vsComputer)
                setCurrentHumanOrComputerPlayer("O"); // O === human player "we always starts with the human"
            setWinner(null);
        },
        returnToStartingPage(): void {
            this.reset();
            gameData.exitGameHandler();
        },
        setSquareValue(index: number | null): void {
            const newData = squares.map((val, i: number) => {
                if (i === index) {
                    if (gameData.gameInterface.vsComputer) return currentHumanOrComputerPlayer;
                    else return currentPlayer;
                }
                return val;
            })
            setSquares(newData);
            if (gameData.gameInterface.vsFriend)
                setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
            else setCurrentHumanOrComputerPlayer(currentHumanOrComputerPlayer === "X" ? "O" : "X");
        },
        switchPlayer(player: "human" | "computer"): void {
            setPlayer(player);
        },
        chooseASquareRandomly(): number | null {
            const availableSquares = squares.map((square, i) => square === null ? i : null).filter(square => typeof square === "number");
            if (typeof availableSquares[0] === "number")
                return availableSquares[0];
            else {
                this.settingTheWinner(this.checkWinner(squares));
                return null;
            }

        },
        minimax(newBoard, player): number {

            return 0;
        },
        checkWinner(squares: Array<Square>): TheWinner {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (
                    squares[a] &&
                    squares[a] === squares[b] &&
                    squares[a] === squares[c]
                ) {
                    return squares[a];
                }
            }

            return null;
        },
        settingTheWinner(theWinner: TheWinner): void {
            console.log(squares.filter((square) => !square).length);
            if (theWinner)
                setWinner(theWinner);
            if (!theWinner && !squares.filter((square) => !square).length)
                setWinner("Tie");
        },
    };

    return (
        <BoardContext.Provider value={boardContext}>
            {children}
        </BoardContext.Provider>
    );
};

export default BoardDataProvider;
