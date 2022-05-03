import DirectConnection from ".";
import MainScene from "../..";

class UserEvents {
  /** @param scene {MainScene} @param directConnection {DirectConnection} */
  constructor(scene, directConnection) {
    this.scene = scene;
    this.directConnection = directConnection;
    this.defineEvents();
  }

  defineEvents() {
    this.directConnection.on("playerUpdated", this.onPlayerUpdated.bind(this));
  }

  onPlayerUpdated(data) {
    if (data.id === this.scene.player.id) {
      this.scene.player.setProperties(data);
    } else {
      const player = this.scene.getPlayerById(data.id);
      player.setProperties(data);
    }
  }
}

export default UserEvents;
