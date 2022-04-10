class RotationController {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
  }

  rotateToPointer() {
    const pointer = this.scene.input.activePointer;
    const angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      pointer.x,
      pointer.y
    );
    this.player.setRotation(angle + Math.PI / 2);
  }
  update() {
    this.rotateToPointer();
  }
}

export default RotationController;
