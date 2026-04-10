"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPrompt({profileId}: { profileId: string }) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        }
        load();
    }, []);

    if (!user) {
        return null;
    }

    const isSelf = user.id === profileId;
    const isUnverified = !user.email_confirmed_at;

    const router = useRouter();

    function openPrompt() {
        router.push("/verify-email");
    }

    if (isSelf && isUnverified) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 w-full bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                <h1 className="text-2xl font-bold w-full text-left">Verify Your Email</h1>
                <p className="text-center text-zinc-600 dark:text-zinc-400 w-full text-left">
                    Click the link in an email, verifying your account to unlock posting and other features!
                </p>
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

    if (isSelf) {
        console.log("Email already verified for user:", isUnverified);
        return <p>Email has already been verified. <b>{isUnverified}</b> </p>;
    }

    return <p>Someone else's profile.</p>;
}