import ArticleCard from "../../../components/articleCard";

export default function Home() {

    function MainLayout() {
        return <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main className="flex flex-1 w-full max-w-3xl flex-col justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <h1 className="text-2xl font-bold">Article Headline</h1>
            <h3 className="text-lg text-zinc-600 dark:text-zinc-400">Article Subheading</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          
            <h3 className="text-lg font-semibold mt-8">Related Articles</h3>
            <div className="grid w-full gap-4">
              <ArticleCard 
                title="Related Article 1" 
                description="This is a brief description of the related article." 
              />
              <ArticleCard 
                title="Related Article 2" 
                description="This is a brief description of the related article." 
              />
              <ArticleCard 
                title="Related Article 3" 
                description="This is a brief description of the related article." 
              />
            </div>
          </main>
        </div>
    }

    function AboutLayout() {
      return <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-1 w-full max-w-3xl flex-col justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h1 className="text-2xl font-bold">About This Article</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            This article was written by John Doe, a seasoned journalist with over 20 years of experience in the field. John has covered a wide range of topics, from politics to technology, and is known for his in-depth analysis and engaging writing style.
          </p>
        </main>
      </div>
    }

    return (<>
        <title>Article Headline - Omni</title>
        <div className="flex flex-row flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <MainLayout />
          <AboutLayout />
        </div>
    </>
    );
}