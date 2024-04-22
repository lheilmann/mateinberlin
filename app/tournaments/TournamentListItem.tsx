"use client";

import { format, setHours } from "date-fns";
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

  const [hours] = props.tournament.time.split(":");
  const dateTime = format(
    setHours(new Date(props.tournament.date), hours),
    "PPPp",
    {
      locale: de,
    }
  );

  return (
    <div
      className="group flex w-full cursor-pointer justify-between rounded-lg border border-primary-700 bg-primary-800 p-4 pr-6 transition hover:bg-primary-700"
      onClick={() => navigateToTournament(props.tournament.id)}
    >
      <div className="flex flex-col">
        <h2 className="text-xl text-primary-100">{dateTime}</h2>
        <p className="text-primary-300">
          <span>{props.tournament.location}</span>
        </p>
      </div>
      <div className="flex items-center">
        <ArrowSmallRightIcon className="size-6 text-primary-100 transition group-hover:translate-x-2" />
      </div>
    </div>
  );
}
