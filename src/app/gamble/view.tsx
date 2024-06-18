import type { Partial } from "./schema";

export default function View({ partial }: { partial?: Partial }) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 font-bold text-xl">Your Bet</h2>
      <div className="space-y-4">
        {partial && (
          <div className="rounded-lg border p-4">
            <div>
              {partial.name && <h4 className="font-bold">{partial.name}</h4>}
              {partial.reason && (
                <p className="text-gray-500">{partial.reason}</p>
              )}
              <div className="text-gray-400 text-sm">
                <div>
                  Team: <span className="font-bold">{partial.team}</span>
                </div>
                <div>
                  Odds: <span className="font-bold">{partial.odds} %</span>
                </div>
                <div>
                  Winning Amount:{" "}
                  <span className="font-bold">${partial.winningAmount}</span>
                </div>
                <div>
                  Amount: <span className="font-bold">${partial.amount}</span>
                </div>
                <div>
                  Sport: <span className="font-bold">{partial.sport}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
