export default function ProfileCard({ userId } : any) {
  return (
    <a href={`/profiles/${userId}`} >
        <div className="flex flex-row items-center flex-1 w-full rounded-lg border border-zinc-200 p-4 dark:border-zinc-700 gap-2">
            <div className="flex flex-col">
                <h2 className="font-semibold">{'John Doe'}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{'Data analyst'}</p>
            </div>
        </div>
    </a>
  );
}