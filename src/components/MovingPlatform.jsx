import React from "react";
import { Platform } from "./Platform";
import styles from "../styles/MovingPlatform.module.css";

export class MovingPlatform extends Platform {
  constructor(gameView, width, top, left, vertical, ends) {
    super(gameView, width, top, left);
    this.speed = 1;
    this.vertical = vertical;
    this.ends = ends;
    this.positionX = 0;
    this.positionY = 0;
    this.initializeElement();
  }

  initializeElement() {
    this.element.classList.add(styles.movingPlatform);
  }

  move() {
    if (this.vertical) {
      if (this.top < this.ends.end) {
        this.positionY = 1;
      }
      if (this.top > this.ends.start) {
        this.positionY = -1;
      }
    } else {
      if (this.left < this.ends.start) {
        this.positionX = 1;
      }
      if (this.left > this.ends.end) {
        this.positionX = -1;
      }
    }

    this.left += this.positionX * this.speed;
    this.top += this.positionY * this.speed;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}

export default MovingPlatform;
