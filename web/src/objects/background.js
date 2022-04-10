import MainScene from "..";

const width = 6400;
const height = 6400;

class Background extends Phaser.GameObjects.TileSprite {
  /** @param {MainScene} scene */
  constructor(scene) {
    super(
      scene,
      scene.game.canvas.width / 2,
      scene.game.canvas.height / 2,
      width,
      height,
      "background"
    );
    this.alpha = 0.8;
    this.minX = scene.game.canvas.width / 2 - width / 2;
    this.minY = scene.game.canvas.height / 2 - height / 2;
    this.maxX = scene.game.canvas.width / 2 + width / 2;
    this.maxY = scene.game.canvas.height / 2 + height / 2;
    scene.add.existing(this);
  }
  moveLeft() {
    if (this.x - 10 >= this.minX) {
      this.x -= 10;
    }
  }
  moveRight() {
    if (this.x + 10 <= this.maxX) {
      this.x += 10;
    }
  }
  moveUp() {
    if (this.y - 10 >= this.minY) {
      this.y -= 10;
    }
  }
  moveDown() {
    if (this.y + 10 <= this.maxY) {
      this.y += 10;
    }
  }
}

export default Background;
