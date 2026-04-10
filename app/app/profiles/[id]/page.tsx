import ArticleCard from "@/components/articleCard";
import VerifyEmailPrompt from "@/components/prompts/verifyEmail";

interface Props {
  params: Promise<{ id: string }>;
}


function getUser(id: string) {
    return { name: "John Doe" }; // Mock user data, replace with actual data fetching logic
}


function TopArea({ id } : { id: string }) {
  return <div className="px-16 w-full mb-32">
        <div className="flex flex-row items-center gap-2 w-full">
            <img src="https://placehold.co/56x56" alt="Profile Picture" className="rounded-full" />
            <div>
                <h1 className="text-2xl font-bold">{getUser(id).name}</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Contributor | Data Analyst
                </p>
            </div>
          </div>
    </div>
}

function MainArea({ id }: { id: string }) {
  return <div className="flex flex-col flex-1 w-full max-w-3xl items-center justify-center">
      <main className="flex flex-1 w-full flex-col items-center justify-between px-16 sm:items-start">

          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <VerifyEmailPrompt profileId={id} />
          <div className="mt-8 grid w-full gap-4">
              <ArticleCard 
              title="User&apos;s Recent Activity" 
              description="This section shows the recent activity of the user, including articles they&apos;ve interacted with and comments they&apos;ve made." 
              />
              <ArticleCard 
              title="User&apos;s Contributions" 
              description="This section highlights the contributions made by the user, such as articles they&apos;ve written or projects they&apos;ve participated in." 
              />
          </div>

      </main>
    </div>
}

function StatsArea() {
  return <div className="flex flex-col flex-1 w-full max-w-lg justify-center font-sans">
      <main className="flex flex-1 flex-col px-16 sm:items-start">
        <h1 className="text-2xl font-bold">User Statistics</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-4">
          This section provides an overview of the user's statistics, including their activity level, contributions, and engagement with the platform.
        </p>
      </main>
    </div>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const user = await getUser(id); 

  return {
    title: (user ? user.name : "User Profile"),
    openGraph: {
      type: "profile",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }>; }) {
  const { id } = await params;

  return <div className="bg-white dark:bg-black py-32 px-16 w-full">
    <div className="flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        <TopArea id={id} />
      </div>
      <div className="flex flex-row w-full items-start justify-center bg-zinc-50 dark:bg-black">
        <MainArea id={id} />
        <StatsArea />
      </div>
    </div>
  </div>
}