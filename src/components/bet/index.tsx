import { Loader2 } from "lucide-react";

export { Bet } from "./bet";
export { Games, Winnings } from "./games";
export { EmptyScreen } from "./empty";

export * from "./message";

export function Spinner() {
  return <Loader2 className="size-5 animate-spin" />;
}
