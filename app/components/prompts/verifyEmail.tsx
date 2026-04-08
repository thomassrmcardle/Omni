"use client";

import { useRouter } from "next/navigation";

export default function VerifyEmailPrompt() {
    const router = useRouter();

    function openPrompt() {
        router.push("/verify-email");
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="text-center text-zinc-600 dark:text-zinc-400">Click the link in an email, verifying your account to unlock posting and other features!</p>
            <div className="flex gap-4 items-center w-full">
                <button onClick={openPrompt} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full text-center">
                    Send Email
                </button>
                <a href="/profiles" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 w-full text-center">
                    Maybe later
                </a>
            </div>
        </div>
    );
}