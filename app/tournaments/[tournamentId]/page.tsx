import { format, setHours } from "date-fns";
import { de } from "date-fns/locale";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import supabase from "~supabase";
import Badge from "~components/Badge";
import AddGameForm from "./AddGameForm";

export const revalidate = 0;

type Props = {
  params: { tournamentId: string };
};
export default async function Page(props: Props) {
  const { data: tournament } = await supabase
    .from("tournaments")
    .select()
    .eq("id", props.params.tournamentId)
    .limit(1)
    .single();
  const { data: participants } = await supabase
    .from("profile_tournament")
    .select("*, profiles (*)")
    .eq("tournament_id", props.params.tournamentId)
    .eq("participates", true);
  const { data: games } = await supabase
    .from("games")
    .select(
      "*, player_white:player_white_id(username), player_black:player_black_id(username)"
    )
    .eq("tournament_id", props.params.tournamentId);

  const [hours] = tournament.time.split(":");
  const date = format(new Date(tournament.date), "PPP", {
    locale: de,
  });
  const time = format(setHours(new Date(tournament.date), hours), "HH:mm", {
    locale: de,
  });

  console.log(games);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <section className="flex w-full max-w-7xl flex-col gap-2">
        <h2 className="inline-flex items-center gap-3 text-2xl">
          <CalendarIcon width={24} height={24} className="text-primary-400" />
          <span className="text-primary-100">{date}</span>
        </h2>
        <h2 className="inline-flex items-center gap-3 text-2xl">
          <ClockIcon width={24} height={24} className="text-primary-400" />
          <span className="text-primary-100">{time}</span>
        </h2>
        <h2 className="inline-flex items-center gap-3 text-2xl">
          <MapPinIcon width={24} height={24} className="text-primary-400" />
          <span className="text-primary-100">{tournament.location}</span>
        </h2>
      </section>
      <hr className="w-full border-primary-800" />
      <section className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-6">
        <div className="flex flex-col rounded-lg border border-primary-700 bg-primary-800 p-4">
          <h2 className="flex uppercase tracking-wider text-primary-400">
            Teilnehmer*innen ({participants.length})
          </h2>
          {participants.map((participant, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-4 text-primary-100"
              >
                {participant.profiles.username}
                {participant.has_board && (
                  <Badge>
                    <span>Schachbrett</span>
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-primary-700 bg-primary-800 p-4 sm:col-span-3">
          <h2 className="flex uppercase tracking-wider text-primary-400">
            Paarungen
          </h2>
          <div className="flex flex-col">
            <AddGameForm
              tournamentId={tournament.id}
              participants={participants}
              games={games}
            />
          </div>
          {games.map((game) => {
            return (
              <div
                key={game.id}
                className="grid grid-cols-12 gap-x-2 text-primary-200"
              >
                <div className="col-span-2">{game.round}. Runde</div>
                <div className="col-span-3">{game.player_white.username}</div>
                <div className="col-span-3">{game.player_black.username}</div>
                <div className="col-span-3">{game.result}</div>
                <div className="col-span-1">{/*  placeholder  */}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
