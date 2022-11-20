import AuthCard from "./AuthCard";
import NextTournamentCard from "./NextTournamentCard";
import CommunityCard from "./CommunityCard";
import RankingCard from "./RankingCard";
import _ from "lodash";
import { isBefore } from "date-fns";
import HeroSection from "./HeroSection";
import supabase from "~lib/supabase";

export const revalidate = 0;

export default async function Page() {
  const { data: tournaments, error: errorTournaments } = await supabase
    .from("tournaments")
    .select();
  if (errorTournaments) {
    console.error(errorTournaments);
    return null;
  }

  const { data: profiles, error: errorProfiles } = await supabase
    .from("profiles")
    .select();
  if (errorProfiles) {
    console.error(errorProfiles);
    return null;
  }

  const nextTournaments = _.orderBy(
    tournaments.filter(
      (tournament) => !isBefore(new Date(tournament.date), new Date())
    ),
    "date"
  );
  const nextTournament = nextTournaments.length > 0 ? nextTournaments[0] : null;

  return (
    <div className="flex flex-col gap-10 w-full">
      <HeroSection />
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
