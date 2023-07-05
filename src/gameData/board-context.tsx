/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";


const BoardContext = createContext<boardContext>(
    {
        squares: [],
        currentPlayer: "O",
        winner: null,
        reset() { },
        returnToStartingPage(): void { },
        setSquareValue(): void { },
        setSquares(): void { },
        checkWinner(squares: Array<Square> | Array<MinimaxSquare>): TheWinner {
            const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
            lines.forEach(line => {
                const [a, b, c] = line;
                if (
                    squares[a] &&
                    squares[a] === squares[b] &&
                    squares[a] === squares[c]
                ) {
                    return squares[a];
                }
            })
            return null;
        },
        settingTheWinner(): void { },
    }
);

export default BoardContext;