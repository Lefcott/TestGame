import Phaser from "phaser";
import backgroundImg from "./assets/background.jpeg";
import playerImg from "./assets/player.png";
import bulletImg from "./assets/bullet.png";
import gunSound from "./assets/sounds/gun.wav";
import footstepsSound from "./assets/sounds/footsteps.mp3";
import Background from "./objects/background";
import EventManager from "./objects/eventManager";
import Player from "./objects/player";
import Bullet from "./objects/bullet";
import Ping from "./objects/ping";
import DirectConnection from "./objects/directConnection";

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
    this.directConnection = new DirectConnection(this);
    this.activePlayer = new Player(this, null, true);
    /** @type {Player[]} */
    this.players = [this.activePlayer];
    /** @type {Bullet[]} */
    this.bullets = [];
    this.masterUser = "";
    this.gunSound = this.sound.add("gun");
    this.footstepsSound = this.sound.add("footsteps");
    this.eventListener = new EventManager(this);
    this.ping = new Ping(this);
    this.cameras.main.startFollow(this.activePlayer, false, 0.09, 0.09);
  }

  update() {
    this.players.forEach((player) => player.update());
  }

  removePlayer(id) {
    const player = this.getPlayerById(id);

    if (player) {
      player.destroy();
      this.players = this.players.filter((player) => player.id !== id);
    }
  }

  getPlayerById(id) {
    return this.players.find((player) => player.id === id);
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  fps: { target: 30 },
  physics: { default: "arcade" },
  parent: "phaser-example",
  scene: MainScene,
};

const game = new Phaser.Game(config);

export default MainScene;
