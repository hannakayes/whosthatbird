// src/hooks/usePlayer.js
import { useState, useEffect, useContext, useRef } from "react";
import { GameContext } from "../context/GameContext.jsx"; // Ensure the extension is .jsx

const usePlayer = (gameViewRef, platforms, sounds) => {
  const [position, setPosition] = useState({ top: 380, left: 50 });
  const [velocity, setVelocity] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [falling, setFalling] = useState(false);
  const [standing, setStanding] = useState(false);
  const [died, setDied] = useState(false);
  const [lives, setLives] = useState(5);
  const [positionX, setPositionX] = useState(0);
  const playerRef = useRef(null);

  const GRAVITY = 0.5;
  const TERMINAL_VELOCITY = 10;
  const jumpSpeed = 9;
  const speed = 4;
  const startTop = 380;
  const startLeft = 50;

  const move = () => {
    if (!died) {
      if (jumping) {
        const newTop = position.top + velocity;
        const newVelocity = velocity + GRAVITY;

        if (newVelocity >= 0) {
          setJumping(false);
        }

        setPosition({ ...position, top: newTop });
        setVelocity(newVelocity);
      } else {
        const platform = isStandingOnPlatform();
        if (!platform) {
          setStanding(false);
          const newVelocity = Math.min(velocity + GRAVITY, TERMINAL_VELOCITY);
          const newTop = position.top + newVelocity;

          setVelocity(newVelocity);
          setPosition({ ...position, top: newTop });

          if (newVelocity > jumpSpeed) {
            setFalling(true);
          }
        } else {
          setStanding(true);
          setFalling(false);
          setVelocity(0);
          setPosition({
            ...position,
            top: parseFloat(platform.element.style.top) - 64 - 1,
          });
        }
      }

      if (!falling) {
        setPosition({ ...position, left: position.left + positionX * speed });
      }

      if (position.left < 3) {
        setPosition({ ...position, left: 3 });
      }

      if (position.left > gameViewRef.current.clientWidth - 28) {
        setPosition({
          ...position,
          left: gameViewRef.current.clientWidth - 28,
        });
      }

      if (position.top > gameViewRef.current.clientHeight + 20) {
        setDied(true);
        respawn();
      }
    }
  };

  const jump = () => {
    if (!jumping && !falling && standing) {
      sounds.jumpSound.play();
      setTimeout(() => {
        sounds.jumpSound.pause();
        sounds.jumpSound.currentTime = 0;
      }, 500);

      setJumping(true);
      setStanding(false);
      setVelocity(-jumpSpeed);
    }
  };

  const isStandingOnPlatform = () => {
    const playerRect = playerRef.current.getBoundingClientRect();
    for (let platform of platforms) {
      const platformRect = platform.element.getBoundingClientRect();
      if (
        playerRect.bottom <= platformRect.top + 5 &&
        playerRect.bottom >= platformRect.top - 5 &&
        playerRect.right >= platformRect.left &&
        playerRect.left <= platformRect.right
      ) {
        return platform;
      }
    }
    return null;
  };

  const respawn = () => {
    if (lives > 0) {
      const livesElements = document.querySelectorAll(".life");
      livesElements[lives - 1].remove();

      setLives(lives - 1);

      if (lives > 1) {
        sounds.respawnSound.play();
        setTimeout(() => {
          sounds.respawnSound.pause();
          sounds.respawnSound.currentTime = 0;
        }, 1500);
      }

      setPosition({ top: startTop, left: startLeft });
      setDied(false);
      setTimeout(() => {
        setDied(false);
      }, 300 * 6);
    }
  };

  useEffect(() => {
    move();
  }, [position]);

  return {
    position,
    playerRef,
    jump,
    setPositionX,
    renderPlayer: move,
  };
};

export default usePlayer;
