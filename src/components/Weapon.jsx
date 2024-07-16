// Weapon.jsx
import React from "react";

class Weapon {
  constructor(imageSrc, owner = null, gameView) {
    this.owner = owner;
    this.top = owner ? owner.top + 25 : 0;
    this.left = owner ? owner.left : 0;
    this.thrown = false;
    this.speed = 6;
    this.positionX = 0;
    this.positionY = 0;
    this.gameView = gameView;
    this.width = 32;
    this.height = 32;

    this.element = document.createElement("div");
    this.image = document.createElement("img");
    this.image.src = imageSrc;
    this.image.classList.add("weapon-img");

    this.element.classList.add("weapon-element");
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;

    this.element.appendChild(this.image);
    this.gameView.appendChild(this.element);
  }
}

export class PlayerWeapon extends Weapon {
  constructor(imageSrc, owner, gameView, sound) {
    super(imageSrc, owner, gameView);
    this.element.style.display = "none";
    this.thrownUpwards = false;
    this.sound = sound;
  }

  throw(direction) {
    if (!this.owner.died) {
      if (!this.thrown) {
        this.thrown = true;
        this.sound.play();

        this.positionY = this.owner.top + 25;
        this.left = this.owner.left;

        this.element.style.display = "block";

        this.positionX = direction === "left" ? -1 : 1;
      }
    }
  }

  throwUp() {
    if (!this.owner.died && !this.thrown) {
      this.thrown = true;
      this.thrownUpwards = true;
      this.sound.play();
      this.positionX = this.owner.left;
      this.top = this.owner.top;
      this.positionY = -1;
      this.element.style.display = "block";
    }
  }

  render() {
    if (this.thrown) {
      if (this.thrownUpwards) {
        this.left = this.positionX;
        this.top += this.positionY * this.speed;
      } else {
        this.left += this.positionX * this.speed;
        this.top = this.positionY;
      }

      const gameViewRect = this.gameView.getBoundingClientRect();
      const weaponRect = this.element.getBoundingClientRect();

      if (
        weaponRect.left < gameViewRect.left ||
        weaponRect.right > gameViewRect.right ||
        weaponRect.top < gameViewRect.top
      ) {
        this.returnWeapon();
      }
    } else {
      this.left = this.owner.left;
      this.top = this.owner.top + 25;
    }

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  returnWeapon() {
    this.element.style.display = "none";
    this.left = this.owner.left;
    this.top = this.owner.top + 25;
    this.thrown = false;
    this.thrownUpwards = false;
    this.positionX = 0;
    this.positionY = 0;
  }
}

export class EnemyWeapon extends Weapon {
  constructor(imageSrc, owner, gameView) {
    super(imageSrc, owner, gameView);
    this.element.style.display = "none";
  }

  throw(player) {
    if (!this.thrown) {
      this.element.style.display = "block";
      this.thrown = true;

      const playerPosition = {
        positionX: player.left,
        positionY: player.top + 32,
      };

      const direction = {
        directionX: playerPosition.positionX - this.owner.left,
        directionY: playerPosition.positionY - this.owner.top,
      };

      const distance = Math.sqrt(
        direction.directionX ** 2 + direction.directionY ** 2
      );

      this.positionX = direction.directionX / distance;
      this.positionY = direction.directionY / distance;
    }
  }

  render() {
    this.left += this.positionX * this.speed;
    this.top += this.positionY * this.speed;

    const gameViewRect = this.gameView.getBoundingClientRect();
    const weaponRect = this.element.getBoundingClientRect();

    if (
      weaponRect.left < gameViewRect.left ||
      weaponRect.right > gameViewRect.right ||
      weaponRect.top > gameViewRect.bottom ||
      weaponRect.top < gameViewRect.top
    ) {
      this.returnWeapon();
    }

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  returnWeapon() {
    this.element.style.display = "none";
    this.left = this.owner.left;
    this.top = this.owner.top + 25;
    this.thrown = false;
    this.positionX = 0;
    this.positionY = 0;
  }
}

export class MagicalWeapon extends EnemyWeapon {
  constructor(imageSrc, gameView, top, left) {
    super(imageSrc, undefined, gameView);
    this.startTop = top;
    this.startLeft = left;
    this.top = this.startTop;
    this.left = this.startLeft;

    this.width = 64;
    this.height = 64;

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.display = "block";
  }

  throw(player) {
    if (!this.thrown) {
      this.thrown = true;

      const playerPosition = {
        positionX: player.left,
        positionY: player.top + 32,
      };

      const direction = {
        directionX: playerPosition.positionX - this.left,
        directionY: playerPosition.positionY - this.top,
      };

      const distance = Math.sqrt(
        direction.directionX ** 2 + direction.directionY ** 2
      );

      this.positionX = direction.directionX / distance;
      this.positionY = direction.directionY / distance;
    }
  }

  weaponHit(playerElement) {
    const playerRect = playerElement.getBoundingClientRect();
    const weaponRect = this.element.getBoundingClientRect();

    return (
      playerRect.left < weaponRect.right &&
      playerRect.right > weaponRect.left &&
      playerRect.top < weaponRect.bottom &&
      playerRect.bottom > weaponRect.top
    );
  }

  returnWeapon() {
    this.left = this.startLeft;
    this.top = this.startTop;
    this.thrown = false;
    this.positionX = 0;
    this.positionY = 0;
  }
}

export default Weapon;
