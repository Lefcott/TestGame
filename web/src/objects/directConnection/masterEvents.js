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
    this.directConnection.on("updateInput", this.onInputUpdated.bind(this));
    this.directConnection.on(
      "updateRotation",
      this.onUpdateRotation.bind(this)
    );
    this.directConnection.on("createShot", this.onCreateShot.bind(this));
    this.directConnection.on("ping", this.onPing.bind(this));
  }

  onInputUpdated(data) {
    const player = this.scene.getPlayerById(data.userId);
    player.movementController.input = data.input;
  }

  onUpdateRotation(data) {
    this.directConnection.sendToUsers("rotationUpdated", data);
  }

  onCreateShot(data) {
    this.directConnection.sendToUsers("shotCreated", data);
  }

  onPing(data) {
    this.directConnection.sendToUser(data.userId, "pong", {
      timestamp: data.timestamp,
    });
  }
}

export default MasterEvents;
