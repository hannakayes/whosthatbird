// src/components/PlayerComponent.jsx
import React, { useContext } from "react";
import { GameContext } from "../context/GameContext.jsx"; // Ensure the extension is .jsx
import usePlayer from "../hooks/usePlayer";

const PlayerComponent = ({ gameViewRef, platforms }) => {
  const { game } = useContext(GameContext);
  const { playerSounds } = game;
  const { position, playerRef, jump, setPositionX, renderPlayer } = usePlayer(
    gameViewRef,
    platforms,
    playerSounds
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (game) {
        switch (event.code) {
          case "KeyA":
            setPositionX(-1);
            break;
          case "KeyD":
            setPositionX(1);
            break;
          case "KeyW":
            jump();
            break;
          default:
            break;
        }
      }
    };

    const handleKeyUp = (event) => {
      if (game && (event.code === "KeyA" || event.code === "KeyD")) {
        setPositionX(0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [game]);

  useEffect(() => {
    renderPlayer();
  }, [position]);

  return (
    <div
      ref={playerRef}
      className="player-char"
      style={{
        width: "28px",
        height: "64px",
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <img
        src="assets/images/player-char.png"
        alt="Player"
        className="player-char-img"
      />
    </div>
  );
};

export default PlayerComponent;
