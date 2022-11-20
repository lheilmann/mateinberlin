type Props = {
  numberOfTournaments: number;
  numberOfProfiles: number;
};
export default function CommunityCard(props: Props) {
  return (
    <>
      <div className="flex flex-col rounded-lg border border-primary-700 bg-primary-800 p-4">
        <span className="flex uppercase tracking-wider text-primary-400">
          Community
        </span>
        <div className="flex flex-1 flex-col items-start justify-center gap-4 py-4">
          <div className="flex flex-1 items-center">
            <div className="flex items-end justify-end gap-3">
              <span className="text-6xl text-primary-100">
                {props.numberOfTournaments}
              </span>
              <span className="text-lg text-primary-300">Turniere</span>
            </div>
          </div>
          <div className="flex flex-1 items-center">
            <div className="flex items-end justify-end gap-3">
              <span className="text-6xl text-primary-100">
                {props.numberOfProfiles}
              </span>
              <span className="text-lg text-primary-300">Spieler*innen</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
