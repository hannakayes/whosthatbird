// src/components/EndPlatform.jsx
import React, { useEffect, useRef } from "react";
import styles from "../styles/Platform.module.css";

const EndPlatform = ({ top = 100, left = 720, playerRef }) => {
  const endPlatformRef = useRef(null);

  useEffect(() => {
    const platformElement = endPlatformRef.current;
    platformElement.style.width = `150px`;
    platformElement.style.top = `${top}px`;
    platformElement.style.left = `${left}px`;
  }, [top, left]);

  const passedLevel = () => {
    const playerRect = playerRef.current.getBoundingClientRect();
    const templeRect = endPlatformRef.current.getBoundingClientRect();

    return (
      playerRect.left < templeRect.right &&
      playerRect.right > templeRect.left &&
      playerRect.top < templeRect.bottom &&
      playerRect.bottom > templeRect.top &&
      playerRect.left < templeRect.left &&
      playerRect.bottom <= templeRect.bottom
    );
  };

  return (
    <div ref={endPlatformRef} className={styles.platform}>
      <img
        src="images/temple-gate.png"
        className={styles.temple}
        alt="temple"
      />
    </div>
  );
};

export default EndPlatform;
