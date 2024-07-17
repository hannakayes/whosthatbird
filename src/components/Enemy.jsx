import React, { useEffect, useState } from "react";
import styles from "../styles/Enemy.module.css";
import loadImages from "../utils/importImages"; // Adjust the path if necessary

const Enemy = ({ gameView, enemyType, platform }) => {
  const [images, setImages] = useState({});
  const [left, setLeft] = useState(platform ? platform.left + 64 : 0);
  const [top, setTop] = useState(platform ? platform.top - 64 : 0);
  const [positionX, setPositionX] = useState(1);
  const [speed, setSpeed] = useState(2);
  const [died, setDied] = useState(false);
  const [lives, setLives] = useState(3); // Example for boss or mini-boss

  useEffect(() => {
    const fetchImages = async () => {
      const loadedImages = await loadImages();
      setImages(loadedImages);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const move = () => {
      setLeft((prevLeft) => {
        let newLeft = prevLeft + positionX * speed;
        if (newLeft < platform.left) {
          setPositionX(1);
          newLeft = platform.left;
        } else if (newLeft + 64 > platform.left + platform.width) {
          setPositionX(-1);
          newLeft = platform.left + platform.width - 64;
        }
        return newLeft;
      });
    };

    const interval = setInterval(move, 100);
    return () => clearInterval(interval);
  }, [positionX, speed, platform]);

  const renderLives = () => {
    // Logic to render lives for bosses or mini-bosses
    if (lives > 0) {
      return <div className={styles.livesContainer}>Lives: {lives}</div>;
    }
    return null;
  };

  const didCollide = (player) => {
    // Collision logic goes here
  };

  const gotHit = (playerWeapon) => {
    // Hit logic for enemy
  };

  return (
    <>
      <img
        src={images[enemyType] || enemyType}
        className={`${styles.enemy} ${positionX === 1 ? "" : styles.flipImage}`}
        style={{ left: `${left}px`, top: `${top}px` }}
        alt="Enemy"
      />
      {renderLives()}
    </>
  );
};

export default Enemy;
