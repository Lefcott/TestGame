import MainScene from "../..";

const speed = 1400;

class Bullet extends Phaser.GameObjects.Sprite {
  /** @param {MainScene} scene */
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
    this.scene = scene;
    this.scale = 0.1;
    this.fire();
    this.setDestroyEvent();
  }
  fire() {
    const pointer = this.scene.input.activePointer;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.rotation =
      Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y) +
      Math.PI / 2;
    const direction = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      pointer.x,
      pointer.y
    );
    this.body.setVelocityX(speed * Math.cos(direction));
    this.body.setVelocityY(speed * Math.sin(direction));
  }
  setDestroyEvent() {
    this.scene.time.addEvent({
      delay: 10000,
      callback: () => {
        this.destroy();
      },
    });
  }
}

export default Bullet;
