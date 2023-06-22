import { useContext } from "react";
import ComputerBoard from "./components/ComputerBoard";
import FriendBoard from "./components/FriendBoard";
import StartingPage from "./components/StartingPage";
import GameContext from "./gameData/game-context";
import BoardDataProvider from "./gameData/BoardDataProvider";

function App() {
  const gameData = useContext(GameContext);
  return (
    <>
      {gameData.gameInterface.landingPage && <StartingPage />}
      <BoardDataProvider>
        {gameData.gameInterface.vsComputer && <ComputerBoard />}
        {gameData.gameInterface.vsFriend && <FriendBoard />}
      </BoardDataProvider>
    </>
  );
}

export default App;
