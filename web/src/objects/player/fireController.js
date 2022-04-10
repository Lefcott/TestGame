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
    this.addFireEvent();
  }

  addFireEvent() {
    this.player.scene.input.on("pointerdown", () => {
      const coords = this.getGunCoords();
      new Bullet(this.player.scene, coords.x, coords.y);
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
