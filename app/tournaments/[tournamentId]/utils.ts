import _ from "lodash";
import { Result } from "./GamesCard";

type Game = {
  tournament_id: string;
  player_white_id: string;
  player_black_id: string;
  round: number;
  result?: Result;
};

export const rankParticipantsByPoints = (
  participants: any[],
  previousGames: Game[]
): Array<{ id: string; points: number }> => {
  return _.orderBy(
    participants.map((participant) => {
      let wins = 0;
      let losses = 0;
      let draws = 0;
      previousGames
        .filter(
          (game) =>
            game.player_white_id === participant.profile_id ||
            game.player_black_id === participant.profile_id
        )
        .forEach((game) => {
          if (game.player_white_id === participant.profile_id) {
            if (game.result === "WHITE_WINS") {
              wins++;
            } else if (game.result === "BLACK_WINS") {
              losses++;
            } else if (game.result === "DRAW") {
              draws++;
            }
          }
          if (game.player_black_id === participant.profile_id) {
            if (game.result === "BLACK_WINS") {
              wins++;
            } else if (game.result === "WHITE_WINS") {
              losses++;
            } else if (game.result === "DRAW") {
              draws++;
            }
          }
        });
      return { id: participant.profile_id, points: wins + draws * 0.5 };
    }),
    ["points", "id"],
    ["desc", "asc"]
  );
};

const isNumberOfParticipantsUneven = (participants: any[]) => {
  return participants.length % 2 === 1;
};

export const getLuckyParticipantId = (
  participants: any[],
  previousGames: Game[]
) => {
  const rank = rankParticipantsByPoints(participants, previousGames);
  return _.last(rank).id;
};

const hasAlreadyPlayedAgainst = (
  participantId: string,
  opponentId: string,
  previousGames: Game[]
) => {
  return previousGames.some((game) => {
    return (
      (game.player_white_id === participantId &&
        game.player_black_id === opponentId) ||
      (game.player_black_id === participantId &&
        game.player_white_id === opponentId)
    );
  });
};

const isRoundStillValid = (
  gamesInRound: Game[],
  participants: any[],
  participantAId: string,
  participantBId: string,
  previousGames: Game[]
) => {
  const remainingParticipants = participants
    .filter((p) => !hasGameInRound(p.profile_id, gamesInRound))
    .filter((p) => p.profile_id !== participantAId)
    .filter((p) => p.profile_id !== participantBId);

  // remainingParticipants should always be of even length
  const expectedNumberOfGames = remainingParticipants.length / 2;

  // console.log({
  //   gamesInRound,
  //   participantAId,
  //   participantBId,
  //   previousGames,
  //   remainingParticipants,
  //   expectedNumberOfGames,
  // });

  let allValidPairs: Array<Array<string>> = [];
  for (let i = 0; i < remainingParticipants.length; i++) {
    const participant1 = remainingParticipants[i];
    for (let j = 0; j < remainingParticipants.length; j++) {
      const participant2 = remainingParticipants[j];
      if (participant1.profile_id === participant2.profile_id) {
        continue;
      }
      const haveAlreadyPlayedAgainstEachOther = hasAlreadyPlayedAgainst(
        participant1.profile_id,
        participant2.profile_id,
        previousGames
      );
      if (haveAlreadyPlayedAgainstEachOther) {
        continue;
      }
      const isAlreadyPresent = allValidPairs.some(
        (pair) =>
          pair.includes(participant1.profile_id) &&
          pair.includes(participant2.profile_id)
      );
      if (isAlreadyPresent) {
        continue;
      }
      allValidPairs.push([participant1.profile_id, participant2.profile_id]);
    }
  }

  // console.log({ allValidPairs });

  if (allValidPairs.length < expectedNumberOfGames) {
    return false;
  }

  for (let i = 0; i < allValidPairs.length; i++) {
    const pairA = allValidPairs[i];
    const [participantA1, participantA2] = pairA;

    if (participantA1 === participantA2) {
      continue;
    }

    let validRound: Array<Array<string>> = [];
    validRound.push(pairA);

    if (validRound.length === expectedNumberOfGames) {
      return true;
    }

    for (let j = 0; j < allValidPairs.length; j++) {
      const pairB = allValidPairs[j];
      const [participantB1, participantB2] = pairB;

      if (participantB1 === participantB2) {
        continue;
      }
      const participantB1IsPresentInRound = validRound.some((pair) =>
        pair.includes(participantB1)
      );
      if (participantB1IsPresentInRound) {
        continue;
      }
      const participantB2IsPresentInRound = validRound.some((pair) =>
        pair.includes(participantB2)
      );
      if (participantB2IsPresentInRound) {
        continue;
      }
      validRound.push(pairB);
      if (validRound.length === expectedNumberOfGames) {
        return true;
      }
    }
  }

  return false;
};

