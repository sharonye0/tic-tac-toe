/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useContext, useEffect } from "react";
import Square from "./boardComponents/Square";
import styles from "./ComputerBoard.module.css";
import BoardContext from "../gameData/board-context";
import ExitAndReset from "./boardComponents/ExitAndReset";
import WinOrLoseGameResult from "./boardComponents/WinOrLoseGameResult";

const THE_TIME_COMPUTER_TAKES_TO_PLAY_A_MOVE = 250; // In Milliseconds

const ComputerBoard = () => {
    const [player, setPlayer] = useState<"human" | "computer">("human");
    const [currentHumanOrComputerPlayer, setCurrentHumanOrComputerPlayer] =
        useState<"X" | "O">(player === "computer" ? "X" : "O");

    const boardData = useContext(BoardContext);

    const setSquareValue = useCallback((index: number | null): void => {
        const newData = boardData.squares.map((val, i: number) => {
            if (i === index)
                return currentHumanOrComputerPlayer;

            return val;
        });
        boardData.setSquares(newData);
        setCurrentHumanOrComputerPlayer(currentHumanOrComputerPlayer === 'X' ? 'O' : 'X');
    }, [boardData, currentHumanOrComputerPlayer])

    const minimax = useCallback((newBoard: Array<MinimaxSquare>, player: "X" | "O"): any => {
        const availableSquares: any[] = newBoard.filter((square) => typeof square === "number");

        // 1. return value if terminal state is found (base case).
        if (boardData.checkWinner(newBoard) === "X") {
            return { score: 10 };
        }
        else if (boardData.checkWinner(newBoard) === "O") {
            return { score: -10 };
        }
        else if (!availableSquares.length) {
            return { score: 0 };
        }
        // 2. iterate through available moves and call minimax on each one.
        const moves: Array<Move> = [];
        availableSquares.forEach((availableSquare: number): void => {
            const move: any = { score: 0, index: 0 };
            move.index = newBoard[availableSquare];
            newBoard[availableSquare] = player;

            // 3. call the minimax function on each available move.
            if (player === "X")
                move.score = minimax(newBoard, "O").score;

            else if (player === "O")
                move.score = minimax(newBoard, "X").score;

            newBoard[availableSquare] = move.index;
            moves.push(move);
        })

        let bestMove = 0;
        // 4. evaluate returning values from each function call.
        if (player === "X") {
            let bestScore = -10000;
            moves.forEach((move, i) => {
                if (move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = i;
                }
            })
            // 5. return the best move.
            return moves[bestMove];
        } else if (player === "O") {
            let bestScore = 10000;
            moves.forEach((move, i) => {
                if (move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = i;
                }
            });
            // 5. return the best move.
            return moves[bestMove];
        }
        return null;
    }, [boardData])

    const bestSpot = useCallback((): number | null => {
        const squaresFilledWithNumber = boardData.squares
            .map((square, index) => square === null ? index : square);

        const bestSpot = minimax(squaresFilledWithNumber, "X");
        return bestSpot.index;

    }, [boardData.squares, minimax])


    const computerMove = useCallback((): void => {
        boardData.checkWinner(boardData.squares);
        setSquareValue(bestSpot());
        setPlayer("human");
    }, [bestSpot, boardData, setSquareValue]);

    useEffect(() => {
        const theWinner = boardData.checkWinner(boardData.squares);
        if (!theWinner) {
            boardData.settingTheWinner(theWinner);
            setTimeout(() => {
                if (player === "computer") computerMove();
            }, THE_TIME_COMPUTER_TAKES_TO_PLAY_A_MOVE);
        }
        else {
            boardData.settingTheWinner(theWinner);
        }
    }, [boardData, computerMove, player])

    const humanClickedSquareHandler = (index: number) => {
        setSquareValue(index);
        setPlayer("computer");
    }

    const resetComputer = (): void => {
        setPlayer("human");
        setCurrentHumanOrComputerPlayer("O");
    }

    return (
        <main className={styles.container}>
            <WinOrLoseGameResult winner={boardData.winner} />
            <div className={styles.grid}>
                {player === "human" && Array(9).fill(null).map(
                    (_, i) => <Square
                        winner={boardData.winner}
                        key={i}
                        onClick={() => humanClickedSquareHandler(i)}
                        value={boardData.squares[i]} />
                )}
                {player === "computer" && Array(9).fill(null).map(
                    (_, i) => <Square
                        winner={boardData.winner}
                        key={i}
                        value={boardData.squares[i]}
                    />
                )}
            </div>
            <ExitAndReset onReset={resetComputer} />
        </main >
    );
}

export default ComputerBoard;
