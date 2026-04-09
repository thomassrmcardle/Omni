import ArticleCard from "../../../components/articleCard";
import ProfileCard from "../../../components/profileCard";

export const metadata = {
  title: "Headline Article",
  openGraph: {
    type: "article",
  }
};

export default function Home() {

    function MainLayout() {
        return <div className="flex flex-col flex-1 w-full max-w-3xl items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main className="flex flex-1 flex-col w-full py-32 px-16 bg-white dark:bg-black sm:items-start">
            <img src="https://placehold.co/1600x900" alt="Article Thumbnail" className="thumbnail mb-8" />
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
      return <div className="flex flex-col flex-1 w-full max-w-lg justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-1 flex-col py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h1 className="text-2xl font-bold">About This Article</h1>
          <ProfileCard userId="123" />
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            Published 1 June 2024
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Moderated by Jane Smith, Senior Editor
          </p>

          <h2 className="text-xl font-bold mt-8">Sources</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            1. Source One - A reputable news outlet providing in-depth coverage of the topic.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            2. Source Two - An expert in the field offering valuable insights and analysis.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            3. Source Three - A primary source with firsthand information on the subject matter.
          </p>

          <h2 className="text-xl font-bold mt-8">Contradictions</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            1. Source One - A reputable news outlet providing in-depth coverage of the topic.
          </p>

        </main>
      </div>
    }

    return (<>
        <div className="flex flex-row flex-1 justify-center bg-zinc-50 font-sans dark:bg-black">
          <MainLayout />
          <AboutLayout />
        </div>
    </>
    );
}