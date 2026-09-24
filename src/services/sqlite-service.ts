import Database = require("better-sqlite3");

class SqliteService {
  initializeDatabase(): Database.Database {
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
}
export = SqliteService;
