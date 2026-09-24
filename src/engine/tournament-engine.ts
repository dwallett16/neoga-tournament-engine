import { type PlayerRound } from "../models/player-round";
import { type Course } from "../models/course";
import ScoreCalculator = require("./score-calculator");
import { type Player, type TwoManEntry } from "../models/player";

class TournamentEngineService {
  private readonly scoreCalculator: ScoreCalculator = new ScoreCalculator();

  constructor(private readonly course: Course) {}

  printScoresFromRound(playerRounds: PlayerRound[]) {
    let previousRoundNumber = playerRounds[0]?.number;
    for (const round of playerRounds) {
      if (round.number !== previousRoundNumber) {
        previousRoundNumber = round.number;
        console.log(`\nRound ${round.number} Scores:`);
      }

      const currentPlayer = round.player;
      const grossScore = this.scoreCalculator.getGrossScoreFromRound(round);
      console.log(
        `Player: ${currentPlayer.fullName}, Gross Score: ${grossScore} Net Score: ${this.scoreCalculator.getNetScoreDescription(round, this.course)}`,
      );
    }
  }

  printTwoManResults(twoManEntries: TwoManEntry[]) {
    const results = this.scoreCalculator
      .calculateTwoManNetScores(twoManEntries)
      .sort(
        (firstResult, secondResult) =>
          this.scoreCalculator.getGrossScore(firstResult.combinedScore) -
          this.scoreCalculator.getGrossScore(secondResult.combinedScore),
      );

    for (const result of results) {
      console.log(
        `${result.team[0]?.fullName}/${result.team[1]?.fullName}: ${this.scoreCalculator.getGrossScore(result.combinedScore)} (${this.scoreCalculator.getGrossScore(result.combinedScore) - this.course.par * 4})`,
      );
    }
  }
}
export = TournamentEngineService;
