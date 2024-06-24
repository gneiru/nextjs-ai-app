"use client";

import type { AI } from "@/app/action";
import { Button } from "@/components/ui/button";
import { useActions } from "ai/rsc";
import { useState, useTransition } from "react";

export function Bet({ team, amount }: { team: string; amount: number }) {
  const { confirmBet } = useActions<typeof AI>();
  const [purchasingUI, setPurchasingUI] = useState<null | React.ReactNode>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    startTransition(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await confirmBet(amount, team, "$");
        setPurchasingUI(res.gui);
      } catch (error) {
        console.error(error);
      }
    });
  };
  return (
    <div>
      {purchasingUI ? (
        <div className="inline-flex items-start gap-1 md:items-center">
          {purchasingUI}
        </div>
      ) : (
        <div className="rounded-xl border bg-zinc-950 p-4 text-green-400">
          <div className="float-right inline-block rounded-full bg-white/10 px-2 py-1 text-xs">
            +1.23% ↑
          </div>
          <div className="text-lg text-zinc-300">{team}</div>
          <div className="font-bold text-3xl">${amount}</div>
          <div className="text mt-1 text-xs text-zinc-500">
            Click the button below to bet on {team}.
          </div>
          <Button
            className="w-full"
            type="submit"
            disabled={isPending}
            onClick={submit}
          >
            Bet
          </Button>
          {purchasingUI ? <div>{purchasingUI}</div> : null}
        </div>
      )}
    </div>
  );
}
