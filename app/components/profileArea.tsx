"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/profileCard";
import Tooltip from "./client-ui/tooltip";
import { useRouter } from "next/dist/client/components/navigation";

import { clearCachedProfile, getCachedProfile, setCachedProfile } from "@/lib/profileCache";

import getProfile from "@/operators/profileManager";
import { clear } from "console";

type SupabaseUser = {
  id: string;
  [key: string]: any;
};

export default function ProfileArea() {
    const router = useRouter();

    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [canCreate, setCanCreate] = useState(false);

    const [tipHovered, setTipHovered] = useState(false);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        let mounted = true;

        async function init() {
            const { data: { session } } = await supabase.auth.getSession();

            if (!mounted) return;

            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {

                const cachedProfile = getCachedProfile(currentUser.id);
                if (cachedProfile) {
                    setProfile(cachedProfile);
                    setCanCreate(cachedProfile.email_verified);
                    return;
                }

                const profile = await getProfile(currentUser.id);
                if (profile) {
                    setCachedProfile(currentUser.id, profile);
                    setProfile(profile);
                    setCanCreate(profile.email_verified);
                }
            }
            else {
                clearCachedProfile();
                setCanCreate(false);
            }
        }

        init();

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const currentUser = session?.user ?? null;
                setUser(currentUser);

                if (currentUser) {

                    const cachedProfile = getCachedProfile(currentUser.id);
                    if (cachedProfile) {
                        setProfile(cachedProfile);
                        setCanCreate(cachedProfile.email_verified);
                        return;
                    }

                    const profile = await getProfile(currentUser.id);
                    if (profile) {
                        setCachedProfile(currentUser.id, profile);
                        setProfile(profile);
                        setCanCreate(profile.email_verified);
                    }
                } else {
                    clearCachedProfile();
                    setCanCreate(false);
                }
            }
        );

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    function CreatePrompt() {
        return (
        <div className="flex gap-8 items-center">
            <a href="/login" className="button">
            Log In
            </a>
            <a
            href="/signup"
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
            Sign Up
            </a>
        </div>
        );
    }

    function handleCreate() {
        // Logic to create a new profile or redirect to profile creation page
        router.push("/post/create");
    }


  return user ? (
    <div className="flex flex-row items-center gap-4">
        <div onMouseEnter={() => setTipHovered(true)} onMouseLeave={() => setTipHovered(false)} className="relative inline-block">
            <button disabled={!canCreate} onClick={handleCreate} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 text-center">
                Create
            </button>
            {!canCreate ? <Tooltip text="Please verify your email to create content" visible={tipHovered} /> : null}
        </div>
        <ProfileCard compact={true} profile={profile} />
    </div>
  ) : (
    <CreatePrompt />
  );
}