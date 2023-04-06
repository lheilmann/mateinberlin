import _ from "lodash";

type Props = {
  games: any;
  participants: any;
  tournament: any;
};
export default function ScoresCard(props: Props) {
  const orderedParticipants = _.orderBy(
    props.participants.map((participant) => {
      const games = props.games.filter(
        (game) =>
          game.player_white_id === participant.profile_id ||
          game.player_black_id === participant.profile_id
      );
      let wins = 0;
      let losses = 0;
      let draws = 0;
      games.forEach((game) => {
        if (game.player_white_id === participant.profile_id) {
          if (game.result === "WHITE_WINS") {
            wins++;
          } else if (game.result === "BLACK_WINS") {
            losses++;
          } else if (game.result === "DRAW") {
            draws++;
          }
        }
        if (game.player_black_id === participant.profile_id) {
          if (game.result === "BLACK_WINS") {
            wins++;
          } else if (game.result === "WHITE_WINS") {
            losses++;
          } else if (game.result === "DRAW") {
            draws++;
          }
        }
      });
      return {
        id: participant.profile_id,
        username: participant.profiles.username,
        points: wins + draws * 0.5,
      };
    }),
    "points",
    "desc"
  );

  if (props.games.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-primary-700 bg-primary-800 p-4">
      <h3 className="uppercase tracking-wider text-primary-400">Punkte</h3>
      <div className="flex flex-col gap-1">
        {orderedParticipants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="grid grid-cols-12 text-primary-100"
            >
              <div className="col-span-1 flex items-center">{index + 1}.</div>
              <div className="col-span-3 flex items-center">
                {participant.username}
              </div>
              <div className="col-span-3 flex items-center">
                {participant.points}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
