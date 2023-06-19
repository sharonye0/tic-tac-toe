import { useState } from 'react';
import Board from './containers/Board';
import StartingPage from './containers/StartingPage';

type theGameInterface = {
  landingPage: boolean,
  vsComputer: boolean,
  vsFriend: boolean
}

function App() {

  const [gameInterface, setGameInterface] = useState<theGameInterface>({ landingPage: true, vsComputer:false, vsFriend: false });  

  const playWithAIHandler = (): void => {
      setGameInterface({ landingPage: false, vsComputer:true, vsFriend: false });
  }
  
  const playWithAFriendHandler = (): void => {
      setGameInterface({ landingPage: false, vsComputer:false, vsFriend: true });
  }

  const exitGameHandler = (): void => {
    setGameInterface({ landingPage: true, vsComputer:false, vsFriend: false });
  }

  return (
    <>
      {gameInterface.landingPage && <StartingPage onPlayWithFriend={playWithAFriendHandler} onPlayWithAI={playWithAIHandler}/>}
      {(gameInterface.vsComputer || gameInterface.vsFriend) && <Board onExitGame={exitGameHandler}/>}
    </>
  ); 
}

export default App;
