class MovementController {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
  }

  checkMovements() {
    if (this.scene.input.keyboard.addKey("W").isDown) this.moveUp();
    if (this.scene.input.keyboard.addKey("A").isDown) this.moveLeft();
    if (this.scene.input.keyboard.addKey("S").isDown) this.moveDown();
    if (this.scene.input.keyboard.addKey("D").isDown) this.moveRight();
  }
  moveLeft() {
    this.scene.background.moveRight();
  }
  moveRight() {
    this.scene.background.moveLeft();
  }
  moveUp() {
    this.scene.background.moveDown();
  }
  moveDown() {
    this.scene.background.moveUp();
  }
  update() {
    this.checkMovements();
  }
}

export default MovementController;
