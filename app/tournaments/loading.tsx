import Skeleton from "~components/Skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Skeleton className="h-20 w-full rounded-lg"></Skeleton>
      <Skeleton className="h-20 w-full rounded-lg"></Skeleton>
      <Skeleton className="h-20 w-full rounded-lg"></Skeleton>
      <Skeleton className="h-20 w-full rounded-lg"></Skeleton>
    </div>
  );
}
