import { Shot } from "src/types/core";
import MainScene from "..";

const speed = 1500;

class Bullet extends Phaser.GameObjects.Sprite {
  id: string;
  playerId: string;
  scene: MainScene;
  direction: number;

  constructor(scene: MainScene, playerId: string, shotData: Shot) {
    super(scene, shotData.x, shotData.y, "bullet");
    this.scene = scene;
    this.id = shotData.id;
    this.playerId = playerId;
    this.direction = shotData.direction;
    this.scale = 0.1;
    this.fire();
    this.setDestroyEvent();
  }

  fire() {
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.rotation += this.direction + Math.PI / 2;

    if ("setVelocityX" in this.body) {
      this.body.setVelocityX(speed * Math.cos(this.direction));
      this.body.setVelocityY(speed * Math.sin(this.direction));
    }
  }

  setDestroyEvent() {
    this.scene.time.addEvent({
      delay: 10000,
      callback: () => {
        this.scene.bullets = this.scene.bullets.filter(
          (bullet) => bullet.id !== this.id
        );
        this.destroy();
      },
    });
  }
}

export default Bullet;
