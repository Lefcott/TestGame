import { gameSocket } from "src/server";
import Player from ".";

class MovementController {
  player: Player;
  input = {
    w: false,
    a: false,
    s: false,
    d: false,
  };

  constructor(player: Player) {
    this.player = player;
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
      gameSocket.emit("playerUpdated", {
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
