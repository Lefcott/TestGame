export type Player = {
  id: string;
  scale: number;
  rotation: number;
  x: number;
  y: number;
};
type GameData = {
  players: Player[];
};

const gameData: GameData = { players: [] };

export default gameData;
