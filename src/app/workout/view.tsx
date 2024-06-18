import type { Partial } from "./schema";

export default function View({ workout }: { workout?: Partial }) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 font-bold text-xl">Your Workout for Today</h2>
      <div className="space-y-4">
        {workout && (
          <div className="rounded-lg border p-4">
            <div className="mt-4">
              {workout.name && <h4 className="font-bold">{workout.name}</h4>}
              {workout.description && (
                <p className="text-gray-500">{workout.description}</p>
              )}
              <div className="text-gray-400 text-sm">
                {workout.interval ? (
                  <p>{`Interval: ${workout.interval} minutes`}</p>
                ) : null}
                {workout.reps ? <p>{`Repetition: ${workout.reps}`}</p> : null}
                {workout.sets ? <p>{`Sets: ${workout.sets}`}</p> : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
