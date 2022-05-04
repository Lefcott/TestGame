import Player from ".";

class MovementController {
  /** @param {Player} player */
  constructor(player) {
    this.player = player;
    this.input = {
      w: false,
      a: false,
      s: false,
      d: false,
    };
  }

  sendMovements() {
    const previousInput = { ...this.input };

    this.input.w = this.player.scene.input.keyboard.addKey("W").isDown;
    this.input.a = this.player.scene.input.keyboard.addKey("A").isDown;
    this.input.s = this.player.scene.input.keyboard.addKey("S").isDown;
    this.input.d = this.player.scene.input.keyboard.addKey("D").isDown;

    if (
      previousInput.w !== this.input.w ||
      previousInput.a !== this.input.a ||
      previousInput.s !== this.input.s ||
      previousInput.d !== this.input.d
    ) {
      this.player.scene.directConnection.sendToMaster("updateInput", {
        userId: this.player.id,
        input: this.input,
      });
    }
  }

  move() {
    const previousPosition = {
      x: this.player.x,
      y: this.player.y,
    };
    if (this.input.w) {
      this.player.y -= 10;
    }
    if (this.input.a) {
      this.player.x -= 10;
    }
    if (this.input.s) {
      this.player.y += 10;
    }
    if (this.input.d) {
      this.player.x += 10;
    }

    if (
      previousPosition.x !== this.player.x ||
      previousPosition.y !== this.player.y
    ) {
      this.player.scene.directConnection.sendToUsers("playerUpdated", {
        id: this.player.id,
        x: this.player.x,
        y: this.player.y,
        rotation: this.player.rotation,
        scale: this.player.scale,
      });
    }
  }

  isMoving() {
    return (
      this.player.scene.input.keyboard.addKey("W").isDown ||
      this.player.scene.input.keyboard.addKey("A").isDown ||
      this.player.scene.input.keyboard.addKey("S").isDown ||
      this.player.scene.input.keyboard.addKey("D").isDown
    );
  }

  playFootstepsSound() {
    if (this.isMoving() && !this.player.scene.footstepsSound.isPlaying) {
      this.player.scene.footstepsSound.play();
    }
    if (!this.isMoving() && this.player.scene.footstepsSound.isPlaying) {
      this.player.scene.footstepsSound.stop();
    }
  }

  update() {
    if (this.player.isActive) {
      this.sendMovements();
      this.playFootstepsSound();
    }
    if (this.player.scene.activePlayer.isMaster) {
      this.move();
    }
  }
}

export default MovementController;
