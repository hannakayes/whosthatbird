import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/EndPlatform.module.css";
import loadImages from "../utils/importImages"; // Adjust the path if necessary

const EndPlatform = React.forwardRef(
  ({ top = 100, left = 720, playerRef }, ref) => {
    const [images, setImages] = useState({});

    useEffect(() => {
      const fetchImages = async () => {
        const loadedImages = await loadImages();
        setImages(loadedImages);
      };
      fetchImages();
    }, []);

    useEffect(() => {
      if (ref.current) {
        ref.current.style.width = `150px`;
        ref.current.style.top = `${top}px`;
        ref.current.style.left = `${left}px`;
      }
    }, [top, left, ref]);

    const passedLevel = () => {
      if (!playerRef.current || !ref.current) return false;

      const playerRect = playerRef.current.getBoundingClientRect();
      const templeRect = ref.current.getBoundingClientRect();

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
      <div ref={ref} className={styles.platform}>
        {images["temple-gate.png"] && (
          <img
            src={images["temple-gate.png"]}
            alt="Temple Gate"
            className={styles.temple}
          />
        )}
      </div>
    );
  }
);

export default EndPlatform;
