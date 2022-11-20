import { format } from "date-fns";
import { de } from "date-fns/locale";
import supabase from "../../../supabase";
import Badge from "../../../components/Badge";

export const revalidate = 0;

type Props = {
  params: { tournamentId: string };
};
export default async function Page(props: Props) {
  const { data: tournaments } = await supabase
    .from("tournaments")
    .select()
    .eq("id", props.params.tournamentId);

  const tournament = tournaments[0];

  const { data: participants } = await supabase
    .from("participants")
    .select(
      `
    *,
    profiles (
      name
    )
  `
    )
    .eq("tournament_id", props.params.tournamentId);

  const numberOfBoards = participants.filter(
    (participant) => participant.has_board
  ).length;

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <section className="flex flex-col gap-2 max-w-7xl w-full">
        <h1 className="text-2xl text-lila-100">
          {format(new Date(tournament.date + " " + tournament.time), "PPPp", {
            locale: de,
          })}
        </h1>
        <p className="text-lila-300">
          <span>{tournament.location}</span>
        </p>
      </section>
      <hr className="border-lila-800 w-full" />
      <section className="flex flex-col gap-2 max-w-7xl w-full">
        <h2 className="flex text-lila-400 uppercase tracking-wider">
          Teilnehmer*innen ({participants.length}/{numberOfBoards})
        </h2>
        {participants.map((participant, index) => {
          return (
            <div key={index} className="text-lila-100 flex items-center gap-4">
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
