import { type PlayerScoreSpreadsheetEntity } from "./models/entities";
import { type Round } from "./models/round";
import ScoreCalculator = require("./score-calculator");
import PlayerService = require("./services/player-service");
import CourseService = require("./services/course-service");
import Database = require("better-sqlite3");

const xlsxReader = require("xlsx");
const db = initializeDatabase();
const playerService = new PlayerService(db);
const courseService = new CourseService(db);
const scoreCalculator = new ScoreCalculator();

const NUM_ROUNDS = 4;
const COURSE_ID = 1;

const workbook = xlsxReader.readFile("data/tournamentScores.xlsx");
const course = courseService.getCourseById(COURSE_ID);
if (!course)
  throw new Error(`Course with ID ${COURSE_ID} not found in the database.`);

for (var i = 1; i <= NUM_ROUNDS; i++) {
  console.log(`Round ${i}:`);
  const sheetName = workbook.SheetNames[i - 1];
  const worksheet = workbook.Sheets[sheetName];
  const playerScoreEntities = xlsxReader.utils.sheet_to_json(
    worksheet,
  ) as PlayerScoreSpreadsheetEntity[];

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

function getHoleScores(
  playerScoreEntity: PlayerScoreSpreadsheetEntity,
): number[] {
  return Array.from(
    { length: 18 },
    (value, i) =>
      playerScoreEntity[
        `Hole ${i + 1}` as keyof PlayerScoreSpreadsheetEntity
      ] as number,
  );
}

function initializeDatabase(): Database.Database {
  const db = new Database("data/neogaTournament.db");

  db.exec(`
  CREATE TABLE IF NOT EXISTS "Courses" (
    "Course_ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Par" INTEGER NOT NULL
  )
`);

  db.exec(`
  CREATE TABLE IF NOT EXISTS "Holes" (
    "Number" INTEGER NOT NULL,
    "Handicap" INTEGER NOT NULL,
    "Par" INTEGER NOT NULL,
    "Course_ID" INTEGER NOT NULL,
    FOREIGN KEY ("Course_ID") REFERENCES "Courses"("Course_ID")
  )
`);

  db.exec(`
  CREATE TABLE IF NOT EXISTS "Players" (
    "Player_ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Fullname" TEXT,
    "Handicap" INTEGER
  )
`);

  return db;
}
