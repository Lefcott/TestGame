import gameSocket from "../../utils/socket";
import MainScene from "../..";
import Bullet from "../bullet";
import Player from "../player";

class EventManager {
  /** @param {MainScene} scene */
  constructor(scene) {
    this.scene = scene;
    this.addEventListeners();
    gameSocket.connect();
  }

  addEventListeners() {
    // gameSocket.on("playerJoined", this.handlePlayerCreated.bind(this));
    this.scene.directConnection.on(
      "playerJoined",
      this.handlePlayerCreated.bind(this)
    );
    gameSocket.on("playerLeft", this.handlePlayerLeft.bind(this));
    gameSocket.on("playerUpdated", this.handlePlayerUpdated.bind(this));
    gameSocket.on("playerList", this.handlePlayerList.bind(this));
    gameSocket.on(
      "playerRotationUpdated",
      this.handlePlayerRotationUpdated.bind(this)
    );
    gameSocket.on("shotCreated", this.handleShotCreated.bind(this));
    gameSocket.on("connect", this.handleConnection.bind(this));
    gameSocket.on("masterUserUpdated", this.handleMasterUserUpdated.bind(this));
    gameSocket.on("offer", this.handleOffer.bind(this));
    gameSocket.on("answer", this.handleAnswer.bind(this));
    gameSocket.on("candidate", this.handleCandidate.bind(this));
  }

  handleConnection() {
    this.scene.activePlayer.id = gameSocket.id;
  }

  handleMasterUserUpdated(masterUser) {
    this.scene.masterUser = masterUser;
    if (!this.scene.activePlayer.isMaster) {
      this.scene.directConnection.connectToMasterUser();
    }
  }

  handleOffer(data) {
    this.scene.directConnection.onOffer(data.userId, data.offer);
  }

  handleAnswer(answer) {
    this.scene.directConnection.onAnswer(answer);
  }

  handleCandidate(candidate) {
    this.scene.directConnection.onCandidate(candidate);
  }

  handlePlayerList(data) {
    data.forEach(this.addPlayer.bind(this));
  }

  handlePlayerCreated(data) {
    if (data.id === this.scene.activePlayer.id) {
      this.scene.activePlayer.setProperties(data);
    } else {
      this.addPlayer(data);
    }
  }

  handlePlayerLeft(data) {
    this.scene.removePlayer(data.id);
  }

  handlePlayerUpdated(data) {
    const player = this.scene.getPlayerById(data.id);
    player.setProperties(data);
  }

  handlePlayerRotationUpdated(data) {
    const player = this.scene.getPlayerById(data.playerId);
    if (player) {
      player.rotation = data.rotation;
    }
  }

  handleShotCreated(data) {
    this.scene.bullets.push(
      new Bullet(this.scene, data.id, data.x, data.y, data.direction)
    );
  }

  addPlayer(data) {
    const player = new Player(this.scene, data.id, false);
    player.setProperties(data);
    this.scene.players.push(player);
  }
}

export default EventManager;
