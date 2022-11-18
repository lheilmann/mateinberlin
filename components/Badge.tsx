export default function Badge({ children }) {
  return (
    <span className="flex items-center justify-center bg-lila-700 px-1.5 py-0.5 rounded text-sm text-lila-300 gap-1">
      {children}
    </span>
  );
}
