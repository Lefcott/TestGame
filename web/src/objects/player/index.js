import { v4 as uuid } from "uuid";
import MainScene from "../..";
import MovementController from "./movementController";
import RotationController from "./rotationController";
import FireController from "./fireController";

class Player extends Phaser.GameObjects.Sprite {
  /** @param {MainScene} scene */
  constructor(scene) {
    super(
      scene,
      scene.game.canvas.width / 2,
      scene.game.canvas.height / 2,
      "player"
    );
    this.id = uuid();
    this.scene = scene;
    this.movementController = new MovementController(this);
    this.rotationController = new RotationController(this);
    this.fireController = new FireController(this);
    this.scale = 0.32;
    this.scene.add.existing(this);
  }

  update() {
    this.rotationController.update();
    this.movementController.update();
  }
}

export default Player;
