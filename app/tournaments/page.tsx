import supabase from "../../supabase";
import _ from "lodash";
import TournamentListItem from "./TournamentListItem";
import CreateTournamentDialog from "./CreateTournamentDialog";
import React from "react";
import Skeleton from "../../components/Skeleton";

export const revalidate = 0;

export default async function Page() {
  const { data: tournaments, error } = await supabase
    .from("tournaments")
    .select();

  if (error) throw error;

  return (
    <div className="flex flex-col gap-4">
      {_.orderBy(tournaments, "date").map((tournament) => (
        <TournamentListItem key={tournament.id} tournament={tournament} />
      ))}
      <CreateTournamentDialog />
    </div>
  );
}
