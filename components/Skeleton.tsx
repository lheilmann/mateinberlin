import clsx from "clsx";

type Props = {
  backgroundTone?: 700 | 800;
  className?: string;
};
const Skeleton = (props: Props) => {
  const backgroundTone = props.backgroundTone ?? 800;
  return (
    <span
      className={clsx(
        "relative inline-flex overflow-hidden rounded-md text-transparent opacity-75 after:absolute after:inset-0 after:translate-x-[-100%] after:animate-shimmer after:content-[''] after:bg-gradient-to-r",
        backgroundTone === 700 &&
          "bg-lila-700 after:from-lila-700 after:via-lila-600 after:to-lila-700",
        backgroundTone === 800 &&
          "bg-lila-800 after:from-lila-800 after:via-lila-700 after:to-lila-800",
        props.className
      )}
    >
      |
    </span>
  );
};

export default Skeleton;
