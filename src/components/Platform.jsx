import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Platform.module.css";
import loadImages from "../utils/importImages";

const Platform = React.forwardRef(({ width, top, left, imageSrc }, ref) => {
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
      ref.current.style.width = `${width}px`;
      ref.current.style.top = `${top}px`;
      ref.current.style.left = `${left}px`;
    }
  }, [width, top, left, ref]);

  return (
    <div ref={ref} className={styles.platform}>
      {imageSrc && images[imageSrc] && (
        <img
          src={images[imageSrc]}
          alt="Platform"
          className={styles.platformImage}
        />
      )}
    </div>
  );
});

export default Platform;
