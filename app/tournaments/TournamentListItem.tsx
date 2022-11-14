"use client";

import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

type Props = {
  tournament: any;
};
export default function TournamentListItem(props: Props) {
  const router = useRouter();

  const navigateToTournament = (tournamentId: string) => {
    router.push(`/tournaments/${tournamentId}`);
  };

  return (
    <div
      className="group flex justify-between rounded-lg border border-zinc-700 bg-zinc-800 p-4 pr-6 w-full cursor-pointer hover:bg-zinc-700"
      onClick={() => navigateToTournament(props.tournament.id)}
    >
      <div className="flex flex-col">
        <h2 className="text-xl">
          {format(
            new Date(props.tournament.date + " " + props.tournament.time),
            "PPPp",
            {
              locale: de,
            }
          )}
        </h2>
        <p className="text-zinc-400">
          <span>{props.tournament.location}</span>
        </p>
      </div>
      <div className="flex items-center">
        <ArrowSmallRightIcon className="h-6 w-6 text-white group-hover:translate-x-2 transition" />
      </div>
    </div>
  );
}
