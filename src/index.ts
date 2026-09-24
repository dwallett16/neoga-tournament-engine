import SqliteService = require("./services/sqlite-service");
import CourseService = require("./services/course-service");
import ScoreImporterService = require("./services/score-importer-service");
import PlayerService = require("./services/player-service");
import TournamentEngineService = require("./engine/tournament-engine");
import type player = require("./models/player");
import type { PlayerRound } from "./models/player-round";

const sqliteService = new SqliteService();
const db = sqliteService.initializeDatabase();

const COURSE_ID = 1;
const courseService = new CourseService(db);
const course = courseService.getCourseById(COURSE_ID);
if (!course)
  throw new Error(`Course with ID ${COURSE_ID} not found in the database.`);

const tournamentEngine = new TournamentEngineService(course);
const playerService = new PlayerService(db);
const scoreImporterService = new ScoreImporterService(db);
const roundScores = scoreImporterService.getRoundScoresFromExcel();

//tournamentEngine.printScoresFromRound(roundScores);
const twoManEntries = createTestTwoManEntries(playerService, roundScores); //This would come from api
tournamentEngine.printTwoManResults(twoManEntries);

function createTestTwoManEntries(
  playerService: PlayerService,
  roundScores: PlayerRound[],
): player.TwoManEntry[] {
  const getPlayer = (name: string): player.Player => {
    const currentPlayer = playerService.getPlayerByName(name);
    if (!currentPlayer)
      throw new Error(`Player ${name} not found in the database.`);
    return currentPlayer;
  };

  const dave = getPlayer("Dave W");
  const greg = getPlayer("Greg O");
  const joe = getPlayer("Joe M");
  const chris = getPlayer("Chris W");
  const sean = getPlayer("Sean L");

  const createEntry = (
    firstPlayer: player.Player,
    secondPlayer: player.Player,
  ) => ({
    team: [firstPlayer, secondPlayer],
    teamRounds: roundScores.filter(
      (round) =>
        round.player.id === firstPlayer.id ||
        round.player.id === secondPlayer.id,
    ),
  });

  return [
    createEntry(dave, greg),
    createEntry(joe, chris),
    createEntry(sean, dave),
  ];
}
