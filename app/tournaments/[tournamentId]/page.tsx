import { format } from "date-fns";
import { de } from "date-fns/locale";
import supabase from "../../../supabase";

export const revalidate = 0;

type Props = {
  params: { tournamentId: string };
};
export default async function Page(props: Props) {
  const { data: participants } = await supabase.from("participants").select();
  // .eq("tournament_id", props.params.tournamentId);

  const { data: tournaments } = await supabase
    .from("tournaments")
    .select()
    .eq("id", props.params.tournamentId);

  const tournament = tournaments[0];

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <section className="flex flex-col gap-2 max-w-7xl w-full">
        <h1 className="text-2xl">
          {format(new Date(tournament.date + " " + tournament.time), "PPPp", {
            locale: de,
          })}
        </h1>
        <p className="text-emerald-400">
          <span>{tournament.location}</span>
        </p>
      </section>
      <section className="flex flex-col gap-1 max-w-7xl w-full">
        <h2 className="flex text-emerald-500 uppercase tracking-wider">
          Teilnehmer
        </h2>
        {participants.map((participant, index) => {
          return <div key={index}>{participant.profile_id}</div>;
        })}
      </section>
    </div>
  );
}
