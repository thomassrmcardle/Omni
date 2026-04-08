import ArticleCard from "@/components/articleCard";

interface Props {
  params: { id: string };
}

function getUser(id: string) {
    return { name: "John Doe" }; // Mock user data, replace with actual data fetching logic
}

export async function generateMetadata({ params }: Props) {
  const user = await getUser(params.id); 

  return {
    title: (user ? user.name : "User Profile") + " - Omni",
  };
}

export default function UserPage({ params }: Props) {
  return <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <div>
                <h1 className="text-2xl font-bold">Profile of {getUser(params.id).name}</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mt-4">
                This is the profile page for user with ID: {params.id}.
                </p>
            </div>
            <h2 className="text-xl font-semibold mt-8">Recent Activity</h2>
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