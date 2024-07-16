// src/components/Platform.jsx
import React, { useEffect, useRef } from "react";
import styles from "../styles/Platform.module.css";

const Platform = ({ width, top, left }) => {
  const platformRef = useRef(null);

  useEffect(() => {
    const platformElement = platformRef.current;
    platformElement.style.width = `${width}px`;
    platformElement.style.top = `${top}px`;
    platformElement.style.left = `${left}px`;
  }, [width, top, left]);

  return <div ref={platformRef} className={styles.platform}></div>;
};

export default Platform;
