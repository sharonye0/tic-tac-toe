/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";


const BoardContext = createContext<boardContext>(
    {
        squares: [],
        player: "human",
        currentPlayer: "O",
        currentHumanOrComputerPlayer: "O", // by Default we start with player O (human)
        winner: null,
        reset() { },
        returnToStartingPage(): void { },
        setSquareValue(index: number | null): void { },
        chooseASquareRandomly(): number | null {
            return 0;
        },
        switchPlayer(player: "human" | "computer"): void { },
        minimax(newBoard: Array<Square>, player: Player): number {
            return 0;
        },
        checkWinner(squares: Array<Square>): TheWinner {
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
        settingTheWinner(theWinner: TheWinner): void { },
    }
);

export default BoardContext;
