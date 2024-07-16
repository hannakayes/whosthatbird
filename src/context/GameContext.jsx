// src/context/GameContext.jsx
import React, { createContext, useContext, useState } from "react";
import useWeapons from "../hooks/useWeapons";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState(null);
  const { weapons, addWeapon, removeWeapon } = useWeapons();

  const startGame = () => {
    const newGame = {
      level: 1,
      playerSounds: {}, // Initialize as needed
      setPlayerSounds: () => {},
      setGameSounds: () => {},
      nextLevel: () => {},
      // Add any other game methods and properties you need
    };
    setGame(newGame);
  };

  return (
    <GameContext.Provider
      value={{ game, setGame, startGame, weapons, addWeapon, removeWeapon }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
