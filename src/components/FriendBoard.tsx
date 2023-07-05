import { useEffect, useContext } from "react";
import Square from "./boardComponents/Square";
import styles from "./FriendBoard.module.css";
import BoardContext from "../gameData/board-context";
import ExitAndReset from "./boardComponents/ExitAndReset";
import WinOrLoseGameResult from "./boardComponents/WinOrLoseGameResult";

const FriendBoard = () => {
    const boardData = useContext(BoardContext);

    useEffect(() => {
        const theWinner = boardData.checkWinner(boardData.squares);
        boardData.settingTheWinner(theWinner);
    }, [boardData, boardData.squares])


    return (
        <main className={styles.container}>
            <WinOrLoseGameResult winner={boardData.winner} currentPlayer={boardData.currentPlayer} />
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

export default FriendBoard;
