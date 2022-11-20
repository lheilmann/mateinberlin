type Props = {
  numberOfTournaments: number;
  numberOfProfiles: number;
};
export default function CommunityCard(props: Props) {
  return (
    <>
      <div className="flex flex-col p-4 rounded-lg border border-primary-700 bg-primary-800">
        <span className="flex text-primary-400 uppercase tracking-wider">
          Community
        </span>
        <div className="flex flex-1 flex-col items-start justify-center py-4 gap-4">
          <div className="flex flex-1 items-center">
            <div className="flex items-end justify-end gap-3">
              <span className="text-6xl text-primary-100">
                {props.numberOfTournaments}
              </span>
              <span className="text-lg text-primary-300">Turniere</span>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-start gap-2">
            <div className="flex items-end justify-end gap-3">
              <span className="text-6xl text-primary-100">
                {props.numberOfProfiles}
              </span>
              <span className="text-primary-300 text-lg">Spieler*innen</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
