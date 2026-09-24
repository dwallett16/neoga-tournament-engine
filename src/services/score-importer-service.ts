import { type PlayerScoreSpreadsheetEntity } from "../models/entities";
import { type PlayerRound } from "../models/player-round";
import Database = require("better-sqlite3");
import PlayerService = require("./player-service");

class ScoreImporterService {
  private readonly NUM_WORKSHEETS = 4;
  private readonly xlsxReader: any;
  private readonly workbook: any;
  private readonly playerService: PlayerService;

  constructor(private readonly db: Database.Database) {
    this.xlsxReader = require("xlsx");
    this.workbook = this.xlsxReader.readFile("data/tournamentScores.xlsx");
    this.playerService = new PlayerService(this.db);
  }

  getRoundScoresFromExcel(): PlayerRound[] {
    const rounds: PlayerRound[] = [];
    for (var i = 1; i <= this.NUM_WORKSHEETS; i++) {
      const activeSheetName = this.workbook.SheetNames[i - 1];
      const worksheet = this.workbook.Sheets[activeSheetName];
      const playerScoreEntities = this.xlsxReader.utils.sheet_to_json(
        worksheet,
      ) as PlayerScoreSpreadsheetEntity[];

      for (const playerScoreEntity of playerScoreEntities) {
        const currentPlayer = this.playerService.getPlayerByName(
          playerScoreEntity.Player,
        );
        if (currentPlayer) {
          const round: PlayerRound = {
            number: i,
            player: currentPlayer,
            scores: this.getHoleScoresFromSpreadsheet(playerScoreEntity),
          };
          rounds.push(round);
        }
      }
    }
    return rounds;
  }

  private getHoleScoresFromSpreadsheet(
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
}
export = ScoreImporterService;
