import AuthCard from "./AuthCard";
import NextTournamentCard from "./NextTournamentCard";
import CommunityCard from "./CommunityCard";
import RankingCard from "./RankingCard";
import supabase from "../supabase";
import _ from "lodash";
import { isBefore } from "date-fns";

export const revalidate = 0;

export default async function Page() {
  const { data: tournaments } = await supabase.from("tournaments").select();
  const { data: profiles } = await supabase.from("profiles").select();

  const nextTournaments = _.orderBy(
    tournaments.filter(
      (tournament) => !isBefore(new Date(tournament.date), new Date())
    ),
    "date"
  );
  const nextTournament = nextTournaments.length > 0 ? nextTournaments[0] : null;

  return (
    <div className="flex flex-col gap-10 w-full">
      <section className="flex items-center justify-center pattern bg-transparent min-h-[300px] sm:min-h-[340px]">
        <h1 className="text-6xl sm:pb-20 sm:text-8xl text-center tracking-wider text-emerald-100 uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-500/75 via-emerald-200/90 to-emerald-500/75">
          Mate in Berlin
        </h1>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <AuthCard />
        <NextTournamentCard nextTournament={nextTournament} />
        <CommunityCard
          numberOfTournaments={tournaments.length}
          numberOfProfiles={profiles.length}
        />
        <RankingCard />
      </section>
    </div>
  );
}
