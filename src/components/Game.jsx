// src/components/Game.jsx
import React, { useState } from "react";
import Player from "./Player";
import Platform from "./Platform";
import Enemy from "./Enemy";
import styles from "../styles/Game.module.css";

const Game = () => {
  const [level, setLevel] = useState(1);
  const [playerLives, setPlayerLives] = useState(3);

  const startGame = () => {
    setLevel(1);
    setPlayerLives(3);
  };

  return (
    <div className={styles.gameView}>
      <Player />
      <Platform />
      <Enemy
        gameView={document.getElementById("gameView")}
        imageSrc="enemy.png"
        platform={{ top: 200, left: 100, width: 300 }}
      />
    </div>
  );
};

export default Game;
