import ArticleCard from "@/components/articleCard";
import VerifyEmailPrompt from "@/components/prompts/verifyEmail";

interface Props {
  params: { id: string };
}


function getUser(id: string) {
    return { name: "John Doe" }; // Mock user data, replace with actual data fetching logic
}

export async function generateMetadata({ params }: Props) {
  const user = await getUser(params.id); 

  return {
    title: (user ? user.name : "User Profile"),
    openGraph: {
      type: "profile",
    },
  };
}

export default function UserPage({ params }: Props) {


  function MainArea() {
    return <div className="flex flex-col flex-1 w-full max-w-3xl items-center justify-center">
        <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <div className="flex flex-row items-center gap-2">
              <img src="https://placehold.co/56x56" alt="Profile Picture" className="rounded-full" />
              <div>
                  <h1 className="text-2xl font-bold">{getUser(params.id).name}</h1>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Contributor | Data Analyst
                  </p>
              </div>
            </div>

            <p>{params.id}</p>

            <h2 className="text-xl font-semibold mt-8">Recent Activity</h2>
            <VerifyEmailPrompt profileId={params.id} />
            <div className="mt-8 grid w-full gap-4">
                <ArticleCard 
                title="User's Recent Activity" 
                description="This section shows the recent activity of the user, including articles they've interacted with and comments they've made." 
                />
                <ArticleCard 
                title="User's Contributions" 
                description="This section highlights the contributions made by the user, such as articles they've written or projects they've participated in." 
                />
            </div>
  
        </main>
      </div>
  }

  function StatsArea() {
    return <div className="flex flex-col flex-1 w-full max-w-lg justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-1 flex-col py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h1 className="text-2xl font-bold">User Statistics</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            This section provides an overview of the user's statistics, including their activity level, contributions, and engagement with the platform.
          </p>
        </main>
      </div>
  }

  return <div className="flex flex-row w-full items-start justify-center bg-zinc-50 font-sans dark:bg-black">
    <MainArea />
    <StatsArea />
  </div>
}