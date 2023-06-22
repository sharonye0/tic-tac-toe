import { useEffect, useContext } from "react";
import Square from "./boardComponents/Square";
import styles from "./FriendBoard.module.css";
import BoardContext from "../gameData/board-context";

const ComputerBoard = () => {

    const boardData = useContext(BoardContext);

    useEffect(() => {
        const theWinner = boardData.checkWinner(boardData.squares);
        boardData.settingTheWinner(theWinner);
    }, [boardData, boardData.squares])

    let content = (
        <div className={styles.info}>
            <p className={styles.whichPlayerTurn}>{boardData.currentPlayer}, it's your turn</p>
        </div>
    )

    if (boardData.winner)
        content = (
            <div className={`${styles.info} ${styles.winner}`}>
                <p className={`${styles.whichPlayerTurn} ${styles.winner}`}>🎉 Congratulations {boardData.winner} 🎉</p>
            </div>
        )

    if (boardData.winner === "Tie")
        content = (
            <div className={`${styles.info} ${styles.tie}`}>
                <p className={styles.whichPlayerTurn}>👎🏼 Damn, it's a Tie 👎🏼</p>
            </div>
        )

    return (
        <main className={styles.container}>
            {content}
            <div className={styles.grid}>
                {Array(9).fill(null).map(
                    (_, i) => <Square
                        winner={boardData.winner}
                        key={i}
                        onClick={() => boardData.setSquareValue(i)}
                        value={boardData.squares[i]} />
                )}
            </div>
            <div className={styles.btnContainer}>
                <button
                    className={`${styles.boardBtn} ${styles.exit}`}
                    onClick={() => { boardData.returnToStartingPage(); }}
                > Exit </button>
                <button
                    className={`${styles.boardBtn} ${styles.restart}`}
                    onClick={boardData.reset}
                > Restart </button>
            </div>
        </main>
    );
}

export default ComputerBoard;
