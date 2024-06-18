import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { IconGitHub, IconSparkles } from "@/components/ui/icons";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full shrink-0 items-center justify-between border-b bg-background px-4 backdrop-blur-xl">
      <span className="home-links inline-flex items-center whitespace-nowrap">
        <Link href="/">
          <span className="font-bold text-lg">
            <IconSparkles className="mr-0 mb-0.5 inline w-4 sm:w-5" />
            AI
          </span>
        </Link>
      </span>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/gneiru/nextjs-ai-app"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          <IconGitHub />
          <span className="ml-2 hidden md:flex">GitHub</span>
        </a>
      </div>
    </header>
  );
}
