import { type Round } from "./models/round";
import { type Course } from "./models/course";

class ScoreCalculator {
  getGrossScore(round: Round): number {
    return round.scores.reduce((sumTotal, score) => {
      return sumTotal + score;
    }, 0);
  }

  getNetScore(round: Round, course: Course): number {}
}

export = ScoreCalculator;
