
export default function Tooltip({ text, visible }: { text: string; visible?: boolean }) {
    return <div className={`absolute tip left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-sm rounded transition-opacity pointer-events-none ${visible ? "opacity-100" : "opacity-0"}`}>
        {text}
    </div>
}