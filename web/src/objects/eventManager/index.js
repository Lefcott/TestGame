import gameSocket from "../../utils/socket";
import MainScene from "../..";
import RemotePlayer from "../remotePlayer";
import Bullet from "../bullet";

class EventManager {
  /** @param {MainScene} scene */
  constructor(scene) {
    this.scene = scene;
    this.scene.player.id = gameSocket.id;
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
    this.scene.player.id = gameSocket.id;
  }

  handleMasterUserUpdated(masterUser) {
    this.scene.masterUser = masterUser;
    if (!this.scene.player.isMaster) {
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
    data.forEach(this.addRemotePlayer.bind(this));
  }

  handlePlayerCreated(data) {
    if (data.id === gameSocket.id) {
      this.scene.player.setProperties(data);
    } else {
      this.addRemotePlayer(data);
    }
  }

  handlePlayerLeft(data) {
    this.scene.removePlayer(data.id);
  }

  handlePlayerUpdated(data) {
    if (data.id === gameSocket.id) {
      this.scene.player.setProperties(data);
    } else {
      const remotePlayer = this.scene.getPlayerById(data.id);
      remotePlayer.setProperties(data);
    }
  }

  handlePlayerRotationUpdated(data) {
    const remotePlayer = this.scene.getPlayerById(data.playerId);
    if (remotePlayer) {
      remotePlayer.rotation = data.rotation;
    }
  }

  handleShotCreated(data) {
    this.scene.bullets.push(
      new Bullet(this.scene, data.id, data.x, data.y, data.direction)
    );
  }

  addRemotePlayer(data) {
    this.scene.remotePlayers.push(
      new RemotePlayer(
        this.scene,
        data.id,
        data.scale,
        data.rotation,
        data.x,
        data.y
      )
    );
  }
}

export default EventManager;
