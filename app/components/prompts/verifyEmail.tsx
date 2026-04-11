"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


async function GetSelfProfile(userId?: string) {
    if (userId) {
        const { data: profile } = await supabase
            .from("public_profiles")
            .select("*")
            .eq("id", userId)
            .single();
        return profile;
    }
    return null;
}

export default function VerifyEmailPrompt({profileId}: { profileId: string }) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
            const profileData = await GetSelfProfile(profileId);
            setProfile(profileData);
        }
        load();
    }, []);

    if (!user) {
        return null;
    }

    const isSelf = user.id === profileId;
    const isUnverified = profile ? !profile.email_verified : false;

    function openPrompt() {
        router.push("/verify-email");
    }

    function closePrompt() {
        setVisible(false);
    }

    if (isSelf && isUnverified && visible) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 w-full bg-blue-50 dark:bg-blue-900 rounded-lg p-6 border border-blue-200 dark:border-blue-700 mb-4">
                <h1 className="text-2xl font-bold w-full text-left">Verify Your Email</h1>
                <p className="text-center text-zinc-600 dark:text-zinc-400 w-full text-left">
                    Take a moment to verify your email to unlock posting and other features!
                </p>
                <div className="flex gap-4 items-center w-full">
                    <button onClick={openPrompt} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full text-center">
                        Send Email
                    </button>
                    <button onClick={closePrompt} className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-md px-4 py-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-center">
                        Maybe later
                    </button>
                </div>
            </div>
        );
    }

    return null;
}