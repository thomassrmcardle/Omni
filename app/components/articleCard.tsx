export default function ArticleCard({ title , description } : any) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}