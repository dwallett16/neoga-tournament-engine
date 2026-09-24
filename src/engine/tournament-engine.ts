import { type PlayerRound } from "../models/player-round";
import { type Course } from "../models/course";
import ScoreCalculator = require("./score-calculator");

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
      const grossScore = this.scoreCalculator.getGrossScore(round);
      console.log(
        `Player: ${currentPlayer.fullName}, Gross Score: ${grossScore} Net Score: ${this.scoreCalculator.getNetScoreDescription(round, this.course)}`,
      );
    }
  }
}
export = TournamentEngineService;
