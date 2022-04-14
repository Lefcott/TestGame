import Phaser from "phaser";
import backgroundImg from "./assets/background.jpeg";
import playerImg from "./assets/player.png";
import bulletImg from "./assets/bullet.png";
import gunSound from "./assets/sounds/gun.wav";
import footstepsSound from "./assets/sounds/footsteps.mp3";
import Background from "./objects/background";
import EventManager from "./objects/eventManager";
import Player from "./objects/player";
import RemotePlayer from "./objects/remotePlayer";

class MainScene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("background", backgroundImg);
    this.load.image("player", playerImg);
    this.load.image("bullet", bulletImg);
    this.load.audio("gun", gunSound);
    this.load.audio("footsteps", footstepsSound);
  }

  create() {
    this.background = new Background(this);
    this.player = new Player(this);
    /** @type {RemotePlayer[]} */
    this.remotePlayers = [];
    this.gunSound = this.sound.add("gun");
    this.footstepsSound = this.sound.add("footsteps");
    this.eventListener = new EventManager(this);
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
  physics: { default: "arcade" },
  parent: "phaser-example",
  scene: MainScene,
};

const game = new Phaser.Game(config);

export default MainScene;
