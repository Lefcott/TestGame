export type PlayerData = {
  id: string;
  scale: number;
  rotation: number;
  x: number;
  y: number;
};

export type PlayerInput = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
};

export type Shot = {
  id: string;
  x: number;
  y: number;
  direction: number;
};
