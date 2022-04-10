import Player from ".";

class MovementController {
  /** @param {Player} player */
  constructor(player) {
    this.player = player;
  }

  checkMovements() {
    if (this.player.scene.input.keyboard.addKey("W").isDown) this.moveUp();
    if (this.player.scene.input.keyboard.addKey("A").isDown) this.moveLeft();
    if (this.player.scene.input.keyboard.addKey("S").isDown) this.moveDown();
    if (this.player.scene.input.keyboard.addKey("D").isDown) this.moveRight();
  }
  isMoving() {
    return (
      this.player.scene.input.keyboard.addKey("W").isDown ||
      this.player.scene.input.keyboard.addKey("A").isDown ||
      this.player.scene.input.keyboard.addKey("S").isDown ||
      this.player.scene.input.keyboard.addKey("D").isDown
    );
  }
  moveLeft() {
    this.player.scene.background.moveRight();
  }
  moveRight() {
    this.player.scene.background.moveLeft();
  }
  moveUp() {
    this.player.scene.background.moveDown();
  }
  moveDown() {
    this.player.scene.background.moveUp();
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
