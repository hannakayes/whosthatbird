// src/components/MovingPlatform.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Platform.module.css";

const MovingPlatform = ({ width, top, left, vertical, ends }) => {
  const platformRef = useRef(null);
  const [position, setPosition] = useState({ left, top });
  const speed = 1;

  useEffect(() => {
    const move = () => {
      setPosition((prev) => {
        let newLeft = prev.left;
        let newTop = prev.top;

        if (vertical) {
          if (newTop < ends.end) {
            newTop += speed;
          }
          if (newTop > ends.start) {
            newTop -= speed;
          }
        } else {
          if (newLeft < ends.start) {
            newLeft += speed;
          }
          if (newLeft > ends.end) {
            newLeft -= speed;
          }
        }

        return { left: newLeft, top: newTop };
      });
    };

    const interval = setInterval(move, 100);
    return () => clearInterval(interval);
  }, [vertical, ends]);

  useEffect(() => {
    const platformElement = platformRef.current;
    platformElement.style.width = `${width}px`;
    platformElement.style.left = `${position.left}px`;
    platformElement.style.top = `${position.top}px`;
  }, [width, position]);

  return <div ref={platformRef} className={styles.platform}></div>;
};

export default MovingPlatform;
