import "server-only";

import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";
import OpenAI from "openai";

import {
  runAsyncFnWithoutBlocking,
  runOpenAICompletion,
  sleep,
} from "@/lib/utils";
import type { ANY } from "@/lib/utils/tool-definition";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import {
  Games,
  Bet,
  Winnings,
  BotCard,
  BotMessage,
  SystemMessage,
  Spinner,
} from "@/components/bet";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

async function confirmBet(amount: number, team: string, symbol: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  const gui = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      <Spinner />
      <p className="mb-2">
        Betting {amount} {symbol}...
      </p>
    </div>,
  );

  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {
    // You can update the UI at any point.
    await sleep(1000);

    gui.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        <Spinner />
        <p className="mb-2">
          Betting {amount} {symbol}... working on it...
        </p>
      </div>,
    );

    await sleep(1000);

    gui.done(
      <div>
        <p className="mb-2">
          You have successfully betted {amount} {symbol} on {team}.
        </p>
      </div>,
    );

    systemMessage.done(
      <SystemMessage>
        You have betted {amount} shares of {symbol} on {team}.
      </SystemMessage>,
    );

    aiState.done([
      ...aiState.get(),
      {
        role: "system",
        content: `[User has betted ${amount} shares of ${symbol} on ${team}]`,
      },
    ]);
  });

  return {
    gui: gui.value,
    newMessage: {
      id: Date.now(),
      display: systemMessage.value,
    },
  };
}

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content,
    },
  ]);

  const reply = createStreamableUI(
    <BotMessage className="items-center">
      <Spinner />
    </BotMessage>,
  );

  const completion = runOpenAICompletion(openai, {
    model: "gpt-4o",
    stream: true,
    messages: [
      {
        role: "system",
        content: `\
        You are a betting assistant and you can help users bet on teams, step by step.
        You and the user can discuss winnings and the user can adjust the amount of bets they want to bet, or remove their bets, in the UI.

        Messages inside [] means that it's a UI element or a user event. For example:
        - "[Winnings for Away = $100]" means that an interface of the winnings for the team Away is shown to the user.
        - "[User has changed the amount of Away to 10]" means that the user has changed the amount of Away to 10 in the UI.
        - "[User has removed their bet for Away]" means that the user has removed Away from the bet list.

        If the user requests betting for a team, call \`show_bet_ui\` to show the bet UI.
        If the user just wants the winnings, call \`show_winnings\` to show the winnings.
        If you want to show games, call \`list_games\`.
        If the user wants to complete impossible tasks, respond that you are only an Bet Assistant and cannot do that.
        a demo and cannot do that.

        Besides that, you can also chat with users and do some calculations if needed.`,
      },
      ...aiState.get().map((info: ANY) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: [
      {
        name: "show_bet_ui",
        description:
          "Show the bet UI for a team. Use this if the user wants to bet on a team.",
        parameters: z.object({
          amount: z.number().describe("The amount of money to bet"),
          team: z
            .string()
            .describe(
              "The name of the team to bet on. e.g. Home, Away, or Draw.",
            ),
        }),
      },
      {
        name: "show_winnings",
        description:
          "Show the winnings for a team. Use this if the user wants to see the winnings.",
        parameters: z.object({
          team: z
            .string()
            .describe(
              "The name of the team to show the winnings for. e.g. Home, Away, or Draw.",
            ),
        }),
      },
      {
        name: "list_games",
        description: "List the games that are currently in progress.",
        parameters: z.object({
          games: z.array(
            z.object({
              date: z
                .string()
                .describe("The date of the game, in ISO-8601 format"),
              homeTeam: z.string().describe("The name of the home team"),
              awayTeam: z.string().describe("The name of the away team"),
              winningTeam: z.string().describe("The name of the winning team"),
              winningAmount: z
                .number()
                .describe("The amount of money won by the winning team"),
            }),
          ),
        }),
      },
    ],
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: "assistant", content }]);
    }
  });

  completion.onFunctionCall("list_games", async ({ games }) => {
    reply.update(<BotCard>Showing games...</BotCard>);

    await sleep(1000);

    reply.done(
      <BotCard>
        <Games games={games} />
      </BotCard>,
    );

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "list_games",
        content: JSON.stringify(games),
      },
    ]);
  });

  completion.onFunctionCall("show_winnings", async ({ team }) => {
    reply.update(
      <BotCard>
        <Loader2 className="size-5 animate-spin" />
      </BotCard>,
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <Winnings team={team} />
      </BotCard>,
    );

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "get_winnings",
        content: JSON.stringify(team),
      },
    ]);
  });

  completion.onFunctionCall("show_bet_ui", async ({ team, amount }) => {
    reply.update(
      <BotCard>
        <Loader2 className="size-5 animate-spin" />
      </BotCard>,
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <Bet team={team} amount={amount} />
      </BotCard>,
    );

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_bet_ui",
        content: `[User has changed the amount of ${team} to ${amount}]`,
      },
    ]);
  });

  return {
    id: Date.now(),
    display: reply.value,
  };
}

// Define necessary types and create the AI.

const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
    confirmBet,
  },
  initialUIState,
  initialAIState,
});
