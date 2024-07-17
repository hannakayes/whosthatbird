import React, { useEffect, forwardRef } from "react";
import usePlayer from "../hooks/usePlayer";

const PlayerComponent = forwardRef(
  ({ gameViewRef, platforms, sounds }, ref) => {
    const { position, jump, setPositionX } = usePlayer(
      gameViewRef,
      platforms,
      sounds
    );

    useEffect(() => {
      const handleKeyDown = (event) => {
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
      };

      const handleKeyUp = (event) => {
        if (event.code === "KeyA" || event.code === "KeyD") {
          setPositionX(0);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, [jump, setPositionX]);

    return (
      <div
        ref={ref}
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
  }
);

export default PlayerComponent;
