"use client";

import _ from "lodash";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Field } from "formik";

type Result = "WHITE_WINS" | "BLACK_WINS" | "DRAW";
type Game = {
  tournament_id: string;
  player_white_id: string;
  player_black_id: string;
  result: Result | null;
  round: number;
};

type Props = {
  games: any;
  participants: any;
  tournament: any;
};
export default function GamesCard(props: Props) {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  // const rounds = _.groupBy(props.games, "round");

  const startTournament = async () => {
    if (props.participants.length % 2 !== 0) {
      throw Error("Unsupported");
    }
    const participants = _.shuffle(props.participants);
    const numberOfGames = participants.length / 2;
    let games = [];
    for (let i = 0; i < numberOfGames; i++) {
      const game: Game = {
        tournament_id: props.tournament.id,
        round: 1,
        player_white_id: participants[2 * i].profile_id,
        player_black_id: participants[2 * i + 1].profile_id,
      };
      games.push(game);
    }
    await supabaseClient.from("games").insert(games);
    router.refresh();
  };

  const updateResult = async (gameId: string, result: Result) => {
    await supabaseClient.from("games").update({ result }).eq("id", gameId);
    router.refresh();
  };

  const generateNextRound = () => {
    const participantsResults = props.participants.map((participant) => {
      const games = props.games.filter(
        (game) =>
          game.player_white_id === participant.profile_id ||
          game.player_black_id === participant.profile_id
      );
      let wins = 0;
      let losses = 0;
      let draws = 0;
      games.forEach((game) => {
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
      return { id: participant.profile_id, results: { wins, losses, draws } };
    });
    // create buckets from points
    // put each participant in respective bucket
    // start with last bucket (lowest points)
    // create games
  };

  const canGenerateNextRound = !props.games
    .map((game) => game.result !== null)
    .includes(false);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-primary-700 bg-primary-800 p-4">
      <h3 className="uppercase tracking-wider text-primary-400">Games</h3>
      {props.games.length === 0 ? (
        <div className="flex flex-row justify-center">
          <button
            className="flex items-center justify-center gap-3 rounded border border-primary-600 bg-primary-700 p-3 text-lg font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200"
            onClick={startTournament}
          >
            <span>Turnier starten</span>
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {props.games.map((game) => {
              return (
                <div
                  key={game.id}
                  className="grid grid-cols-12 text-primary-200"
                >
                  <div className="col-span-4 flex items-center">
                    {game.player_white.username}
                  </div>
                  <div className="col-span-4 flex items-center">
                    {game.player_black.username}
                  </div>
                  <div className="col-span-4 flex items-center">
                    <select
                      name="result"
                      className="truncate rounded border border-primary-700 bg-primary-900 p-2 text-primary-100 hover:border-primary-600"
                      onChange={(e) =>
                        updateResult(game.id, e.target.value as Result)
                      }
                    >
                      <option value="" disabled selected={game.result === null}>
                        Ergebnis
                      </option>
                      <option
                        value="WHITE_WINS"
                        selected={game.result === "WHITE_WINS"}
                      >
                        Weiß gewinnt
                      </option>
                      <option
                        value="BLACK_WINS"
                        selected={game.result === "BLACK_WINS"}
                      >
                        Schwarz gewinnt
                      </option>
                      <option value="DRAW" selected={game.result === "DRAW"}>
                        Unentschieden
                      </option>
                    </select>
                  </div>
                </div>
              );
            })}
            {canGenerateNextRound && (
              <div>
                <button
                  className="mt-2 flex items-center justify-center gap-3 rounded border border-primary-600 bg-primary-700 p-3 text-lg font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200"
                  onClick={generateNextRound}
                >
                  <span>Nächste Runde generieren</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
