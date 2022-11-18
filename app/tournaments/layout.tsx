import CreateTournamentDialog from "./CreateTournamentDialog";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function Layout(props: Props) {
  return (
    <div className="flex flex-col items-center w-full mt-4">
      <section className="max-w-7xl w-full">{props.children}</section>
    </div>
  );
}
