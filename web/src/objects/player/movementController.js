import MainScene from "../..";

class MovementController {
  /** @param {MainScene} scene */
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
  }

  checkMovements() {
    if (this.scene.input.keyboard.addKey("W").isDown) this.moveUp();
    if (this.scene.input.keyboard.addKey("A").isDown) this.moveLeft();
    if (this.scene.input.keyboard.addKey("S").isDown) this.moveDown();
    if (this.scene.input.keyboard.addKey("D").isDown) this.moveRight();
  }
  isMoving() {
    return (
      this.scene.input.keyboard.addKey("W").isDown ||
      this.scene.input.keyboard.addKey("A").isDown ||
      this.scene.input.keyboard.addKey("S").isDown ||
      this.scene.input.keyboard.addKey("D").isDown
    );
  }
  moveLeft() {
    this.scene.background.moveRight();
  }
  moveRight() {
    this.scene.background.moveLeft();
  }
  moveUp() {
    this.scene.background.moveDown();
  }
  moveDown() {
    this.scene.background.moveUp();
  }
  playFootstepsSound() {
    if (this.isMoving() && !this.scene.footstepsSound.isPlaying) {
      this.scene.footstepsSound.play();
    }
    if (!this.isMoving() && this.scene.footstepsSound.isPlaying) {
      this.scene.footstepsSound.stop();
    }
  }
  update() {
    this.checkMovements();
    this.playFootstepsSound();
  }
}

export default MovementController;
