import styles from "./Square.module.css";


interface SquareObject {
  winner: TheWinner;
  value: Square;
  onClick?: () => void;
}

function Square({ winner, value, onClick }: SquareObject) {
  if (!value) {
    return <button
      className={styles.square}
      onClick={onClick}
      disabled={Boolean(winner)}
    ></button>;
  }

  return (
    <button
      className={`${styles.square} ${styles[value]}`}
      disabled
    >
      {value}
    </button>
  );
}

export default Square;
