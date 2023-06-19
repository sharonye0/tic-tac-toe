import styles from "./Square.module.css";

type Player = "X" | "Y" | "Tie" | null;

interface SquareObject {
    winner: Player;
    value: Player;
    onClick: () => void;
}

function Square({ value, onClick, winner } : SquareObject) {
    if (!value) {
        return <button className={styles.square} onClick={onClick} disabled={Boolean(winner)}></button>;
    }

  return (
    <button className={`${styles.square} ${styles[value]}`} disabled>{value}</button>
  );
}

export default Square;
