import MainScene from "../..";
import gameSocket from "../../utils/socket";

class DirectConnection {
  /** @param {MainScene} scene */
  constructor(scene) {
    this.scene = scene;
    this.connection = this.createConnection();
    this.setupConnection();
    this.dataChannel = this.createDataChannel();
    // TODO this is not totally ok since there will be more users
    this.connectedUser = null;
    this.events = {};
  }

  /** @returns {RTCPeerConnection} */
  createConnection() {
    return new webkitRTCPeerConnection(
      { iceServers: [{ url: "stun:stun.1.google.com:19302" }] },
      { optional: [{ RtpDataChannels: true }] }
    );
  }

  setupConnection() {
    this.connection.onicecandidate = (event) => {
      if (event.candidate) {
        gameSocket.emit("candidate", {
          userId: this.connectedUser || this.scene.masterUser,
          candidate: event.candidate,
        });
      }
    };
    this.connection.ondatachannel = (ev) => {
      ev.channel.onmessage = (messageEvent) => {
        const { event, data } = JSON.parse(messageEvent.data);
        console.log("messageEvent", event, data);
        this.receiveEvent(event, data);
      };
    };
  }

  connectToMasterUser() {
    console.log("connecting to the master user");
    this.connection.createOffer().then((offer) => {
      console.log("offer created", offer);
      this.connection.setLocalDescription(offer);
      gameSocket.emit("offer", {
        userId: this.scene.masterUser,
        offer,
      });
    });
  }

  onOffer(userId, offer) {
    console.log("offer received, create answer");
    this.connectedUser = userId;
    this.connection.setRemoteDescription(new RTCSessionDescription(offer));

    this.connection.createAnswer().then((answer) => {
      this.connection.setLocalDescription(answer);

      gameSocket.emit("answer", { userId, answer });
    });
  }

  onAnswer(answer) {
    console.log("answer received", answer);
    this.connection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  onCandidate(candidate) {
    console.log("candidate received");
    this.connection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  createDataChannel() {
    const dataChannel = this.connection.createDataChannel(
      "masterUserDataChannel",
      { reliable: true }
    );

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
    };

    return dataChannel;
  }

  send(event, data) {
    this.dataChannel.send(JSON.stringify({ event, data }));
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
