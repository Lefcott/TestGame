import Player from ".";
import gameSocket from "../../utils/socket";

class RotationController {
  /** @param {Player} player */
  constructor(player) {
    this.player = player;
  }

  rotateToPointer() {
    const newRotation = this.getRotationToPointer();

    if (newRotation.toFixed(2) !== this.player.rotation.toFixed(2)) {
      gameSocket.emit("rotationUpdated", newRotation, () => {
        this.player.setRotation(newRotation);
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
    this.rotateToPointer();
  }
}

export default RotationController;
