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

export async function submitWorkoutRequest({
  weightInKilo,
  day,
}: {
  weightInKilo: string;
  day: string;
}) {
  "use server";

  const workoutComponent = createStreamableUI(<View />);
  const isGenerating = createStreamableValue(true);

  streamObject({
    model: openai("gpt-4o"),
    maxTokens: 2500,
    schema,
    system:
      "You are a Gym coach. You help users with jobs plan their workouts. Provide the user with a workout plan for the day. The workout plan should include the number of sets, reps, and interval between sets. f the user has any questions, ask them. If the user is done, tell them to rest. Do not ask the user to rest.",
    prompt: `I have ${weightInKilo} kg. I want you to create a workout plan for me for the day ${day}. Sunday should be rest day.`,
  })
    // non-blocking: the generateItinerary call returns immediately
    .then(async (result) => {
      try {
        for await (const partial of result.partialObjectStream) {
          workoutComponent.update(<View workout={partial} />);
        }
      } finally {
        isGenerating.done(false);
        workoutComponent.done();
      }
    });

  return {
    isGenerating: isGenerating.value,
    workoutComponent: workoutComponent.value,
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
  workoutComponent: React.ReactNode;
} = {
  isGenerating: createStreamableValue(false).value,
  workoutComponent: null,
};

export const AI = createAI({
  actions: {
    submitWorkoutRequest,
  },
  initialUIState,
  initialAIState,
});
