"use client";

import VerifyEmailPrompt from "@/components/prompts/verifyEmail";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/dist/client/components/navigation";
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
    const router = useRouter();

    let [user, setUser] = useState<any>(null);
    let [profile, setProfile] = useState<any>(null);

    let [name, setName] = useState("");
    let [job_title, setJobTitle] = useState("");
    let [bio, setBio] = useState("");

    let [saving , setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
            if (data.user) {
                const profileData = await GetSelfProfile(data.user.id);
                setProfile(profileData);
            }
        }
        load();
    }, []);

    useEffect(() => {
        if (user && profile) {
            setName(profile.display_name);
            setJobTitle(profile.job_title);
            setBio(profile.bio);
        }
    }, [user, profile]);

    if (!user || !profile) {
        return <div>Loading...</div>;
    }

    async function applyChanges() {
        setSaving(true);

        const { error } = await supabase.from("profiles").update({
            display_name: name,
            bio: bio,
            job_title: job_title,
        }).eq("id", user.id);

        if (error) {
            alert(error.message);
            setSaving(false);
            // Add error message to UI here
            return;
        }

        router.push("/profiles/" + user.id);
    }

    return <div className="bg-white dark:bg-black py-32 px-16 w-full">
      <div className="flex flex-row justify-center">
        
        <div className="card shadow-md p-8 justify-center w-full max-w-lg">
            <h1 className="text-2xl font-bold">Edit Profile</h1>

            <VerifyEmailPrompt profileId={user.id} />

            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-4 p-2 border rounded-md" placeholder="Name" />
            <input value={job_title} onChange={(e) => setJobTitle(e.target.value)} className="w-full mt-4 p-2 border rounded-md" placeholder="Job title" />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full mt-4 p-2 border rounded-md" placeholder="Bio" rows={6} />

            <button onClick={applyChanges} disabled={saving} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full mt-4">
                {saving ? "Saving..." : "Save Changes"}
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center w-full">
                Changes may take a few moments to apply.
            </p>

        </div>

      </div>
    </div>
}
