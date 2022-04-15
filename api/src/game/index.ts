import "@geckos.io/phaser-on-nodejs";
import Phaser from "phaser";
import path from "path";
import { PlayerData } from "src/types/core";
import EventManager from "./objects/eventManager";
import Player from "./objects/player";
import { gameSocket } from "src/server";

class MainScene extends Phaser.Scene {
  eventManager?: EventManager;
  players: Player[] = [];

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("player", this.getAssetPath("player.png"));
    this.load.image("bullet", this.getAssetPath("bullet.png"));
  }

  create() {
    this.eventManager = new EventManager(this);
  }

  update() {
    this.players.forEach((player) => {
      player.update();
    });
  }

  addPlayer(playerData: PlayerData) {
    this.players.push(new Player(this, playerData));
  }

  removePlayer(id: string) {
    const player = this.getPlayerById(id);
    if (player) {
      player.destroy();
      this.players = this.players.filter((player) => player.id !== id);

      gameSocket.emit("playerLeft", { id });
    }
  }

  getPlayerById(id: string) {
    return this.players.find((player) => player.id === id);
  }

  getAssetPath(fileName: string) {
    return path.join(__dirname, "../../src/assets/", fileName);
  }
}

new Phaser.Game({
  type: Phaser.HEADLESS,
  width: 1280,
  height: 720,
  banner: false,
  audio: { noAudio: true },
  scene: [MainScene],
  physics: { default: "arcade" },
});

export default MainScene;
