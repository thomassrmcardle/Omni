import Image from "next/image";
import ArticleCard from "../components/articleCard";

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

              <ArticleCard 
                title="Breaking News: Market Hits All-Time High" 
                description="The stock market reached an all-time high today, with major indices showing significant gains." 
              />

              <ArticleCard 
                title="Man Bites Dog: Story Shocks the World" 
                description="A shocking incident occurred today when a man was bitten by his own dog, leaving the public stunned." 
              />
            
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
