import RemotePlayer from ".";

class MovementController {
  /** @param player {RemotePlayer} */
  constructor(player) {
    this.player = player;
    this.input = {
      w: false,
      a: false,
      s: false,
      d: false,
    };
  }

  movePlayer() {
    const previousPosition = {
      x: this.player.x,
      y: this.player.y,
    };
    if (this.input.w) {
      this.player.y -= 10;
    }
    if (this.input.a) {
      this.player.x -= 10;
    }
    if (this.input.s) {
      this.player.y += 10;
    }
    if (this.input.d) {
      this.player.x += 10;
    }

    if (
      previousPosition.x !== this.player.x ||
      previousPosition.y !== this.player.y
    ) {
      this.player.scene.directConnection.sendToUsers("playerUpdated", {
        id: this.player.id,
        x: this.player.x,
        y: this.player.y,
        rotation: this.player.rotation,
        scale: this.player.scale,
      });
    }
  }

  update() {
    this.movePlayer();
  }
}

export default MovementController;
