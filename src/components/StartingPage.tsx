import { useContext } from "react";
import GameContext from "../gameData/game-context";
import styles from "./StartingPage.module.css"
function StartingPage() {

  const gameData = useContext(GameContext);

  return (
    <main className={styles.container}>
      <p>Welcome to the most boring game ever.</p>
      <div className={styles.startingGame}>
        <h2>Start Game</h2>
        <div className={styles.btns}>
          <button onClick={gameData.playWithAIHandler}> vs AI </button>
          <button onClick={gameData.playWithAFriendHandler}> vs a Friend </button>
        </div>
      </div>

    </main>
  )
}

export default StartingPage;