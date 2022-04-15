import MainScene from "..";

class Background extends Phaser.GameObjects.TileSprite {
  /** @param {MainScene} scene */
  constructor(scene) {
    super(
      scene,
      0,
      0,
      +process.env.MAP_WIDTH,
      +process.env.MAP_HEIGHT,
      "background"
    );
    this.alpha = 0.8;
    scene.add.existing(this);
  }
}

export default Background;
