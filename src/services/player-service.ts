import { type Player } from "../models/player";
import playerData = require("../../data/static-data/players");

class PlayerService {
  getPlayerByName(name: string): Player | undefined {
    const fullNameTrimmed = name.trim().toLowerCase();

    const player = playerData.find(
      (player) => player.fullName.trim().toLowerCase() === fullNameTrimmed,
    );
    if (player) return player;

    return undefined;
  }
}

export = PlayerService;
