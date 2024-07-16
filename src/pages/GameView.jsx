// src/pages/GameView.jsx
import React, { useRef, useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext"; // Correct import
import useGameSounds from "../hooks/useGameSounds";
import usePlayerControls from "../hooks/usePlayerControls";
import GameControls from "../components/GameControls";
import Platform from "../components/Platform";
import EndPlatform from "../components/EndPlatform";
import MovingPlatform from "../components/MovingPlatform";
import PlayerComponent from "../components/PlayerComponent";
import PlayerWeaponComponent from "../components/PlayerWeaponComponent"; // Import for player weapons
import EnemyWeaponComponent from "../components/EnemyWeaponComponent"; // Import for enemy weapons

const GameView = () => {
  const { game, weapons } = useContext(GameContext);
  const { playerSounds, gameSounds } = useGameSounds();
  const gameViewRef = useRef(null);

  // Platforms definition
  const platforms = [
    <Platform key="platform1" width={200} top={400} left={50} />,
    <EndPlatform key="endPlatform" top={100} left={720} />,
    <MovingPlatform
      key="movingPlatform"
      width={200}
      top={200}
      left={300}
      vertical={true}
      ends={{ start: 150, end: 350 }}
    />,
  ];

  useEffect(() => {
    if (game) {
      game.setPlayerSounds(playerSounds);
      game.setGameSounds(gameSounds);
    }
  }, [game, playerSounds, gameSounds]);

  usePlayerControls(game);

  return (
    <div
      id="gameView"
      ref={gameViewRef}
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      <GameControls />
      {platforms}
      {game && (
        <PlayerComponent gameViewRef={gameViewRef} platforms={platforms} />
      )}
      {weapons.map((weapon) =>
        weapon.isEnemy ? (
          <EnemyWeaponComponent key={weapon.id} enemyWeapon={weapon} />
        ) : (
          <PlayerWeaponComponent key={weapon.id} playerWeapon={weapon} />
        )
      )}
    </div>
  );
};

export default GameView;
