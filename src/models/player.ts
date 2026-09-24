import { type PlayerRound } from "./player-round";

export interface Player {
  id: number;
  fullName: string;
  handicap: number;
}

export interface TwoManEntry {
  team: Player[];
  teamRounds: PlayerRound[];
}

export interface TwoManEntryResult {
  combinedScore: number[];
  team: Player[];
}
