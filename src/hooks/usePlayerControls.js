// src/hooks/usePlayerControls.js
import { useEffect } from "react";

const usePlayerControls = (game) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (game) {
        switch (event.code) {
          case "KeyA":
            game.player.positionX = -1;
            break;
          case "KeyD":
            game.player.positionX = 1;
            break;
          case "KeyW":
            game.player.jump();
            break;
          case "KeyP":
            if (game.endLevel) {
              game.player.weapon.throwUp();
            } else {
              game.player.weapon.throw("right");
            }
            break;
          case "KeyO":
            if (game.endLevel) {
              game.player.weapon.throwUp();
            } else {
              game.player.weapon.throw("left");
            }
            break;
          default:
            break;
        }
      }
    };

    const handleKeyUp = (event) => {
      if (game && (event.code === "KeyA" || event.code === "KeyD")) {
        game.player.positionX = 0;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [game]);
};

export default usePlayerControls;
