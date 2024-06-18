import type { DeepPartial } from "ai";
import { z } from "zod";

export const schema = z.object({
  name: z.string().describe("Better's name"),
  reason: z
    .string()
    .describe("The reason on why the team with better odds has better odds"),
  odds: z.coerce.number().describe("The odds of winning"),
  amount: z.coerce.number().describe("The amount of money to bet"),
  team: z.enum(["home", "away"]).describe("The team to bet on"),
  betterOddsTeam: z
    .enum(["home", "away"])
    .describe("The team with better odds"),
  winningAmount: z.coerce.number().describe("The amount of money if you win"),
  sport: z
    .string()
    .refine(
      (value) => ["basketball", "football", "tennis"].includes(value),
      "Must be one of basketball, football, or tennis",
    )
    .describe("The sport to bet on"),
});

export type Partial = DeepPartial<typeof schema>;
