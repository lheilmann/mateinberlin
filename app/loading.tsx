import Skeleton from "../components/Skeleton";
import HeroSection from "./HeroSection";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10 w-full">
      <HeroSection />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Skeleton className="rounded-lg w-full h-56" />
        <Skeleton className="rounded-lg w-full h-56" />
        <Skeleton className="rounded-lg w-full h-56" />
      </section>
    </div>
  );
}
