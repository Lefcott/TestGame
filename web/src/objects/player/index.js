import MainScene from "../..";
import MovementController from "./movementController";

class Player extends Phaser.GameObjects.Sprite {
  /** @param {MainScene} scene */
  constructor(scene, id, isActive) {
    super(scene, 0, 0, "player");
    this.isActive = isActive;
    this.id = id;
    this.scene = scene;
    this.movementController = new MovementController(this);
    this.scale = 0.32;
    this.scene.add.existing(this);
  }

  get isMaster() {
    return this.scene.masterUser === this.id;
  }

  setProperties(data) {
    this.x = data.x;
    this.y = data.y;
    this.rotation = data.rotation;
    this.scale = data.scale;
  }

  update() {
    this.movementController.update();
  }
}

export default Player;
