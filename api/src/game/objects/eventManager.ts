import { Socket } from "socket.io";
import { gameSocket } from "src/server";
import { PlayerData, PlayerInput } from "src/types/core";
import MainScene from "..";

class EventManager {
  scene: MainScene;

  constructor(scene: MainScene) {
    this.scene = scene;
    this.defineEvents();
  }

  defineEvents() {
    gameSocket.on("connection", (socket) => {
      console.log("new connection!");

      this.joinGame(socket);
      socket.on(
        "playerInputUpdated",
        this.handlePlayerInputUpdated.bind(this, socket)
      );
    });
  }

  handlePlayerInputUpdated(socket: Socket, input: PlayerInput) {
    const player = this.scene.getPlayerById(socket.id);
    if (player) {
      player.setInput(input);
    }
  }

  joinGame(socket: Socket) {
    const data: PlayerData = {
      id: socket.id,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 0.32,
    };

    this.scene.addPlayer(data);
    socket.emit("playerUpdated", data);
  }
}

export default EventManager;
