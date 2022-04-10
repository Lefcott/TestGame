import MainScene from "../..";

class RotationController {
  /** @param {MainScene} scene */
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
  }

  rotateToPointer() {
    const rotation = this.getRotationToPointer();
    this.player.setRotation(rotation);
  }
  getRotationToPointer() {
    const pointer = this.scene.input.activePointer;
    const angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      pointer.x,
      pointer.y
    );
    return angle + Math.PI / 2;
  }
  update() {
    this.rotateToPointer();
  }
}

export default RotationController;
