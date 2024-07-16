import styles from "../styles/Enemy.module.css";

class Enemy {
  constructor(gameView, imageSrc, platform) {
    this.gameView = gameView;
    this.imageSrc = imageSrc;
    this.platform = platform;

    this.width = 28;
    this.height = 64;
    this.top = 0;
    this.left = 0;
    this.velocity = 0;
    this.positionX = 1;

    this.createEnemyElement();
  }

  createEnemyElement() {
    this.element = document.createElement("div");
    this.image = document.createElement("img");

    this.image.src = this.imageSrc;
    this.image.classList.add(styles.enemyImg);

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.classList.add(styles.enemy);

    this.element.appendChild(this.image);
    this.gameView.appendChild(this.element);
  }

  move() {
    // Implement movement logic
  }

  isStandingOnPlatform() {
    // Implement collision detection
    return null; // Replace with actual logic
  }

  render() {
    this.move();

    const { element, top, left, positionX } = this;
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;

    if (positionX === 1) {
      this.image.classList.remove(styles.flipImage);
    } else if (positionX === -1) {
      this.image.classList.add(styles.flipImage);
    }
  }
}

export default Enemy;
