"use client";

import _ from "lodash";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingIcon from "~components/LoadingIcon";
import clsx from "clsx";
import { buildGamesForRound } from "./utils";
import useProfile from "~hooks/useProfile";
import { isAdmin } from "~supabase/utils";

export type Result = "WHITE_WINS" | "BLACK_WINS" | "DRAW";
export type Game = {
  id: string;
  tournament_id: string;
  player_white_id: string;
  player_black_id: string;
  round: number;
  result?: Result;
};

type Props = {
  games: Game[];
  participants: any;
  tournament: any;
};
export default function GamesCard(props: Props) {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { profile, user } = useProfile();
  const [isStartingTournament, setIsStartingTournament] = useState(false);
  const [isGeneratingNextRound, setIsGeneratingNextRound] = useState(false);

  const currentRound = _.max(props.games.map((game) => game.round));

  const startTournament = async () => {
    setIsStartingTournament(true);
    const games = buildGamesForRound(
      props.participants,
      props.games,
      props.tournament.id,
      1
    );
    await supabaseClient.from("games").insert(games);
    router.refresh();
    setIsStartingTournament(false);
  };

  const canGenerateNextRound = () => {
    if (props.games.map((game) => game.result !== null).includes(false)) {
      return false;
    }
    return _.max(props.games.map((game) => game.round)) < 5;
  };

  const generateNextRound = async () => {
    setIsGeneratingNextRound(true);
    const round = _.max(props.games.map((game) => game.round)) + 1;
    const games = buildGamesForRound(
      props.participants,
      props.games,
      props.tournament.id,
      round
    );
    await supabaseClient.from("games").insert(games);
    await router.refresh();
    setIsGeneratingNextRound(false);
  };

  const isAdminUser = user && isAdmin(user);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-primary-700 bg-primary-800 p-4">
      <h3 className="uppercase tracking-wider text-primary-400">Spiele</h3>
      {props.games.length === 0 && (
        <div className="flex flex-row justify-start">
          <button
            className="flex items-center justify-center gap-3 rounded border border-primary-600 bg-primary-700 p-3 text-lg font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200"
            onClick={startTournament}
            disabled={!isAdminUser || isStartingTournament}
          >
            {isStartingTournament && <LoadingIcon className="size-5" />}
            <span>Turnier starten</span>
          </button>
        </div>
      )}
      {props.games.length > 0 && (
        <div className="flex flex-col gap-2">
          {_.orderBy(props.games, ["round", "id"]).map((game) => {
            return (
              <Game
                key={game.id}
                game={game}
                currentRound={currentRound}
                isAdmin={isAdminUser}
                isPlayer={
                  profile &&
                  (game.player_white_id === profile.id ||
                    game.player_black_id === profile.id)
                }
              />
            );
          })}
          {canGenerateNextRound() && (
            <div>
              <button
                className="mt-2 flex items-center justify-center gap-3 rounded border border-primary-600 bg-primary-700 p-3 text-lg font-medium text-primary-100 transition hover:bg-primary-800 hover:text-primary-200"
                onClick={generateNextRound}
                disabled={!isAdminUser || isGeneratingNextRound}
              >
                {isGeneratingNextRound && <LoadingIcon className="size-5" />}
                <span>Nächste Runde generieren</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const Game = ({
  game,
  currentRound,
  isAdmin,
  isPlayer,
}: {
  game: Game;
  currentRound: number;
  isAdmin: boolean;
  isPlayer: boolean;
}) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [isUpdatingGame, setIsUpdatingGame] = useState(false);

  const updateResult = async (gameId: string, result: Result) => {
    setIsUpdatingGame(true);
    await supabaseClient.from("games").update({ result }).eq("id", gameId);
    router.refresh();
    setIsUpdatingGame(false);
  };

  const canUpdateGame = isAdmin || isPlayer;
  const isRoundPlayed = game.round < currentRound;
  const isDisabled = isRoundPlayed || isUpdatingGame || !canUpdateGame;

  return (
    <div
      key={game.id}
      className={clsx(
        "grid grid-cols-12",
        isDisabled ? "text-primary-400" : "text-primary-100"
      )}
    >
      <div className="col-span-1 flex items-center">{game.round}</div>
      <div className="col-span-4 flex items-center">
        {game.player_white.username}
      </div>
      <div className="col-span-4 flex items-center">
        {game.player_black.username}
      </div>
      <div className="col-span-3 flex items-center">
        <select
          name="result"
          className={clsx(
            "truncate rounded border border-primary-700 p-2 opacity-100 enabled:bg-primary-900 enabled:text-primary-100 enabled:hover:border-primary-600 disabled:cursor-not-allowed disabled:bg-primary-800 disabled:text-primary-400"
          )}
          onChange={(e) => updateResult(game.id, e.target.value as Result)}
          disabled={isDisabled}
        >
          <option value="" disabled selected={game.result === null}>
            Ergebnis
          </option>
          <option value="WHITE_WINS" selected={game.result === "WHITE_WINS"}>
            Weiß
          </option>
          <option value="BLACK_WINS" selected={game.result === "BLACK_WINS"}>
            Schwarz
          </option>
          <option value="DRAW" selected={game.result === "DRAW"}>
            Remis
          </option>
        </select>
      </div>
    </div>
  );
};
