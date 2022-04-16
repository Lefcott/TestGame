import MainScene from "../..";

const speed = 1500;

class Bullet extends Phaser.GameObjects.Sprite {
  /** @param {MainScene} scene */
  constructor(scene, id, x, y, direction) {
    super(scene, x, y, "bullet");
    this.scene = scene;
    this.id = id;
    this.scale = 0.1;
    this.direction = direction;
    this.fire();
    this.setDestroyEvent();
  }
  fire() {
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.rotation = this.direction + Math.PI / 2;
    this.body.setVelocityX(speed * Math.cos(this.direction));
    this.body.setVelocityY(speed * Math.sin(this.direction));
    this.scene.gunSound.play();
  }
  setDestroyEvent() {
    this.scene.time.addEvent({
      delay: 10000,
      callback: () => {
        this.scene.bullets = this.scene.bullets.filter((x) => x.id !== this.id);
        this.destroy();
      },
    });
  }
}

export default Bullet;
