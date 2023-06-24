import { useContext } from "react";
import styles from "./ExitAndReset.module.css";
import BoardContext from "../../gameData/board-context";

function ExitAndReset() {
    const boardData = useContext(BoardContext);

    return (
        <div className={styles.btnContainer}>
            <button
                className={`${styles.boardBtn} ${styles.exit}`}
                onClick={() => boardData.returnToStartingPage()}
            > Exit </button>
            <button
                className={`${styles.boardBtn} ${styles.restart}`}
                onClick={boardData.reset}
            > Restart </button>
        </div>
    )
}

export default ExitAndReset;