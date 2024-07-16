// src/pages/SplashScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../styles/SplashScreen.module.css"; // Import CSS module

const SplashScreen = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleStartGame = () => {
    navigate("/game"); // Navigate to the GameView
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to the Untitled Ninja Game!</h1>
      <p>Press Start to begin your adventure.</p>
      <button className={styles.btn} onClick={handleStartGame}>
        Start
      </button>{" "}
      {/* Start button */}
    </div>
  );
};

export default SplashScreen;
