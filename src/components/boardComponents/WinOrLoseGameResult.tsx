import { useContext } from "react";
import styles from "./WinOrLoseGameResult.module.css"
import GameContext from "../../gameData/game-context";

const WinOrLoseGameResult = ({ winner, currentPlayer }: { winner?: TheWinner, currentPlayer?: string }) => {
    const gameData = useContext(GameContext)

    let content;

    if (gameData.gameInterface.vsComputer) {
        if (winner === "X") { // human lose
            content = (
                <div className={`${styles.info} ${styles.loser}`}>
                    <p
                        className={`${styles.whichPlayerTurn} ${styles.loser}`}
                    > You Lose(r) </p>
                </div>
            )
        }
        else if (winner === "O") { // human win
            content = (
                <div className={`${styles.info} ${styles.winner}`}>
                    <p
                        className={`${styles.whichPlayerTurn} ${styles.winner}`}
                    >🎉 Congratulations You Win 🎉</p>
                </div>
            )
        }

        else if (winner === "Tie") {
            content = (
                <div className={`${styles.info} ${styles.tie}`}>
                    <p
                        className={styles.whichPlayerTurn}
                    >👎🏼 Damn, it's a Tie 👎🏼</p>
                </div>
            )
        }
    }
    else {
        content = (
            <div className={styles.info}>
                <p
                    className={styles.whichPlayerTurn}
                >{currentPlayer}, it's your turn</p>
            </div>
        )

        if (winner === "O" || winner === "X")
            content = (
                <div className={`${styles.info} ${styles.winner}`}>
                    <p
                        className={`${styles.whichPlayerTurn} ${styles.winner}`}
                    >🎉 Congratulations {winner} 🎉</p>
                </div>
            )

        else if (winner === "Tie")
            content = (
                <div className={`${styles.info} ${styles.tie}`}>
                    <p className={styles.whichPlayerTurn}>👎🏼 Damn, it's a Tie 👎🏼</p>
                </div>
            )
    }

    return (
        <>
            {content}
        </>
    )
}

export default WinOrLoseGameResult;
