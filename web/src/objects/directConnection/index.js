import MainScene from "../..";
import gameSocket from "../../utils/socket";
import MasterEvents from "./masterEvents";
import UserEvents from "./userEvents";

class DirectConnection {
  /** @param {MainScene} scene */
  constructor(scene) {
    this.scene = scene;
    /** @type {{ connection: RTCPeerConnection, dataChannel: RTCDataChannel }} */
    this.masterUser = null;
    /** @type {{ id: string, connection: RTCPeerConnection, dataChannel: RTCDataChannel }[]} */
    this.users = [];
    this.events = {};
    this.masterEvents = new MasterEvents(this.scene, this);
    this.userEvents = new UserEvents(this.scene, this);
  }

  createConnection() {
    /** @type {RTCPeerConnection} */
    const connection = new webkitRTCPeerConnection(
      { iceServers: [{ url: "stun:stun.1.google.com:19302" }] },
      { optional: [{ RtpDataChannels: true }] }
    );

    connection.onicecandidate = (event) => {
      if (event.candidate) {
        gameSocket.emit("candidate", {
          userId: this.connectedUser || this.scene.masterUser,
          candidate: event.candidate,
        });
      }
    };
    connection.ondatachannel = (ev) => {
      ev.channel.onmessage = (messageEvent) => {
        const { event, data } = JSON.parse(messageEvent.data);
        this.receiveEvent(event, data);
      };
    };

    return connection;
  }

  connectToMasterUser() {
    console.log("connecting to the master user");
    const connection = this.createConnection();

    if (this.masterUser) {
      this.masterUser.connection.close();
    }

    this.masterUser = {
      connection,
      dataChannel: this.createDataChannel(connection),
    };

    this.masterUser.connection.createOffer().then((offer) => {
      console.log("offer created", offer);
      this.masterUser.connection.setLocalDescription(offer);
      gameSocket.emit("offer", {
        userId: this.scene.masterUser,
        offer,
      });
    });
  }

  onOffer(userId, offer) {
    console.log("offer received, create answer");
    const connection = this.createConnection();
    const user = { id: userId, connection };

    this.users.push(user);

    user.dataChannel = this.createDataChannel(connection, () => {
      this.sendToUser(userId, "playerJoined", {
        id: this.scene.activePlayer.id,
        x: this.scene.activePlayer.x,
        y: this.scene.activePlayer.y,
        rotation: this.scene.activePlayer.rotation,
        scale: this.scene.activePlayer.scale,
      });
      this.sendToUsers("playerJoined", {
        id: userId,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.6,
      });
    });

    connection.setRemoteDescription(new RTCSessionDescription(offer));

    connection.createAnswer().then((answer) => {
      connection.setLocalDescription(answer);

      gameSocket.emit("answer", { userId, answer });
    });
  }

  onAnswer(answer) {
    console.log("answer received", answer);
    this.masterUser.connection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }

  onCandidate(data) {
    console.log("candidate received");

    if (this.scene.activePlayer.isMaster) {
      const user = this.users.find((user) => user.id === data.userId);

      if (user) {
        user.connection.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    } else {
      this.masterUser.connection.addIceCandidate(
        new RTCIceCandidate(data.candidate)
      );
    }
  }

  /** @param connection {RTCPeerConnection} */
  createDataChannel(connection, onOpen) {
    console.log("creating data channel");
    const dataChannel = connection.createDataChannel("masterUserDataChannel", {
      reliable: true,
    });

    dataChannel.onerror = (error) => {
      console.log("Error:", error);
    };

    dataChannel.onmessage = (event) => {
      console.log("Got message:", event.data);
    };

    dataChannel.onclose = () => {
      console.log("Data channel is closed");
    };

    dataChannel.onopen = () => {
      console.log("data channel", dataChannel);
      if (onOpen) {
        onOpen();
      }
    };

    return dataChannel;
  }

  sendToMaster(event, data) {
    if (this.scene.activePlayer.isMaster) {
      this.receiveEvent(event, data);
    } else if (
      this.masterUser &&
      this.masterUser.dataChannel.readyState === "open"
    ) {
      this.masterUser.dataChannel.send(JSON.stringify({ event, data }));
    }
  }

  sendToUsers(event, data) {
    this.receiveEvent(event, data);
    this.users.forEach((user) => {
      user.dataChannel.send(JSON.stringify({ event, data }));
    });
  }

  sendToUser(userId, event, data) {
    if (userId !== this.scene.activePlayer.id) {
      const user = this.users.find((user) => user.id === userId);
      user.dataChannel.send(JSON.stringify({ event, data }));
    }
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  receiveEvent(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}

export default DirectConnection;
