import { type PlayerScoreEntity } from "./models/entities";
import { type Round } from "./models/round";
import ScoreCalculator = require("./score-calculator");
import PlayerService = require("./services/player-service");
import CourseService = require("./services/course-service");
const numberOfRounds = 4;
const playerService = new PlayerService();
const courseService = new CourseService();
const scoreCalculator = new ScoreCalculator();
const xlsxReader = require("xlsx");

const workbook = xlsxReader.readFile("data/tournamentScores.xlsx");
const course = courseService.getCourseById(1);
if (!course) throw new Error("Course with ID 1 not found in the database.");

for (var i = 1; i <= numberOfRounds; i++) {
  console.log(`Round ${i}:`);
  const sheetName = workbook.SheetNames[i - 1];
  const worksheet = workbook.Sheets[sheetName];
  const playerScoreEntities = xlsxReader.utils.sheet_to_json(
    worksheet,
  ) as PlayerScoreEntity[];

  for (const playerScoreEntity of playerScoreEntities) {
    const currentPlayer = playerService.getPlayerByName(
      playerScoreEntity.Player,
    );
    if (currentPlayer) {
      const round: Round = {
        number: i,
        player: currentPlayer,
        scores: getHoleScores(playerScoreEntity),
      };
      const grossScore = scoreCalculator.getGrossScore(round);

      console.log(
        `Player: ${currentPlayer.fullName}, Gross Score: ${grossScore} Net Score: ${scoreCalculator.getNetScoreDescription(round, course)}`,
      );
    }
  }
}

function getHoleScores(playerScoreEntity: PlayerScoreEntity): number[] {
  return Array.from(
    { length: 18 },
    (value, i) =>
      playerScoreEntity[`Hole ${i + 1}` as keyof PlayerScoreEntity] as number,
  );
}
