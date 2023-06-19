import styles from "./StartingPage.module.css"

function StartingPage({onPlayWithAI, onPlayWithFriend}: {onPlayWithAI(): void, onPlayWithFriend(): void}) {

  return (
    <main className={styles.container}>
        <p>Welcome to the most boring game ever.</p>
        <div className={styles.startingGame}>
            <h2>Start Game</h2>
            <div className={styles.btns}>
                <button onClick={onPlayWithAI}> vs AI </button>
                <button onClick={onPlayWithFriend}> vs a Friend </button>
            </div>
        </div>
        
    </main>
  )
}

export default StartingPage;