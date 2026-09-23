import { type CourseEntity, type HoleEntity } from "../models/entities";
import { type Course } from "../models/course";
import Database = require("better-sqlite3");

class CourseService {
  constructor(private readonly db: Database.Database) {}

  getCourseById(courseId: number): Course | undefined {
    const courseStatement = this.db.prepare<[number], CourseEntity>(
      "SELECT * FROM Courses WHERE Course_ID = ?",
    );
    const holesStatement = this.db.prepare<[number], HoleEntity>(
      "SELECT * FROM Holes WHERE Course_ID = ?",
    );
    const courseRow = courseStatement.get(courseId);
    const holes = holesStatement.all(courseId);

    if (courseRow) {
      return {
        id: courseRow.Course_ID,
        name: courseRow.Name,
        par: courseRow.Par,
        holes: holes.map((hole) => ({
          number: hole.Number,
          handicap: hole.Handicap,
          par: hole.Par,
        })),
      };
    }
    return undefined;
  }
}
export = CourseService;
