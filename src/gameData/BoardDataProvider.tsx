import React, { useContext, useState } from "react";
import BoardContext from "./board-context";
import GameContext from "./game-context";



const BoardDataProvider = ({ children }: { children?: React.ReactNode }) => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] =
        useState<Player>(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
    const [winner, setWinner] = useState<TheWinner>(null);

    const gameData = useContext(GameContext);

    const boardContext: boardContext = {
        squares: squares,
        currentPlayer: currentPlayer,
        winner: winner,
        reset(): void {
            setSquares(Array(9).fill(null));
            if (gameData.gameInterface.vsFriend)
                setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
            setWinner(null);
        },

        setSquares(newData: Array<Square>): void { setSquares(newData) },

        returnToStartingPage(): void {
            this.reset();
            gameData.exitGameHandler();
        },

        setSquareValue(index: number | null): void {
            const newData = squares.map((val, i: number) => {
                if (i === index) {
                    return currentPlayer;
                }
                return val;
            });
            setSquares(newData);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        },

        checkWinner(squares: Array<Square> | Array<MinimaxSquare>): TheWinner {
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
            if (!squares.length)
                throw new Error("Array is empty");

            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (squares[a] &&
                    squares[a] === squares[b] &&
                    squares[a] === squares[c])
                    return squares[a];

            }
            return null;
        },

        settingTheWinner(theWinner: TheWinner): void {
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
