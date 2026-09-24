import SqliteService = require("./services/sqlite-service");
import CourseService = require("./services/course-service");
import ScoreImporterService = require("./services/score-importer-service");
import TournamentEngineService = require("./engine/tournament-engine");

const sqliteService = new SqliteService();
const db = sqliteService.initializeDatabase();

const COURSE_ID = 1;
const courseService = new CourseService(db);
const course = courseService.getCourseById(COURSE_ID);
if (!course)
  throw new Error(`Course with ID ${COURSE_ID} not found in the database.`);

const tournamentEngineService = new TournamentEngineService(course);
const scoreImporterService = new ScoreImporterService(db);
const roundScores = scoreImporterService.getRoundScoresFromExcel();

tournamentEngineService.printScoresFromRound(roundScores);
