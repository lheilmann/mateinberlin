import supabase from "../../supabase";
import CreateTournamentDialog from "./CreateTournamentDialog";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import _ from "lodash";
export const revalidate = 0;

export default async function Page() {
  const { data: tournaments, error } = await supabase
    .from("tournaments")
    .select();

  if (error) throw error;

  return (
    <div className="flex flex-col items-center w-full">
      <section className="flex flex-col gap-4 max-w-screen-lg w-full">
        <h1 className="text-zinc-500 text-lg uppercase tracking-wider">
          Turniere
        </h1>
        {_.orderBy(tournaments, "date").map((tournament) => (
          <div
            key={tournament.id}
            className="flex flex-col rounded-lg border border-zinc-700 bg-zinc-800 p-4 w-full"
          >
            <h2 className="text-xl">
              {format(
                new Date(tournament.date + " " + tournament.time),
                "PPPp",
                {
                  locale: de,
                }
              )}
            </h2>
            <p className="text-zinc-400">
              <span>{tournament.location}</span>
            </p>
          </div>
        ))}
        <CreateTournamentDialog />
      </section>
    </div>
  );
}
