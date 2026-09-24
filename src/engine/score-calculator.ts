import { type PlayerRound } from "../models/player-round";
import { type Course } from "../models/course";
import {
  type Player,
  type TwoManEntry,
  type TwoManEntryResult,
} from "../models/player";

class ScoreCalculator {
  getGrossScoreFromRound(round: PlayerRound): number {
    return round.scores.reduce((sumTotal, score) => {
      return sumTotal + score;
    }, 0);
  }

  getGrossScore(scores: number[]): number {
    return scores.reduce((sumTotal, score) => {
      return sumTotal + score;
    }, 0);
  }

  getNetScore(round: PlayerRound): number {
    const grossScore = this.getGrossScoreFromRound(round);
    return grossScore - round.player.handicap;
  }

  calculateTwoManNetScores(twoManEntries: TwoManEntry[]): TwoManEntryResult[] {
    let results: TwoManEntryResult[] = [];
    for (const entry of twoManEntries) {
      if (entry.team.length !== 2)
        throw new Error("Invalid Two Man team length!");

      const firstPlayer = entry.team[0]!;
      const secondPlayer = entry.team[1]!;
      const combinedScores: number[] = [];

      for (let roundNumber = 1; roundNumber <= 4; roundNumber++) {
        const firstPlayerRound = entry.teamRounds.find(
          (round) =>
            round.player.id === firstPlayer.id && round.number === roundNumber,
        );
        const secondPlayerRound = entry.teamRounds.find(
          (round) =>
            round.player.id === secondPlayer.id && round.number === roundNumber,
        );

        if (!firstPlayerRound || !secondPlayerRound) {
          throw new Error(`Missing player round ${roundNumber}!`);
        }

        firstPlayerRound.scores.forEach((firstScore, index) => {
          const secondScore = secondPlayerRound.scores[index]!;
          combinedScores.push(Math.min(firstScore, secondScore));
        });
      }

      let twoManResult: TwoManEntryResult = {
        team: [firstPlayer, secondPlayer],
        combinedScore: combinedScores,
      };
      results.push(twoManResult);
    }
    return results;
  }

  getNetScoreDescription(round: PlayerRound, course: Course): string {
    const netScore = this.getNetScore(round);
    const scoreDifference = netScore - course.par;
    const plusOrMinus = scoreDifference > 0 ? "+" : "";
    return `${plusOrMinus}${scoreDifference}`;
  }
}

export = ScoreCalculator;
