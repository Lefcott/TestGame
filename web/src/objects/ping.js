import MainScene from "..";
import gameSocket from "../utils/socket";

class Ping extends Phaser.GameObjects.Text {
  /** @param {MainScene} scene */
  constructor(scene) {
    super(scene, 10, 10, "Ping: ");
    this.scene = scene;
    this.setScrollFactor(0, 0);
    this.scene.add.existing(this);
    this.updatePing();
  }

  updatePing() {
    setInterval(() => {
      const timestamp = +new Date();
      gameSocket.emit("ping", () => {
        const newPing = +new Date() - timestamp;
        this.text = `Ping: ${newPing}`;
      });
    }, 500);
  }
}

export default Ping;
