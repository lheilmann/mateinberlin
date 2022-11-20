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
          "bg-primary-700 after:from-primary-700 after:via-primary-600 after:to-primary-700",
        backgroundTone === 800 &&
          "bg-primary-800 after:from-primary-800 after:via-primary-700 after:to-primary-800",
        props.className
      )}
    >
      |
    </span>
  );
};

export default Skeleton;
