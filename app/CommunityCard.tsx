"use client";

type Props = {
  numberOfTournaments: number;
  numberOfProfiles: number;
};
export default function CommunityCard(props: Props) {
  return (
    <>
      <div className="flex flex-col p-4 rounded-lg border border-lila-700 bg-lila-800">
        <span className="flex text-lila-400 uppercase tracking-wider">
          Community
        </span>
        <div className="flex flex-col items-start justify-center py-4 gap-4">
          <div className="flex flex-1 items-end justify-start gap-2">
            <span className="text-6xl text-lila-100">
              {props.numberOfTournaments}
            </span>
            <span className="text-lila-400">Turniere</span>
          </div>
          <div className="flex flex-1 items-end justify-start gap-2">
            <span className="text-6xl text-lila-100">
              {props.numberOfProfiles}
            </span>
            <span className="text-lila-400">Spieler*innen</span>
          </div>
        </div>
      </div>
    </>
  );
}
