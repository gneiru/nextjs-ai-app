"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { readStreamableValue, useUIState } from "ai/rsc";
import { useState } from "react";
import { type AI, submitRequest } from "./generate";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Page() {
  const [amount, setAmount] = useState("");
  const [sport, setSport] = useState("");
  const [name, setName] = useState("");
  const [team, setTeam] = useState<"home" | "away">("home");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useUIState<typeof AI>();

  return (
    <div className="mx-auto w-full max-w-2xl p-4 lg:p-8 md:p-6">
      <h1 className="mb-6 text-center font-bold text-2xl">
        AI Gamble Analyzer
      </h1>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();

          const result = await submitRequest({
            amount,
            sport,
            name,
            team,
          });

          setResult(result);

          const isGeneratingStream = readStreamableValue(result.isGenerating);
          for await (const value of isGeneratingStream) {
            if (value != null) {
              setIsGenerating(value);
            }
          }
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (in dollars)</Label>
          <Input
            id="amount"
            placeholder="Enter amount in dollars"
            required
            value={amount}
            disabled={isGenerating}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sport">Sport</Label>
          <Select onValueChange={(v) => setSport(v)} value={sport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a sport" />
            </SelectTrigger>
            <SelectContent>
              {["basketball", "football", "tennis"].map((sport) => (
                <SelectItem key={sport} value={sport} className="capitalize">
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            required
            value={name}
            disabled={isGenerating}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="team">Team</Label>
          <Select
            onValueChange={(v) => setTeam(v as "home" | "away")}
            value={team}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {["home", "away"].map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" type="submit" disabled={isGenerating}>
          Analyze Bet with AI
        </Button>
      </form>
      {result.gui}
    </div>
  );
}
