import Player from ".";

class RotationController {
  /** @param {Player} player */
  constructor(player) {
    this.player = player;
  }

  rotateToPointer() {
    const rotation = this.getRotationToPointer();
    this.player.setRotation(rotation);
  }
  getRotationToPointer() {
    const pointer = this.player.scene.input.activePointer;
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
