import AuthCard from "./AuthCard";
import NextTournamentCard from "./NextTournamentCard";
import CommunityCard from "./CommunityCard";
import RankingCard from "./RankingCard";
import _ from "lodash";
import { isAfter, isEqual, startOfToday } from "date-fns";
import HeroSection from "./HeroSection";
import supabase from "~supabase";

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
      (tournament) =>
        isEqual(new Date(tournament.date), startOfToday()) ||
        isAfter(new Date(tournament.date), new Date())
    ),
    "date"
  );
  const nextTournament = nextTournaments.length > 0 ? nextTournaments[0] : null;

  return (
    <div className="flex w-full flex-col gap-10">
      <HeroSection />
      <section className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
