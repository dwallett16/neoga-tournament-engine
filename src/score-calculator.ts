import { type Round } from "./models/round";
import { type Course } from "./models/course";

class ScoreCalculator {
  getGrossScore(round: Round): number {
    return round.scores.reduce((sumTotal, score) => {
      return sumTotal + score;
    }, 0);
  }

  getNetScore(round: Round): number {
    const grossScore = this.getGrossScore(round);
    return grossScore - round.player.handicap;
  }

  getNetScoreDescription(round: Round, course: Course): string {
    const netScore = this.getNetScore(round);
    const scoreDifference = netScore - course.par;
    const plusOrMinus = scoreDifference > 0 ? "+" : "";
    return `${plusOrMinus}${scoreDifference}`;
  }
}

export = ScoreCalculator;
