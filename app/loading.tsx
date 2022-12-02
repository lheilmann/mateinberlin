import Skeleton from "../components/Skeleton";
import HeroSection from "./HeroSection";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-10">
      <HeroSection />
      <section className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-56 w-full rounded-lg" />
        <Skeleton className="h-56 w-full rounded-lg" />
        <Skeleton className="h-56 w-full rounded-lg" />
      </section>
    </div>
  );
}
