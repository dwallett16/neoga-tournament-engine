import { type Player } from "../models/player";
import { type PlayerEntity } from "../models/entities";
import Database = require("better-sqlite3");

class PlayerService {
  constructor(private readonly db: Database.Database) {}

  getPlayerByName(name: string): Player | undefined {
    const fullNameTrimmed = name.trim().toLowerCase();

    const statement = this.db.prepare<[string], PlayerEntity>(
      "SELECT * FROM Players WHERE LOWER(Fullname) = ?",
    );
    const playerRow = statement.get(fullNameTrimmed);

    if (playerRow) {
      return {
        id: playerRow.Player_ID,
        fullName: playerRow.Fullname,
        handicap: playerRow.Handicap,
      };
    }

    return undefined;
  }
}

export = PlayerService;
