"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import {
  type StreamableValue,
  createAI,
  createStreamableUI,
  createStreamableValue,
} from "ai/rsc";
import { schema } from "./schema";
import View from "./view";

type RequestArgs = {
  amount: string;
  sport: string;
  name?: string;
  team: "home" | "away";
};

const system = "You are a gambling referee.";

export async function submitRequest(args: RequestArgs) {
  "use server";

  const gui = createStreamableUI(<View />);
  const isGenerating = createStreamableValue(true);
  const name = args.name ?? "Anonymous Gambler";

  streamObject({
    model: openai("gpt-4o"),
    maxTokens: 2500,
    schema,
    system,
    prompt: `My name is ${name}. I have ${args.amount} dollars which I bet on ${args.sport} sports to team ${args.team}. Also, I want you to tell me how much I would win if I bet on ${args.sport}.`,
  })
    // non-blocking: the generateItinerary call returns immediately
    .then(async (result) => {
      try {
        for await (const partial of result.partialObjectStream) {
          gui.update(<View partial={partial} />);
        }
      } finally {
        isGenerating.done(false);
        gui.done();
      }
    });

  return {
    isGenerating: isGenerating.value,
    gui: gui.value,
  };
}

const initialAIState: {
  destination: string;
  lengthOfStay: string;
} = {
  destination: "",
  lengthOfStay: "",
};

const initialUIState: {
  isGenerating: StreamableValue<boolean>;
  gui: React.ReactNode;
} = {
  isGenerating: createStreamableValue(false).value,
  gui: null,
};

export const AI = createAI({
  actions: {
    submitRequest,
  },
  initialUIState,
  initialAIState,
});
