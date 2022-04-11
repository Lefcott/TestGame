import gameData, { Player } from "../gameData";
import playerJoined from "../output/playerJoined";

const joinGame = (data: JoinGameInput) => {
  if (!gameData.players.find((x) => x.id === data.player.id)) {
    gameData.players.push(data.player);
    playerJoined(data.player);
  }
};

export type JoinGameInput = {
  player: Player;
};

export default joinGame;
