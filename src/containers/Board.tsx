import { useEffect, useState } from "react";
import Square from "../components/Square";
import styles from "./Board.module.css"

type Player = "X" | "Y" | "Tie" | null;

function calculateWinner(squares: Player[]): Player {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

const Board = ({ onExitGame }: { onExitGame(): void }) => {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
    const [winner, setWinner] = useState<Player>(null);

    function reset() {
        setSquares(Array(9).fill(null));
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
        setWinner(null);
    }

    function returnToStartingPage(): void {
        reset();
        onExitGame();
    }

    function setSquareValue(index: number): void {
        const newData = squares.map((val, i: number) => {
            if (i === index) {
                return currentPlayer;
            }
            return val;
        })
        setSquares(newData);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }

    useEffect(() => {
        const w = calculateWinner(squares);
        console.log(w);
        if (w) {
            setWinner(w);
        }

        if (!w && !squares.filter((square) => !square).length) {
            setWinner("Tie")
        }

    }, [squares])


    let content =
        <div className={styles.info}>
            <p className={styles.whichPlayerTurn}>{currentPlayer}, it's your turn</p>
        </div>

    if (winner)
        content =
            <div className={`${styles.info} ${styles.winner}`}>
                <p className={`${styles.whichPlayerTurn} ${styles.winner}`}>🎉 Congratulations {winner} 🎉</p>
            </div>

    if (winner === "Tie")
        content =
            <div className={`${styles.info} ${styles.tie}`}>
                <p className={styles.whichPlayerTurn}>👎🏼 Damn, it's a Tie 👎🏼</p>
            </div>

    return (
        <main className={styles.container}>
            {content}
            <div className={styles.grid}>
                {Array(9).fill(null).map(
                    (_, i) => <Square winner={winner} key={i} onClick={() => setSquareValue(i)} value={squares[i]} />
                )}
            </div>
            <div className={styles.btnContainer}>
                <button className={`${styles.boardBtn} ${styles.exit}`} onClick={returnToStartingPage}> Exit </button>
                <button className={`${styles.boardBtn} ${styles.restart}`} onClick={reset}> Restart </button>
            </div>
        </main>
    );
}

export default Board;
