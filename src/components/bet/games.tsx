import { format, parseISO } from "date-fns";
import * as Card from "@/components/ui/card";

interface GameCardProps {
  games: {
    date: string;
    homeTeam: string;
    awayTeam: string;
    winningTeam: string;
    winningAmount: number;
  }[];
}

export function Games({ games }: GameCardProps) {
  return (
    <div className="mb-4 flex flex-col gap-2 overflow-y-scroll pb-4 text-sm sm:flex-row">
      {games.map((game) => (
        <GameCard key={game.date} game={game} />
      ))}
    </div>
  );
}

function GameCard({
  game,
}: {
  game: GameCardProps["games"][number];
}) {
  return (
    <Card.Card>
      <Card.CardHeader>
        <Card.CardTitle className="text-lg">
          {game.homeTeam} vs {game.awayTeam}
        </Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent>
        <p>
          {game.winningTeam} won by {game.winningAmount} $
        </p>
      </Card.CardContent>
      <Card.CardFooter className="text-muted-foreground">
        {format(parseISO(game.date), "dd LLL, yyyy")}
      </Card.CardFooter>
    </Card.Card>
  );
}

export function Winnings({ team }: { team: string }) {
  return (
    <div className="mb-4 flex flex-col gap-2 overflow-y-scroll pb-4 text-sm sm:flex-row">
      <div className="flex max-w-96 flex-shrink-0 flex-col rounded-md bg-background p-4">
        <div className="text-foreground text-sm">
          {format(parseISO("2023-01-01"), "dd LLL, yyyy")}
        </div>
        <div className="font-bold text-base text-foreground">
          {team} Winnings
        </div>
        <div className="text-muted-foreground">$1000 in total</div>
      </div>
    </div>
  );
}
