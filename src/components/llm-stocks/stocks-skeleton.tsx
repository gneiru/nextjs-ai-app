export const StocksSkeleton = () => {
  return (
    <div className="mb-4 flex flex-col gap-2 overflow-y-scroll pb-4 text-sm sm:flex-row">
      <div className="flex h-[60px] w-full cursor-pointer flex-row gap-2 rounded-lg bg-zinc-900 p-2 text-left sm:w-[208px] hover:bg-zinc-800" />
      <div className="flex h-[60px] w-full cursor-pointer flex-row gap-2 rounded-lg bg-zinc-900 p-2 text-left sm:w-[208px] hover:bg-zinc-800" />
      <div className="flex h-[60px] w-full cursor-pointer flex-row gap-2 rounded-lg bg-zinc-900 p-2 text-left sm:w-[208px] hover:bg-zinc-800" />
    </div>
  );
};
