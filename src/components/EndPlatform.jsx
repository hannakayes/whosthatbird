// src/components/EndPlatform.jsx
import React from "react";
import { Platform } from "./Platform";

export class EndPlatform extends Platform {
  constructor(gameView) {
    super(gameView, 150, 100, 720);
    this.temple = document.createElement("img");
    this.temple.src = "/src/assets/images/temple-gate.png";
    this.temple.classList.add("temple");
    this.element.appendChild(this.temple);
  }

  passedLevel(playerElement) {
    const playerRect = playerElement.getBoundingClientRect();
    const templeRect = this.temple.getBoundingClientRect();

    return (
      playerRect.left < templeRect.right &&
      playerRect.right > templeRect.left &&
      playerRect.top < templeRect.bottom &&
      playerRect.bottom > templeRect.top &&
      playerRect.left < templeRect.left &&
      playerRect.bottom <= templeRect.bottom
    );
  }
}

export default EndPlatform; // Ensure there is a default export
