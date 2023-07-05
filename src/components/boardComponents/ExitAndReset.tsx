import { useContext } from "react";
import styles from "./ExitAndReset.module.css";
import BoardContext from "../../gameData/board-context";

function ExitAndReset({ onReset }: any) {
    const boardData = useContext(BoardContext);



    return (
        <div className={styles.btnContainer}>
            <button
                className={`${styles.boardBtn} ${styles.exit}`}
                onClick={() => boardData.returnToStartingPage()}
            > Exit </button>
            <button
                className={`${styles.boardBtn} ${styles.restart}`}
                onClick={() => {
                    boardData.reset()
                    if (onReset) onReset()
                }}
            > Restart </button>
        </div>
    )
}

export default ExitAndReset;