const hasGameInRound = (participantId: string, gamesInRound: Game[]) => {
  return gamesInRound.some((game) => {
    return (
      game.player_white_id === participantId ||
      game.player_black_id === participantId
    );
  });
};

const participantIdsWithGameInRound = (gamesInRound: Game[]) => {
  return gamesInRound.flatMap((g) => [g.player_white_id, g.player_black_id]);
};

const getWhiteBlackForParticipants = (
  participantAId: string,
  participantBId: string,
  previousGames: Game[]
) => {
  const numberOfTimesWhiteA = previousGames.filter(
    (g) => g.player_white_id === participantAId
  ).length;
  const numberOfTimesWhiteB = previousGames.filter(
    (g) => g.player_white_id === participantBId
  ).length;
  if (numberOfTimesWhiteA < numberOfTimesWhiteB) {
    return { white: participantAId, black: participantBId };
  } else if (numberOfTimesWhiteA > numberOfTimesWhiteB) {
    return { white: participantBId, black: participantAId };
  } else {
    return { white: participantAId, black: participantBId };
  }
};

export const buildGamesForRound = (
  participants: any[],
  previousGames: Game[],
  tournamentId: string,
  round: number
) => {
  let gamesInRound: Game[] = [];

  // Add lucky game
  if (isNumberOfParticipantsUneven(participants)) {
    const luckyParticipantId = getLuckyParticipantId(
      participants,
      previousGames
    );
    const game: Game = {
      tournament_id: tournamentId,
      round: round,
      player_white_id: luckyParticipantId,
      player_black_id: luckyParticipantId,
      result: "WHITE_WINS",
    };
    gamesInRound.push(game);
  }

  // Add other games
  while (
    participantIdsWithGameInRound(gamesInRound).length < participants.length
  ) {
    const remainingParticipants = participants.filter(
      (participant) => !hasGameInRound(participant.profile_id, gamesInRound)
    );
    const rank = rankParticipantsByPoints(remainingParticipants, previousGames);

    const currentParticipantId = _.last(rank).id;
    let opponentParticipantId;

    let rankCopy = Array.from(rank);
    rankCopy.reverse();
    rankCopy.shift();
    const candidateIds = rankCopy.map((participant) => participant.id);
    let currentCandidateIndex = 0;

    while (currentCandidateIndex < candidateIds.length) {
      const currentCandidateId = candidateIds[currentCandidateIndex];

      if (currentCandidateIndex === candidateIds.length - 1) {
        opponentParticipantId = currentCandidateId;
        break;
      }

      if (
        !hasAlreadyPlayedAgainst(
          currentParticipantId,
          currentCandidateId,
          previousGames
        )
      ) {
        if (
          isRoundStillValid(
            gamesInRound,
            participants,
            currentParticipantId,
            currentCandidateId,
            previousGames
          )
        ) {
          opponentParticipantId = currentCandidateId;
          break;
        }
      }

      currentCandidateIndex++;
    }

    const { white, black } = getWhiteBlackForParticipants(
      currentParticipantId,
      opponentParticipantId,
      previousGames
    );
    const game: Game = {
      tournament_id: tournamentId,
      round: round,
      player_white_id: white,
      player_black_id: black,
    };
    gamesInRound.push(game);
  }
  return gamesInRound;
};
