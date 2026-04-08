export default function ProfileCard({ userId } : any) {
  return (
    <a href={`/profiles/${userId}`} >
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
        <h2 className="text-l font-semibold">{'John Doe'}</h2>
        <p className="text-zinc-600 dark:text-zinc-400">{'Data analyst'}</p>
      </div>
    </a>
  );
}