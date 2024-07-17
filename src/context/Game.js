import React from "react";
import { useGame } from "./GameContext";
import styles from "./Game.module.css";

const Game = () => {
  const { state, dispatch } = useGame();
  const { game } = state;

  const startGame = () => {
    if (!game) {
      // Start the game logic
      dispatch({ type: "SET_GAME", payload: new Game() });
    }
  };

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.title}>Game Title</h1>
      <button className={styles.button} onClick={startGame} disabled={!!game}>
        Start Game
      </button>
      {game && <GameView game={game} />}
    </div>
  );
};

const GameView = ({ game }) => {
  // Render game components here
  return <div className={styles.gameView}> {/* Game rendering logic */} </div>;
};

export default Game;
