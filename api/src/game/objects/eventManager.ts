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
        "inputUpdated",
        this.handlePlayerInputUpdated.bind(this, socket)
      );

      socket.on(
        "rotationUpdated",
        this.handleRotationUpdated.bind(this, socket)
      );

      socket.on("disconnect", () => {
        this.scene.removePlayer(socket.id);
      });
    });
  }

  handlePlayerInputUpdated(socket: Socket, input: PlayerInput) {
    const player = this.scene.getPlayerById(socket.id);
    if (player) {
      player.setInput(input);
    }
  }

  handleRotationUpdated(socket: Socket, input: number, callback: Function) {
    const player = this.scene.getPlayerById(socket.id);

    if (player) {
      player.rotation = input;
      callback();
      socket.broadcast.emit("playerRotationUpdated", {
        playerId: socket.id,
        rotation: input,
      });
    }
  }

  joinGame(socket: Socket) {
    const playerData: PlayerData = {
      id: socket.id,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 0.32,
    };

    gameSocket.emit("playerJoined", playerData);

    socket.emit(
      "playerList",
      this.scene.players.map((player) => ({
        id: player.id,
        x: player.x,
        y: player.y,
        rotation: player.rotation,
        scale: player.scale,
      })) as PlayerData[]
    );
    this.scene.addPlayer(playerData);
  }
}

export default EventManager;
