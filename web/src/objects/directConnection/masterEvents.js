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
  }

  onInputUpdated(data) {
    if (data.userId === this.scene.player.id) {
      this.scene.player.movementController.input = data.input;
    } else {
      const player = this.scene.getPlayerById(data.userId);
      player.movementController.input = data.input;
    }
  }
}

export default MasterEvents;
