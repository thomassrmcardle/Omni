
export default function VerifyEmailPrompt() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="text-center text-zinc-600 dark:text-zinc-400">Unlock the ability to post and other features!</p>
            <a href="/login" className="button">
                Send Email
            </a>
        </div>
    );
}