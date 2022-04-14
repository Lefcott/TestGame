import gameSocket from "../utils/socket";
import MainScene from "..";
import RemotePlayer from "./remotePlayer";

class EventManager {
  /** @param {MainScene} scene */
  constructor(scene) {
    this.scene = scene;
    this.addEventListeners();
    this.joinGame();
  }

  addEventListeners() {
    gameSocket.on("playerJoined", this.addRemotePlayer.bind(this));
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
  addRemotePlayer(data) {
    if (data.id === this.scene.player.id) return;
    this.scene.remotePlayers.push(
      new RemotePlayer(
        this.scene,
        data.id,
        data.scale,
        data.rotation,
        data.x,
        data.y
      )
    );
  }
}

export default EventManager;
