import { format, parseISO } from "date-fns";

export function Games({
  games,
}: {
  games: {
    date: string;
    homeTeam: string;
    awayTeam: string;
    winningTeam: string;
    winningAmount: number;
  }[];
}) {
  return (
    <div className="mb-4 flex flex-col gap-2 overflow-y-scroll pb-4 text-sm sm:flex-row">
      {games.map((game) => (
        <div
          key={game.date}
          className="flex max-w-96 flex-shrink-0 flex-col rounded-md bg-zinc-900 p-4"
        >
          <div className="text-sm text-zinc-400">
            {format(parseISO(game.date), "dd LLL, yyyy")}
          </div>
          <div className="font-bold text-base text-zinc-200">
            {game.homeTeam} vs {game.awayTeam}
          </div>
          <div className="text-zinc-500">
            {game.winningTeam} won by {game.winningAmount} $
          </div>
        </div>
      ))}
    </div>
  );
}

export function Winnings({ team }: { team: string }) {
  return (
    <div className="mb-4 flex flex-col gap-2 overflow-y-scroll pb-4 text-sm sm:flex-row">
      <div className="flex max-w-96 flex-shrink-0 flex-col rounded-md bg-zinc-900 p-4">
        <div className="text-sm text-zinc-400">
          {format(parseISO("2023-01-01"), "dd LLL, yyyy")}
        </div>
        <div className="font-bold text-base text-zinc-200">{team} Winnings</div>
        <div className="text-zinc-500">$1000 in total</div>
      </div>
    </div>
  );
}
