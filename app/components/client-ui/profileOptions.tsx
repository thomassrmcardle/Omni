"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function ProfileOptions({profileId}: { profileId: string }) {

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

    if (user.id !== profileId) {
        return null;
    }

    function openEditProfile() {
        document.location.href = "account/edit-profile";
    }

    function openSettings() {
        document.location.href = "account/settings";
    }

    return <div className="flex flex-row gap-4 flex-end">
        <button onClick={openEditProfile} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 text-center">
            Edit Profile
        </button>
        <button onClick={openSettings} className="bg-zinc-200 dark:bg-zinc-700 rounded-md px-4 py-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-center">
            Settings
        </button>
    </div>
}