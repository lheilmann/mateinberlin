import supabase from "../../supabase";
import CreateTournamentDialog from "./CreateTournamentDialog";
import _ from "lodash";
import TournamentListItem from "./TournamentListItem";

export const revalidate = 0;

export default async function Page() {
  const { data: tournaments, error } = await supabase
    .from("tournaments")
    .select();

  if (error) throw error;

  return (
    <div className="flex flex-col items-center w-full">
      <section className="flex flex-col gap-4 max-w-7xl w-full">
        <h1 className="text-zinc-500 text-lg uppercase tracking-wider">
          Turniere
        </h1>
        {_.orderBy(tournaments, "date").map((tournament) => (
          <TournamentListItem key={tournament.id} tournament={tournament} />
        ))}
        <CreateTournamentDialog />
      </section>
    </div>
  );
}
