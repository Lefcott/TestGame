import MainScene from "..";

class Ping extends Phaser.GameObjects.Text {
  /** @param {MainScene} scene */
  constructor(scene) {
    super(scene, 10, 10, "Ping: -");
    this.scene = scene;
    this.setScrollFactor(0, 0);
    this.scene.add.existing(this);
    this.sendPing();
  }

  sendPing() {
    setInterval(() => {
      const timestamp = +new Date();
      this.scene.directConnection.sendToMaster("ping", {
        userId: this.scene.activePlayer.id,
        timestamp,
      });
    }, 500);
  }

  updatePing(timestamp) {
    const newPing = +new Date() - timestamp;
    this.text = `Ping: ${newPing}`;
  }
}

export default Ping;
