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
import { type AI, submitWorkoutRequest } from "./generate";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Day = (typeof daysOfWeek)[number];

export default function ItineraryPage() {
  const [weightInKilo, setWeightInKilo] = useState("");
  const [day, setDay] = useState<Day>("Monday");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useUIState<typeof AI>();

  return (
    <div className="mx-auto w-full max-w-2xl p-4 lg:p-8 md:p-6">
      <h1 className="mb-6 text-center font-bold text-2xl">Workout Planner</h1>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();

          const result = await submitWorkoutRequest({
            weightInKilo,
            day,
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
          <Label htmlFor="weightInKilo">Weight (in Kg)</Label>
          <Input
            id="weightInKilo"
            placeholder="Enter your Weight in Kilograms"
            required
            value={weightInKilo}
            disabled={isGenerating}
            onChange={(e) => setWeightInKilo(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="day">Day of Workout</Label>
          <Select onValueChange={(v) => setDay(v as Day)} value={day}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" type="submit" disabled={isGenerating}>
          Generate Workout
        </Button>
      </form>
      {result.workoutComponent}
    </div>
  );
}
