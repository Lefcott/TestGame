import Player from ".";
import Bullet from "../bullet";

class FireController {
  /** @param {Player} player */
  constructor(player) {
    this.player = player;
    this.addFireEvent();
  }

  addFireEvent() {
    this.player.scene.input.on("pointerdown", () => {
      new Bullet(this.player.scene, this.player.x, this.player.y);
    });
  }
}

export default FireController;
