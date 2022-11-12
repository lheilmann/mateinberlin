import AccountCard from "./AccountCard";
import NextTournamentCard from "./NextTournamentCard";
import CommunityCard from "./CommunityCard";
import RankingCard from "./RankingCard";

export const revalidate = 0;

export default async function Page() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex items-center justify-center w-full">
        <h1 className="text-6xl sm:text-8xl text-center font-semibold tracking-wider text-gray-100 uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300 drop-shadow-[0_0_12px_rgba(147, 197, 253, 0.6)]">
          Mate in Berlin
        </h1>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <AccountCard />
        <NextTournamentCard />
        <CommunityCard />
        <RankingCard />
      </section>
    </div>
  );
}
