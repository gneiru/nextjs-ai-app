import type { PartialItinerary } from "./itinerary";

export const ItineraryView = ({
  itinerary,
}: {
  itinerary?: PartialItinerary;
}) => (
  <div className="mt-8">
    {itinerary?.days && (
      <>
        <h2 className="mb-4 font-bold text-xl">Your Itinerary</h2>
        <div className="space-y-4">
          {itinerary.days.map(
            (day, index) =>
              day && (
                <div key={index} className="rounded-lg border p-4">
                  <h3 className="font-bold">{day.theme ?? ""}</h3>

                  {day.activities?.map(
                    (activity, index) =>
                      activity && (
                        <div key={index} className="mt-4">
                          {activity.name && (
                            <h4 className="font-bold">{activity.name}</h4>
                          )}
                          {activity.description && (
                            <p className="text-gray-500">
                              {activity.description}
                            </p>
                          )}
                          {activity.duration && (
                            <p className="text-gray-400 text-sm">{`Duration: ${activity.duration} hours`}</p>
                          )}
                        </div>
                      ),
                  )}
                </div>
              ),
          )}
        </div>
      </>
    )}
  </div>
);
