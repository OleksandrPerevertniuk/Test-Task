import { useState } from "react";
import "./App.css";

function App() {
  const [remainingMatches, setRemainingMatches] = useState(25);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handlePlayerMove = (matchesTaken) => {
    if (gameOver) return;
    if (remainingMatches - matchesTaken >= 0) {
      const updatedMatches = remainingMatches - matchesTaken;
      setRemainingMatches(updatedMatches);
      setPlayerMatches(playerMatches + matchesTaken);

      if (updatedMatches === 0) {
        setGameOver(true);
        findWinner(playerMatches + matchesTaken);
        return;
      }
      handleComputerMove(updatedMatches);
    } else {
      alert("Not enough matches left");
    }
  };

  const handleComputerMove = (updatedRemainingMatches) => {
    if (gameOver) return;
    let matchesTaken; //inverse matchesTaken 3 and 2 if mode 2
    if (updatedRemainingMatches % 4 === 0) {
      matchesTaken = 3;
    } else if (updatedRemainingMatches % 4 === 1 || 2) {
      matchesTaken = 1;
    } else if (updatedRemainingMatches % 4 === 3) {
      matchesTaken = 2;
    }

    const newRemainingMatches = updatedRemainingMatches - matchesTaken;
    setComputerMatches(computerMatches + matchesTaken);
    setRemainingMatches(newRemainingMatches);

    if (remainingMatches - matchesTaken === 0) {
      setGameOver(true);
      winner();
    } else {
      setPlayerTurn(true);
    }
  };

  const findWinner = (finalplayerMatches) => {
    if (finalplayerMatches % 2 === 0) {
      setWinner("Player");
      alert("You win!");
    } else {
      setWinner("Computer");
      alert("Computer wins!");
    }
  };

  return (
    <div className="App">
      <center>
        <h1>Match Draw</h1>
        <div>
          <h2 className="avatar"> {remainingMatches} 🧨</h2>
        </div>
        <div className="container">
          <div className="square">
            <span className="avatar">👨‍💻 {playerMatches} 🧨</span>
          </div>
          <div className="square">
            <span className="avatar">🤖 {computerMatches} 🧨</span>
          </div>
        </div>
      </center>
      <div className="panel">
        <button className="btn" onClick={() => handlePlayerMove(1)}>
          Take 1 match
        </button>
        <button className="btn" onClick={() => handlePlayerMove(2)}>
          Take 2 matches
        </button>
        <button className="btn" onClick={() => handlePlayerMove(3)}>
          Take 3 matches
        </button>
      </div>
    </div>
  );
}

export default App;
