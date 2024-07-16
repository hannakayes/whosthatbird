// src/components/Enemy.jsx
import React, { useEffect, useState } from "react";
import styles from "../styles/Enemy.module.css";

const Enemy = ({ gameView, imageSrc, platform }) => {
  const [left, setLeft] = useState(platform ? platform.left + 64 : 0);
  const [top, setTop] = useState(platform ? platform.top - 64 : 0);
  const [positionX, setPositionX] = useState(0);
  const [speed, setSpeed] = useState(2);

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

  return (
    <img
      src={imageSrc}
      className={`${styles.enemy} ${positionX === 1 ? "" : styles.flipImage}`}
      style={{ left: `${left}px`, top: `${top}px` }}
    />
  );
};

export default Enemy;
