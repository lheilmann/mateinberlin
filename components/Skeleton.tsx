import clsx from "clsx";

type Props = {
  className?: string;
};
const Skeleton = ({ className }: Props) => (
  <span
    className={clsx(
      "relative inline-flex overflow-hidden rounded-md text-transparent opacity-75 after:absolute after:inset-0 after:translate-x-[-700%] after:animate-shimmer after:content-[''] bg-lila-800 after:bg-gradient-to-r after:from-lila-800 after:via-lila-700 after:to-lila-800",
      className
    )}
  >
    |
  </span>
);

export default Skeleton;
