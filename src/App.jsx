import React, { useEffect, useState } from "react";
import Game from "./components/Game";

const App = () => {
  const [game, setGame] = useState(null);
  const [playerSounds, setPlayerSounds] = useState([]);
  const [gameSounds, setGameSounds] = useState([]);

  useEffect(() => {
    // Load sounds
    const jumpSound = new Audio("audio/jump-effect.mp3");
    const weaponSound = new Audio("audio/weapon-sound.mp3");
    const respawnSound = new Audio("audio/respawn-sound.mp3");

    setPlayerSounds([jumpSound, weaponSound, respawnSound]);

    const victorySound = new Audio("audio/victory-sound.mp3");
    const passedLevelSound = new Audio("audio/passed-level.mp3");
    const deathSound = new Audio("audio/death-sound.mp3");
    const bossLevelSound = new Audio("audio/boss-level.mp3");
    const levelsSound = new Audio("audio/levels-bg-sound.mp3");

    setGameSounds([
      victorySound,
      passedLevelSound,
      deathSound,
      bossLevelSound,
      levelsSound,
    ]);
  }, []);

  const startGame = () => {
    setGame(<Game playerSounds={playerSounds} gameSounds={gameSounds} />);
  };

  const restartGame = () => {
    startGame(); // Restarting is the same as starting
  };

  return (
    <div>
      <button id="start-btn" onClick={startGame}>
        Start
      </button>
      <button id="restart-btn" onClick={restartGame}>
        Restart
      </button>
      <button id="continue-btn" onClick={() => game?.nextLevel(game.level)}>
        Continue
      </button>

      <div id="splash-view">Splash Screen</div>
      <div id="game-view" style={{ display: game ? "block" : "none" }}>
        {game}
      </div>
      <div id="end-view">End Screen</div>
      <div id="death-view">Death Screen</div>
      <div id="victory-view">Victory Screen</div>
      <div id="transition-view">Transition View</div>
      <div id="lives"></div>
    </div>
  );
};

export default App;
