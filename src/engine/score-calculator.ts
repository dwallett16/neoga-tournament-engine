import { type PlayerRound } from "../models/player-round";
import { type Course } from "../models/course";

class ScoreCalculator {
  getGrossScore(round: PlayerRound): number {
    return round.scores.reduce((sumTotal, score) => {
      return sumTotal + score;
    }, 0);
  }

  getNetScore(round: PlayerRound): number {
    const grossScore = this.getGrossScore(round);
    return grossScore - round.player.handicap;
  }

  getNetScoreDescription(round: PlayerRound, course: Course): string {
    const netScore = this.getNetScore(round);
    const scoreDifference = netScore - course.par;
    const plusOrMinus = scoreDifference > 0 ? "+" : "";
    return `${plusOrMinus}${scoreDifference}`;
  }
}

export = ScoreCalculator;
