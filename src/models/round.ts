import { type Player } from "./player";

export interface Round {
  number: number;
  player: Player;
  scores: number[];
}
