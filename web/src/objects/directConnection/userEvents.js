import DirectConnection from ".";
import MainScene from "../..";
import Bullet from "../bullet";

class UserEvents {
  /** @param scene {MainScene} @param directConnection {DirectConnection} */
  constructor(scene, directConnection) {
    this.scene = scene;
    this.directConnection = directConnection;
    this.defineEvents();
  }

  defineEvents() {
    this.directConnection.on("playerUpdated", this.onPlayerUpdated.bind(this));
    this.directConnection.on(
      "rotationUpdated",
      this.onRotationUpdated.bind(this)
    );
    this.directConnection.on("shotCreated", this.onShotCreated.bind(this));
    this.directConnection.on("pong", this.onPong.bind(this));
  }

  onPlayerUpdated(data) {
    const player = this.scene.getPlayerById(data.id);
    player.setProperties(data);
  }

  onRotationUpdated(data) {
    const player = this.scene.getPlayerById(data.userId);
    player.setRotation(data.rotation);
  }

  onShotCreated(data) {
    new Bullet(this.scene, data.id, data.x, data.y, data.direction);
  }

  onPong(data) {
    this.scene.ping.updatePing(data.timestamp);
  }
}

export default UserEvents;
