import type { DeepPartial } from "ai";
import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  description: z.string(),
  sets: z.number().describe("Sets in workout plan"),
  reps: z.number().describe("Repetitions"),
  interval: z.number().describe("Interval between sets"),
});

export type Partial = DeepPartial<typeof schema>;
