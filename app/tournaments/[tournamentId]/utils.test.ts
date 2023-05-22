import { describe, expect, it } from "@jest/globals";
import {
  getLuckyParticipantId,
  buildGamesForRound,
  rankParticipantsByPoints,
} from "./utils.ts";
import { Result } from "arg";

describe("utils/getLuckyParticipantId", () => {
  it("first round", () => {
    const participants = [
      { profile_id: "PB" },
      { profile_id: "PE" },
      { profile_id: "PA" },
      { profile_id: "PF" },
      { profile_id: "PC" },
      { profile_id: "PG" },
      { profile_id: "PD" },
    ];
    const games = [];

    expect(getLuckyParticipantId(participants, games)).toBe("PG");
  });

  it("next round", () => {
    const participants = [
      { profile_id: "PB" },
      { profile_id: "PE" },
      { profile_id: "PA" },
      { profile_id: "PF" },
      { profile_id: "PC" },
      { profile_id: "PG" },
      { profile_id: "PD" },
    ];
    const games = [
      {
        player_white_id: "PG",
        player_black_id: "PG",
        result: "WHITE_WINS",
        round: 1,
      },
      {
        player_white_id: "PF",
        player_black_id: "PE",
        result: "WHITE_WINS",
        round: 1,
      },
      {
        player_white_id: "PD",
        player_black_id: "PC",
        result: "WHITE_WINS",
        round: 1,
      },
      {
        player_white_id: "PB",
        player_black_id: "PA",
        result: "WHITE_WINS",
        round: 1,
      },
    ];

    expect(getLuckyParticipantId(participants, games)).toBe("PE");
  });
});

