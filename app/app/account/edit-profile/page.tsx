"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

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

export default function EditProfilePage() {

    let [user, setUser] = useState<any>(null);
    let [profile, setProfile] = useState<any>(null);

    let [name, setName] = useState("");
    let [bio, setBio] = useState("");

    useEffect(() => {
        async function load() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
            const profileData = await GetSelfProfile(data.user?.id);
            setProfile(profileData);
        }
        load();
    });

    if (!user || !profile) {
        return null;
    }
    else {
        setName(profile.name);
        setBio(profile.bio || "Welcome to your profile! Here, you can share a bit about yourself, what you do, and what you're interested in.");
    }

    function applyChanges() {
        supabase.from("profiles").update({
            display_name: name,
            bio: bio,
        }).eq("id", user.id);
        supabase.from("public_profiles").update({
            display_name: name,
            bio: bio,
        }).eq("id", user.id);

        document.location.href = "/profiles/" + user.id;
    }

    return <div className="bg-white dark:bg-black py-32 px-16 w-full">
      <div className="flex flex-col justify-center">
        
        <div className="card card shadow-md p-8 justify-center">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-4 p-2 border rounded-md" placeholder="Name" />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full mt-4 p-2 border rounded-md" placeholder="Bio" rows={4} />
            <button onClick={applyChanges} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full mt-4">
                Save Changes
            </button>
        </div>

      </div>
    </div>
}
