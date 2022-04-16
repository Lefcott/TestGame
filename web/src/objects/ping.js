import MainScene from "..";

class Ping extends Phaser.GameObjects.Text {
  /** @param {MainScene} scene */
  constructor(scene) {
    super(scene, 10, 10, "Ping: ");
    this.scene = scene;
    this.setScrollFactor(0, 0);
    this.scene.add.existing(this);
  }

  updatePing(newPing) {
    this.text = `Ping: ${newPing}`;
  }
}

export default Ping;
