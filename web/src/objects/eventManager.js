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
    gameSocket.on("playerJoined", this.handlePlayerCreated.bind(this));
    gameSocket.on("playerUpdated", this.handlePlayerUpdated.bind(this));
  }

  handlePlayerCreated(data) {
    if (data.id === gameSocket.id) {
      this.scene.player.setProperties(data);
    } else {
      this.addRemotePlayer(data);
    }
  }

  handlePlayerUpdated(data) {
    if (data.id === gameSocket.id) {
      this.scene.player.setProperties(data);
    }
  }

  addRemotePlayer(data) {
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
