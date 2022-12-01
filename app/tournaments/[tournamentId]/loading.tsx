import Skeleton from "~components/Skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Skeleton className="h-8 w-60 rounded-lg"></Skeleton>
      <Skeleton className="h-8 w-60 rounded-lg"></Skeleton>
      <Skeleton className="h-8 w-60 rounded-lg"></Skeleton>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Skeleton className="h-60 w-full rounded-lg"></Skeleton>
        <Skeleton className="h-60 w-full rounded-lg sm:col-span-3"></Skeleton>
      </div>
    </div>
  );
}
