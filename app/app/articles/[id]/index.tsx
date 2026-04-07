import ArticleCard from "../../../components/articleCard";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <h2 className="text-xl font-bold">Article Title</h2>
            <h3 className="text-lg text-zinc-600 dark:text-zinc-400">Article Description</h3>
          </main>
        </div>
    );
}