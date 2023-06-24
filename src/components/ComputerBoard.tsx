import { useCallback, useContext, useEffect } from "react";
import Square from "./boardComponents/Square";
import styles from "./ComputerBoard.module.css";
import BoardContext from "../gameData/board-context";
import ExitAndReset from "./boardComponents/ExitAndReset";

const THE_TIME_COMPUTER_TAKES_TO_PLAY_A_MOVE = 250; // In Milliseconds

const FriendBoard = () => {
    const boardData = useContext(BoardContext);

    const computerMove = useCallback((): void => {
        boardData.setSquareValue(boardData.chooseASquareRandomly());
        boardData.switchPlayer("human");
    }, [boardData]);

    useEffect(() => {
        const theWinner = boardData.checkWinner(boardData.squares);
        if (!theWinner) {
            setTimeout(() => {
                if (boardData.player === "computer") {
                    computerMove();
                }
            }, THE_TIME_COMPUTER_TAKES_TO_PLAY_A_MOVE);
        } else {
            boardData.settingTheWinner(theWinner);
            boardData.switchPlayer("human");
        }
    }, [boardData, computerMove])

    const humanClickedSquareHandler = (i: number) => {
        boardData.setSquareValue(i);
        boardData.switchPlayer("computer");
    }

    let content;
    if (boardData.winner === "X") { // human lose
        content = (
            <div className={`${styles.info} ${styles.loser}`}>
                <p
                    className={`${styles.whichPlayerTurn} ${styles.loser}`}
                > You Lose(r) </p>
            </div>
        )
    }
    else if (boardData.winner === "O") { // human win
        content = (
            <div className={`${styles.info} ${styles.winner}`}>
                <p
                    className={`${styles.whichPlayerTurn} ${styles.winner}`}
                >🎉 Congratulations You Win 🎉</p>
            </div>
        )
    }

    else if (boardData.winner === "Tie") {
        console.log(boardData.winner);
        content = (
            <div className={`${styles.info} ${styles.tie}`}>
                <p className={styles.whichPlayerTurn}>👎🏼 Damn, it's a Tie 👎🏼</p>
            </div>
        )
    }


    return (
        <main className={styles.container}>
            {content}
            <div className={styles.grid}>
                {boardData.player === "human" && Array(9).fill(null).map(
                    (_, i) => <Square
                        winner={boardData.winner}
                        key={i}
                        onClick={() => humanClickedSquareHandler(i)}
                        value={boardData.squares[i]} />
                )}
                {boardData.player === "computer" && Array(9).fill(null).map(
                    (_, i) => <Square
                        winner={boardData.winner}
                        key={i}
                        value={boardData.squares[i]}
                    />
                )}
            </div>
            <ExitAndReset />
        </main >
    );
}

export default FriendBoard;