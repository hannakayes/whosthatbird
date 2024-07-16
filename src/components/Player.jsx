import { PlayerWeapon } from "./Weapon"; // Import PlayerWeapon
import styles from "../styles/Player.module.css";

const GLOBAL_VOLUME = 1; // Set your global volume

class Player {
  constructor(gameView, platforms, sounds) {
    this.width = 28;
    this.height = 64;
    this.gameView = gameView;
    this.platforms = platforms;
    this.sounds = sounds;

    this.state = {
      top: 380,
      left: 50,
      died: false,
      lives: 5,
      jumping: false,
      velocity: 0,
      falling: false,
      standing: false,
      positionX: 0,
      element: null, // Store the player element
    };

    this.weapon = new PlayerWeapon(
      "images/player-wpn.png",
      null,
      gameView,
      sounds[1]
    );
    this.createPlayerElement();
  }

  createPlayerElement() {
    const element = document.createElement("div");
    const image = document.createElement("img");

    image.src = "images/player-char.png";
    image.classList.add(styles.playerCharImg);

    element.style.width = `${this.width}px`;
    element.style.height = `${this.height}px`;
    element.style.position = "absolute";
    element.style.top = `${this.state.top}px`;
    element.style.left = `${this.state.left}px`;
    element.classList.add(styles.playerChar);

    element.appendChild(image);
    this.gameView.appendChild(element);
    this.state.element = element;

    this.image = image; // Store image for reference
  }

  move() {
    // Implement movement logic
  }

  jump() {
    // Implement jump logic
  }

  isStandingOnPlatform() {
    // Implement collision detection
    return null; // Replace with actual logic
  }

  respawn() {
    // Implement respawn logic
  }

  renderPlayer() {
    this.move();
    this.weapon.render();

    const { element, top, left, positionX } = this.state;
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;

    if (positionX === 1) {
      this.image.classList.remove(styles.flipImage);
    } else if (positionX === -1) {
      this.image.classList.add(styles.flipImage);
    }
  }

  attack() {
    this.weapon.attack(); // Implement attack logic in the weapon
  }
}

export default Player;
