import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";

const exampleMessages = [
  {
    heading: "What games are currently in progress?",
    message: "What games are currently in progress?",
  },
  {
    heading: "What's the winnings for Away?",
    message: "What's the winnings for Away?",
  },
  {
    heading: "I'd like to bet on Draw",
    message: "I'd like to bet on Draw",
  },
];

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="mb-4 rounded-lg border bg-background p-8">
        <h1 className="mb-2 font-semibold text-lg">
          Welcome to Betting Assistant!
        </h1>
        <p className="mb-2 text-muted-foreground leading-normal">
          This is a demo of an interactive betting assistant. It can show you
          games, tell you their winnings, and even help you bet on games.
        </p>
        <p className="text-muted-foreground leading-normal">Try an example:</p>
        <div className="mt-4 mb-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={async () => {
                submitMessage(message.message);
              }}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
