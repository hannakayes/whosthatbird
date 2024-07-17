// src/components/GameControls.jsx
import React, { useContext } from "react";
import { GameContext } from "../context/GameContext"; // Ensure the extension is .jsx

const GameControls = () => {
  const { game, startGame } = useContext(GameContext);

  const handleContinue = () => {
    if (game) {
      game.nextLevel(game.level);
    }
  };

  const handleThrowWeapon = () => {
    // Logic to throw weapon
  };

  return (
    <div>
      <button id="start-btn" onClick={startGame}>
        Start Game
      </button>
      <button id="restart-btn" onClick={startGame}>
        Restart Game
      </button>
      <button id="continue-btn" onClick={handleContinue}>
        Continue
      </button>
      <button id="throw-weapon-btn" onClick={handleThrowWeapon}>
        Throw Weapon
      </button>
    </div>
  );
};

export default GameControls;
