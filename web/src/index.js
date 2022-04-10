import Phaser from "phaser";
import backgroundImg from "./assets/background.jpeg";
import playerImg from "./assets/player.png";
import Background from "./objects/background";
import Player from "./objects/player";

class MainScene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("background", backgroundImg);
    this.load.image("player", playerImg);
  }

  create() {
    this.background = new Background(this);
    this.player = new Player(this);
  }

  update() {
    this.player.update();
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  parent: "phaser-example",
  scene: MainScene,
};

const game = new Phaser.Game(config);

export default MainScene;