describe("utils/buildGamesForRound", () => {
  it("1. round", () => {
    const tournamentId = "TA";
    const participants = [
      { profile_id: "PB" },
      { profile_id: "PE" },
      { profile_id: "PA" },
      { profile_id: "PF" },
      { profile_id: "PC" },
      { profile_id: "PG" },
      { profile_id: "PD" },
    ];
    const previousGames = [];

    const round = 1;
    const gamesInRound = buildGamesForRound(
      participants,
      previousGames,
      tournamentId,
      round
    );
    expect(gamesInRound).toContainEqual(
      game(tournamentId, 1, "PG", "PG", "WHITE_WINS")
    );
    expect(gamesInRound).toContainEqual(game(tournamentId, 1, "PF", "PE"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 1, "PD", "PC"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 1, "PB", "PA"));
  });

  it("2. round", () => {
    const tournamentId = "TA";
    const participants = [
      { profile_id: "PB" },
      { profile_id: "PE" },
      { profile_id: "PA" },
      { profile_id: "PF" },
      { profile_id: "PC" },
      { profile_id: "PG" },
      { profile_id: "PD" },
    ];
    const previousGames = [
      game(tournamentId, 1, "PG", "PG", "WHITE_WINS"),
      game(tournamentId, 1, "PF", "PE", "WHITE_WINS"),
      game(tournamentId, 1, "PD", "PC", "BLACK_WINS"),
      game(tournamentId, 1, "PB", "PA", "WHITE_WINS"),
    ];
    const rank = rankParticipantsByPoints(participants, previousGames);

    const gamesInRound = buildGamesForRound(
      participants,
      previousGames,
      tournamentId,
      2
    );
    expect(gamesInRound).toContainEqual(
      game(tournamentId, 2, "PE", "PE", "WHITE_WINS")
    );
    expect(gamesInRound).toContainEqual(game(tournamentId, 2, "PA", "PD"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 2, "PG", "PF"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 2, "PC", "PB"));
  });

  it("3. round", () => {
    const tournamentId = "TA";
    const participants = [
      { profile_id: "PB" },
      { profile_id: "PE" },
      { profile_id: "PA" },
      { profile_id: "PF" },
      { profile_id: "PC" },
      { profile_id: "PG" },
      { profile_id: "PD" },
    ];
    const previousGames = [
      // 1. round
      game(tournamentId, 1, "PG", "PG", "WHITE_WINS"), // lucky one
      game(tournamentId, 1, "PF", "PE", "WHITE_WINS"),
      game(tournamentId, 1, "PD", "PC", "BLACK_WINS"),
      game(tournamentId, 1, "PB", "PA", "WHITE_WINS"),
      // 2. round
      game(tournamentId, 2, "PE", "PE", "WHITE_WINS"), // lucky one
      game(tournamentId, 2, "PA", "PD", "DRAW"),
      game(tournamentId, 2, "PG", "PF", "WHITE_WINS"),
      game(tournamentId, 2, "PC", "PB", "BLACK_WINS"),
    ];
    const rank = rankParticipantsByPoints(participants, previousGames);

    const gamesInRound = buildGamesForRound(
      participants,
      previousGames,
      tournamentId,
      3
    );
    expect(gamesInRound).toContainEqual(
      game(tournamentId, 3, "PD", "PD", "WHITE_WINS")
    );
    expect(gamesInRound).toContainEqual(game(tournamentId, 3, "PA", "PF"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 3, "PE", "PC"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 3, "PB", "PG"));
  });

  it("4. round", () => {
    const tournamentId = "TA";
    const participants = [
      { profile_id: "PB" },
      { profile_id: "PE" },
      { profile_id: "PA" },
      { profile_id: "PF" },
      { profile_id: "PC" },
      { profile_id: "PG" },
      { profile_id: "PD" },
    ];
    const previousGames = [
      // 1. round
      game(tournamentId, 1, "PG", "PG", "WHITE_WINS"), // lucky one
      game(tournamentId, 1, "PF", "PE", "WHITE_WINS"),
      game(tournamentId, 1, "PD", "PC", "BLACK_WINS"),
      game(tournamentId, 1, "PB", "PA", "WHITE_WINS"),
      // 2. round
      game(tournamentId, 2, "PE", "PE", "WHITE_WINS"), // lucky one
      game(tournamentId, 2, "PA", "PD", "DRAW"),
      game(tournamentId, 2, "PG", "PF", "WHITE_WINS"),
      game(tournamentId, 2, "PC", "PB", "BLACK_WINS"),
      // 3. round
      game(tournamentId, 3, "PD", "PD", "WHITE_WINS"),
      game(tournamentId, 3, "PA", "PF", "BLACK_WINS"),
      game(tournamentId, 3, "PE", "PC", "WHITE_WINS"),
      game(tournamentId, 3, "PB", "PG", "BLACK_WINS"),
    ];
    const rank = rankParticipantsByPoints(participants, previousGames);

    const gamesInRound = buildGamesForRound(
      participants,
      previousGames,
      tournamentId,
      4
    );
    expect(gamesInRound).toContainEqual(
      game(tournamentId, 4, "PA", "PA", "WHITE_WINS")
    );
    expect(gamesInRound).toContainEqual(game(tournamentId, 4, "PC", "PF"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 4, "PD", "PB"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 4, "PE", "PG"));
  });

  it("5. round", () => {
    const tournamentId = "TA";
    const participants = [
      { profile_id: "PB" },
      { profile_id: "PE" },
      { profile_id: "PA" },
      { profile_id: "PF" },
      { profile_id: "PC" },
      { profile_id: "PG" },
      { profile_id: "PD" },
    ];
    const previousGames = [
      // 1. round
      game(tournamentId, 1, "PG", "PG", "WHITE_WINS"), // lucky one
      game(tournamentId, 1, "PF", "PE", "WHITE_WINS"),
      game(tournamentId, 1, "PD", "PC", "BLACK_WINS"),
      game(tournamentId, 1, "PB", "PA", "WHITE_WINS"),
      // 2. round
      game(tournamentId, 2, "PE", "PE", "WHITE_WINS"), // lucky one
      game(tournamentId, 2, "PA", "PD", "DRAW"),
      game(tournamentId, 2, "PG", "PF", "WHITE_WINS"),
      game(tournamentId, 2, "PC", "PB", "BLACK_WINS"),
      // 3. round
      game(tournamentId, 3, "PD", "PD", "WHITE_WINS"),
      game(tournamentId, 3, "PA", "PF", "BLACK_WINS"),
      game(tournamentId, 3, "PE", "PC", "WHITE_WINS"),
      game(tournamentId, 3, "PB", "PG", "BLACK_WINS"),
      // 4. round
      game(tournamentId, 4, "PA", "PA", "WHITE_WINS"),
      game(tournamentId, 4, "PC", "PF", "BLACK_WINS"),
      game(tournamentId, 4, "PD", "PB", "WHITE_WINS"),
      game(tournamentId, 4, "PE", "PG", "BLACK_WINS"),
    ];
    const rank = rankParticipantsByPoints(participants, previousGames);
    console.log({ rank });

    const gamesInRound = buildGamesForRound(
      participants,
      previousGames,
      tournamentId,
      4
    );
    expect(gamesInRound).toContainEqual(
      game(tournamentId, 4, "PC", "PC", "WHITE_WINS")
    );
    expect(gamesInRound).toContainEqual(game(tournamentId, 4, "PA", "PE"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 4, "PF", "PB"));
    expect(gamesInRound).toContainEqual(game(tournamentId, 4, "PG", "PD"));
  });
});

const game = (
  tournamentId: string,
  round: number,
  playerWhiteId: string,
  playerBlackId: string,
  result?: Result
) => ({
  tournament_id: tournamentId,
  round,
  player_white_id: playerWhiteId,
  player_black_id: playerBlackId,
  result,
});
