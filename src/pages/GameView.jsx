import React, { useRef, useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import useGameSounds from "../hooks/useGameSounds";
import usePlayerControls from "../hooks/usePlayerControls";
import GameControls from "../components/GameControls";
import Platform from "../components/Platform";
import EndPlatform from "../components/EndPlatform";
import MovingPlatform from "../components/MovingPlatform";
import PlayerComponent from "../components/PlayerComponent";
import PlayerWeaponComponent from "../components/PlayerWeaponComponent";
import EnemyWeaponComponent from "../components/EnemyWeaponComponent";

const GameView = () => {
  const { state } = useContext(GameContext);
  const { game, weapons } = state;
  const { playerSounds } = useGameSounds();
  const gameViewRef = useRef(null);

  const platformRefs = [useRef(), useRef(), useRef()];
  const playerRef = useRef();

  const platforms = [
    <Platform
      key="platform1"
      ref={platformRefs[0]}
      width={200}
      top={400}
      left={50}
    />,
    <EndPlatform
      key="endPlatform"
      ref={platformRefs[1]}
      top={100}
      left={720}
      playerRef={playerRef} // Ensure playerRef is passed to EndPlatform
    />,
    <MovingPlatform
      key="movingPlatform"
      ref={platformRefs[2]}
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
      game.setGameSounds(playerSounds);
    }
  }, [game, playerSounds]);

  usePlayerControls(game);

  return (
    <div
      id="gameView"
      ref={gameViewRef}
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      <GameControls />
      {platforms}
      <PlayerComponent
        ref={playerRef}
        gameViewRef={gameViewRef}
        platforms={platformRefs}
        sounds={playerSounds}
      />
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
