import ArticleCard from "@/components/articleCard";
import ProfileOptions from "@/components/client-ui/profileOptions";
import VerifyEmailPrompt from "@/components/prompts/verifyEmail";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  params: { id: string };
}




async function getUser(id: string) {
  const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .eq("id", id)
      .single();
  return data;
}


function TopArea({ profile }: { profile: any }) {
  return <div className="px-16 w-full mb-8">
        <div className="flex space-between">
          <div className="flex flex-row items-center gap-4 w-full">
            <img src="https://placehold.co/56x56" alt="Profile Picture" className="rounded-full" />
            <div>
                <h1 className="text-2xl font-bold">{profile.display_name || "New User"}</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Contributor | Data Analyst
                </p>
            </div>
          </div>
          <div className="w-full">
            <ProfileOptions profileId={profile.id} />
          </div>
        </div>
    </div>
}

function MainArea({ id }: { id: string }) {
  return <div className="flex flex-col flex-1 w-full max-w-3xl items-center justify-center">
      <main className="flex flex-1 w-full flex-col items-center justify-between px-16 sm:items-start">

          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <VerifyEmailPrompt profileId={id} />
          <div className="grid w-full gap-4">
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
        <div className="card shadow-md p-8 justify-center">
          <p>
            Here will be a simple bio about the user. This will be fully customizable and will help bring personality to an otherwise boring profile.
          </p>
          <div className="mt-8">
            <h3 className="font-semibold mt-4">Badges</h3>
            <p>Here will be a list of badges earned by the user. This will be things such as email verification, posting etc.</p>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 w-full text-center mt-8">Joined Omni Jan 2023</p>
        </div>
      </main>
    </div>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const user = await getUser(id); 

  return {
    title: (user ? user.display_name : "User Not Found"),
    openGraph: {
      type: "profile",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }>; }) {
  const { id } = await params;

  const profile = await getUser(id);

  if (!profile) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-zinc-600 dark:text-zinc-400">The profile you are looking for does not exist.</p>
      </div>
    </div>
  }

  return <div className="bg-white dark:bg-black py-32 px-16 w-full">
    <div className="flex flex-col justify-center">
      <div className="flex flex-row w-full items-start justify-center">
        <div className="max-w-7xl w-full">
          <TopArea profile={profile} />
        </div>
      </div>
      <div className="flex flex-row w-full items-start justify-center">
        <MainArea id={id} />
        <StatsArea />
      </div>
    </div>
  </div>
}