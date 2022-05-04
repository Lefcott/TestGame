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
    this.directConnection.on("pong", this.onPong.bind(this));
  }

  onPlayerUpdated(data) {
    const player = this.scene.getPlayerById(data.id);
    player.setProperties(data);
  }

  onPong(data) {
    this.scene.ping.updatePing(data.timestamp);
  }
}

export default UserEvents;
