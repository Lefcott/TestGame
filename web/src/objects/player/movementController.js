import Player from ".";
import gameSocket from "../../utils/socket";

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

  checkMovements() {
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
      gameSocket.emit("inputUpdated", this.input);
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
    this.checkMovements();
    this.playFootstepsSound();
  }
}

export default MovementController;
