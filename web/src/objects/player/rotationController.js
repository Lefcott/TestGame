import Player from ".";

class RotationController {
  /** @param {Player} player */
  constructor(player) {
    this.player = player;
  }

  sendRotation() {
    const rotation = this.getRotationToPointer();

    if (rotation.toFixed(2) !== this.player.rotation.toFixed(2)) {
      this.player.scene.directConnection.sendToMaster("updateRotation", {
        userId: this.player.id,
        rotation,
      });
    }
  }

  getRotationToPointer() {
    const pointer = this.player.scene.input.activePointer;
    const angle = Phaser.Math.Angle.Between(
      this.player.x - this.player.scene.cameras.main.scrollX,
      this.player.y - this.player.scene.cameras.main.scrollY,
      pointer.x,
      pointer.y
    );
    return angle + Math.PI / 2;
  }

  update() {
    if (this.player.isActive) {
      this.sendRotation();
    }
  }
}

export default RotationController;
