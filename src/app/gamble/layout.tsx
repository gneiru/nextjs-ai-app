import { AI } from "./generate";

export const metadata = {
  title: "Gamble",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AI>{children}</AI>;
}
