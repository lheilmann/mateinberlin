import Skeleton from "../../components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col w-full gap-4">
      <Skeleton className="rounded-lg w-full h-20"></Skeleton>
      <Skeleton className="rounded-lg w-full h-20"></Skeleton>
      <Skeleton className="rounded-lg w-full h-20"></Skeleton>
      <Skeleton className="rounded-lg w-full h-20"></Skeleton>
    </div>
  );
}
