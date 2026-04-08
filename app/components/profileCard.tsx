export default function ProfileCard({ userId, compact } : any) {

  function getImg() {
    if (compact) {
      return "https://placehold.co/24x24";
    } else {
      return "https://placehold.co/42x42";
    }
  }

  var grow = compact ? "" : "w-full";
  var iconSize = compact ? "w-6 h-6" : "w-10 h-10";

  return (
    <a className={grow} href={`/profiles/${userId}`} >
        <div className={"flex flex-row items-center flex-1 "+grow+" rounded-lg border border-zinc-200 p-4 dark:border-zinc-700 gap-2"}>
            <img src={getImg()} alt="Profile Picture" className={"rounded-full "+iconSize} />
            <div className="flex flex-col">
                <h2 className="font-semibold">{'John Doe'}</h2>
                {compact ? null : <p className="text-sm text-zinc-600 dark:text-zinc-400">{'Data analyst'}</p>}
            </div>
        </div>
    </a>
  );
}