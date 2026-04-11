
export default function Tooltip({ text }: { text: string }) {
    return <div className="absolute bottom-full mb-2 px-2 py-1 bg-zinc-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {text}
    </div>
}