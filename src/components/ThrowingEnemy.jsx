// ThrowingEnemy.jsx
import Enemy from "./Enemy";

class ThrowingEnemy extends Enemy {
  constructor(gameView, imageSrc, platform) {
    super(gameView, imageSrc, platform);
    this.weapon = this.createWeapon();
  }

  createWeapon() {
    // Logic to create weapon
  }

  throw(player) {
    // Implement throwing logic
  }

  render() {
    super.render();
    // Additional rendering logic for ThrowingEnemy
  }
}

export default ThrowingEnemy;
