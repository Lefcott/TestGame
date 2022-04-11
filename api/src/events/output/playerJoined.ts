import { gameSocket } from "src/server";
import { Player } from "../gameData";

const playerJoined = (player: Player) => {
  gameSocket.emit("playerJoined", player);
};

export default playerJoined;
