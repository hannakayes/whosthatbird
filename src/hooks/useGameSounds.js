// src/hooks/useGameSounds.js
import { useEffect } from "react";

const useGameSounds = () => {
  const playerSounds = {
    jumpSound: new Audio("audio/jump-effect.mp3"),
    weaponSound: new Audio("audio/weapon-sound.mp3"),
    respawnSound: new Audio("audio/respawn-sound.mp3"),
  };

  const gameSounds = {
    victorySound: new Audio("audio/victory-sound.mp3"),
    passedLevelSound: new Audio("audio/passed-level.mp3"),
    deathSound: new Audio("audio/death-sound.mp3"),
    bossLevelSound: new Audio("audio/boss-level.mp3"),
    levelsSound: new Audio("audio/levels-bg-sound.mp3"),
  };

  useEffect(() => {
    // Preload player sounds
    Object.values(playerSounds).forEach((sound) => {
      sound.preload = "auto";
      sound.currentTime = 0;
    });

    // Setup game sounds
    Object.values(gameSounds).forEach((sound) => {
      sound.preload = "none";
      sound.currentTime = 0;
    });
  }, []);

  return { playerSounds, gameSounds };
};

export default useGameSounds;
