import { PlayerData, PlayerInput } from "src/types/core";
import MainScene from "../..";
import MovementController from "./movementController";

class Player extends Phaser.GameObjects.Sprite {
  movementController: MovementController;
  id: string;

  constructor(scene: MainScene, data: PlayerData) {
    super(scene, data.x, data.y, "player");
    this.setScale(data.scale);
    this.setRotation(data.rotation);
    scene.add.existing(this);
    this.id = data.id;
    this.movementController = new MovementController(this);
  }

  setInput(input: PlayerInput) {
    this.movementController.input = input;
  }

  update() {
    this.movementController.update();
  }
}

export default Player;
