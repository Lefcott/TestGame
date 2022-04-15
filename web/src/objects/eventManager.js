import gameSocket from "../utils/socket";
import MainScene from "..";
import RemotePlayer from "./remotePlayer";

class EventManager {
  /** @param {MainScene} scene */
  constructor(scene) {
    this.scene = scene;
    this.addEventListeners();
    gameSocket.connect();
  }

  addEventListeners() {
    gameSocket.on("playerJoined", this.addRemotePlayer.bind(this));
    gameSocket.on("playerUpdated", this.setPlayerProperties.bind(this));
  }
  setPlayerProperties(data) {
    if (data.id === gameSocket.id) {
      this.scene.player.setProperties(data);
    }
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
