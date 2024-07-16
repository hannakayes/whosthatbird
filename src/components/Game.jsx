import React, { useEffect, useState, useRef } from "react";
import Player from "../components/Player";
import Platform from "../components/Platform";
import EndPlatform from "../components/EndPlatform";
import BasicEnemy from "../components/BasicEnemy";
import ThrowingEnemy from "../components/ThrowingEnemy";
import MovingPlatform from "../components/MovingPlatform";
import { PlayerWeapon } from "../components/Weapon";
import Enemy from "./Enemy";
import styles from "../styles/Game.module.css";

const GRAVITY = 0.6;
const TERMINAL_VELOCITY = 10;
const GLOBAL_VOLUME = 0.3;

const Game = ({ playerSounds, gameSounds }) => {
  const [player, setPlayer] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const gameViewRef = useRef(null);

  useEffect(() => {
    gameSounds.forEach((sound, index) => {
      sound.volume = [0.4, 0.4, 0.2, 0.3, 0.2][index] * GLOBAL_VOLUME;
      if (index === 4) sound.loop = true;
    });

    startGame();

    return () => {
      restart();
    };
  }, []);

  const startGame = () => {
    setGameOver(false);
    initializeLevel();

    const intervalId = setInterval(() => {
      if (!gameOver) {
        updateGame();
      }
    }, 1000 / 60);

    return () => clearInterval(intervalId);
  };

  const initializeLevel = () => {
    const newPlatforms = [
      new Platform(gameViewRef.current, 150, 470, "platform1"),
      new Platform(gameViewRef.current, 50, 410, "platform2"),
      new EndPlatform(gameViewRef.current, "endPlatform"),
      new MovingPlatform(
        gameViewRef.current,
        100,
        300,
        200,
        true,
        {
          start: 250,
          end: 350,
        },
        "movingPlatform"
      ),
    ];

    const newEnemies = [
      new BasicEnemy(
        gameViewRef.current,
        "/src/assets/images/basic-enemy-ninja-1.png",
        newPlatforms[0],
        "basicEnemy"
      ),
      new ThrowingEnemy(
        gameViewRef.current,
        "/src/assets/images/throwing-enemy-ninja.png",
        newPlatforms[1],
        "throwingEnemy"
      ),
      new Enemy(
        gameViewRef.current,
        "/src/assets/images/enemy-boss.png",
        newPlatforms[0],
        "enemy"
      ),
    ];

    setPlatforms(newPlatforms);
    setEnemies(newEnemies);

    const weaponSound = new Audio("/src/assets/audio/weapon-sound.mp3");
    const newPlayer = {
      instance: new Player(gameViewRef.current, newPlatforms, playerSounds),
      lives: 5,
      weapon: new PlayerWeapon(
        "images/weapon.png",
        null,
        gameViewRef.current,
        weaponSound
      ),
    };

    newPlayer.weapon.owner = newPlayer.instance;
    setPlayer(newPlayer);
    displayPlayerLives(newPlayer.lives);
  };

  const updateGame = () => {
    if (player) {
      player.instance.renderPlayer();
      player.weapon.render();

      enemies.forEach((enemy) => {
        enemy.render();
        if (enemy.didCollide(player.instance.element)) {
          player.instance.died = true;
          player.instance.respawn();
        }
        if (enemy.gotHit(player.weapon)) {
          enemy.died = true;
        }
      });
      checkGameOver();
    }
  };

  const checkGameOver = () => {
    if (player && player.instance.lives === 0) {
      setGameOver(true);
      gameSounds[4].pause();
      showDeathView();
    }
  };

  const displayPlayerLives = (lives) => {
    // Implement display logic
  };

  const showDeathView = () => {
    // Implement death view logic
  };

  const restart = () => {
    platforms.forEach((platform) => platform.element.remove());
    enemies.forEach((enemy) => enemy.element.remove());
    setPlatforms([]);
    setEnemies([]);

    if (player) {
      player.instance.element.remove();
      player.weapon.element.remove();
    }
    setPlayer(null);
  };

  return (
    <div ref={gameViewRef} id="game-view" className={styles.gameView}>
      {player && (
        <>
          <div ref={(el) => (player.instance.element = el)} />
          <div ref={(el) => (player.weapon.element = el)} />
        </>
      )}
      {platforms.map((platform) => (
        <div key={platform.id} ref={(el) => (platform.element = el)} />
      ))}
      {enemies.map((enemy) => (
        <div key={enemy.id} ref={(el) => (enemy.element = el)} />
      ))}
    </div>
  );
};

export default Game;
