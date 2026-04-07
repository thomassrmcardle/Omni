import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-3xl font-bold">Today's headlines</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Stay up to date with the latest news and updates.
          </p>
          <div>
            <div className="mt-8 grid w-full gap-4">
              <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                <h2 className="text-xl font-semibold">Breaking News: Market Hits All-Time High</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  The stock market reached an all-time high today, with major indices showing significant gains.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                <h2 className="text-xl font-semibold">Tech Giant Releases New Smartphone</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  A leading technology company has unveiled its latest smartphone model, featuring cutting-edge technology and design.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
