import { useEffect, useContext } from "react";
import Square from "./boardComponents/Square";
import styles from "./FriendBoard.module.css";
import BoardContext from "../gameData/board-context";
import ExitAndReset from "./boardComponents/ExitAndReset";

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

    if (boardData.winner === "O" || boardData.winner === "X")
        content = (
            <div className={`${styles.info} ${styles.winner}`}>
                <p className={`${styles.whichPlayerTurn} ${styles.winner}`}>🎉 Congratulations {boardData.winner} 🎉</p>
            </div>
        )

    else if (boardData.winner === "Tie")
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
            <ExitAndReset />
        </main>
    );
}

export default ComputerBoard;
