import MainScene from "..";

class Background extends Phaser.GameObjects.TileSprite {
  /** @param {MainScene} scene */
  constructor(scene) {
    super(scene, 0, 0, 6400, 6400, "background");
    scene.add.existing(this);
  }
  moveLeft() {
    this.x -= 10;
  }
  moveRight() {
    this.x += 10;
  }
  moveUp() {
    this.y -= 10;
  }
  moveDown() {
    this.y += 10;
  }
}

export default Background;
