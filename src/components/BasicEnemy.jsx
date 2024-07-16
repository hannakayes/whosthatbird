import Enemy from "./Enemy";

class BasicEnemy extends Enemy {
  constructor(gameView, imageSrc, platform) {
    super(gameView, imageSrc, platform);
    // Specific properties for BasicEnemy
  }

  render() {
    super.render();
    // Additional rendering logic for BasicEnemy
  }
}

export default BasicEnemy;
