import gameSocket from "../utils/socket";
import MainScene from "..";

class EventManager {
  /** @param {MainScene} scene */
  constructor(scene) {
    this.scene = scene;
    this.addEventListeners();
    this.joinGame();
  }
  addEventListeners() {
    gameSocket.on("playerJoined", (data) => {
      console.log("player joined!");
    });
  }
  joinGame() {
    gameSocket.emit("joinGame", {
      player: {
        id: this.scene.player.id,
        scale: this.scene.player.scale,
        rotation: this.scene.player.rotation,
        x: this.scene.player.x,
        y: this.scene.player.y,
      },
    });
  }
}

export default EventManager;
