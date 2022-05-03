import MainScene from "../..";
import MovementController from "./movementController";

class RemotePlayer extends Phaser.GameObjects.Sprite {
  /** @param {MainScene} scene */
  constructor(scene, id, scale, rotation, x, y) {
    super(scene, x, y, "player");
    this.scene = scene;
    this.id = id;
    this.scale = scale;
    this.rotation = rotation;
    this.scene.add.existing(this);
    this.movementController = new MovementController(this);
  }

  update() {
    if (this.scene.player.isMaster) {
      this.movementController.update();
    }
  }

  setProperties(data) {
    this.x = data.x;
    this.y = data.y;
    this.rotation = data.rotation;
    this.scale = data.scale;
  }
}

export default RemotePlayer;
