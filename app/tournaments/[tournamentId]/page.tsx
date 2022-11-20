import { format, setHours } from "date-fns";
import { de } from "date-fns/locale";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import supabase from "~lib/supabase";
import Badge from "~components/Badge";

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
    .select(
      `
    *,
    profiles (
      name
    )
  `
    )
    .eq("tournament_id", props.params.tournamentId)
    .eq("participates", true);

  const numberOfBoards = participants.filter(
    (participant) => participant.has_board
  ).length;

  const [hours] = tournament.time.split(":");
  const date = format(new Date(tournament.date), "PPP", {
    locale: de,
  });
  const time = format(setHours(new Date(tournament.date), hours), "HH:mm", {
    locale: de,
  });

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <section className="flex flex-col gap-2 max-w-7xl w-full">
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
      <hr className="border-primary-800 w-full" />
      <section className="flex flex-col gap-2 max-w-7xl w-full">
        <h2 className="flex text-primary-400 uppercase tracking-wider">
          Teilnehmer*innen ({participants.length}/{numberOfBoards})
        </h2>
        {participants.map((participant, index) => {
          return (
            <div
              key={index}
              className="text-primary-100 flex items-center gap-4"
            >
              {participant.profiles.name}
              {participant.has_board && (
                <Badge>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <span>Schachbrett</span>
                </Badge>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
