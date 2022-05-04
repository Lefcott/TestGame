import { v4 as uuid } from "uuid";
import Player from ".";
import Bullet from "../bullet";

const gunCoords = [
  { x: -115, y: -97 },
  { x: 166, y: 97 },
];

class FireController {
  /** @param {Player} player */
  constructor(player) {
    this.player = player;

    if (this.player.isActive) {
      this.addFireEvent();
    }
  }

  addFireEvent() {
    this.player.scene.input.on("pointerdown", () => {
      const coords = this.getGunCoords();
      const direction = Phaser.Math.Angle.Between(
        coords.x - this.player.scene.cameras.main.scrollX,
        coords.y - this.player.scene.cameras.main.scrollY,
        this.player.scene.input.activePointer.x,
        this.player.scene.input.activePointer.y
      );
      const bulletId = uuid();

      this.player.scene.directConnection.sendToMaster("createShot", {
        id: bulletId,
        x: coords.x,
        y: coords.y,
        direction,
      });
    });
  }

  getGunCoords() {
    const angle = this.player.rotation;
    const randomCordIndex = Math.floor(Math.random() * 2);
    return {
      x:
        this.player.x +
        gunCoords[randomCordIndex].x * this.player.scale * Math.cos(angle),
      y:
        this.player.y +
        gunCoords[randomCordIndex].y * this.player.scale * Math.sin(angle),
    };
  }
}

export default FireController;
