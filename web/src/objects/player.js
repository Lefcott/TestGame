import MainScene from "..";

class Player extends Phaser.GameObjects.Sprite {
  /** @param {MainScene} scene */
  constructor(scene) {
    super(
      scene,
      scene.game.canvas.width / 2,
      scene.game.canvas.height / 2,
      "player"
    );
    this.scene = scene;
    this.scale = 0.35;
    this.scene.add.existing(this);
  }
  checkMovements() {
    if (this.scene.input.keyboard.addKey("W").isDown) {
      this.moveUp();
    }
    if (this.scene.input.keyboard.addKey("A").isDown) {
      this.moveLeft();
    }
    if (this.scene.input.keyboard.addKey("S").isDown) {
      this.moveDown();
    }
    if (this.scene.input.keyboard.addKey("D").isDown) {
      this.moveRight();
    }
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
  update() {
    this.checkMovements();
  }
}

export default Player;
