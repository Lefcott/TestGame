import DirectConnection from ".";
import MainScene from "../..";

class MasterEvents {
  /** @param scene {MainScene} @param directConnection {DirectConnection} */
  constructor(scene, directConnection) {
    this.scene = scene;
    this.directConnection = directConnection;
    this.defineEvents();
  }

  defineEvents() {
    this.directConnection.on("inputUpdated", this.onInputUpdated.bind(this));
    this.directConnection.on("ping", this.onPing.bind(this));
  }

  onInputUpdated(data) {
    const player = this.scene.getPlayerById(data.userId);
    player.movementController.input = data.input;
  }

  onPing(data) {
    this.directConnection.sendToUser(data.userId, "pong", {
      timestamp: data.timestamp,
    });
  }
}

export default MasterEvents;