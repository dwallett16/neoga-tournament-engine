import { type Player } from "./player";

export interface PlayerRound {
  number: number;
  player: Player;
  scores: number[];
}
