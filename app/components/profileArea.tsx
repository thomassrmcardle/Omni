"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/profileCard";
import Tooltip from "./client-ui/tooltip";
import { useRouter } from "next/dist/client/components/navigation";

type SupabaseUser = {
  id: string;
  [key: string]: any;
};

export default function ProfileArea() {
    const router = useRouter();

    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [canCreate, setCanCreate] = useState(false);

    const [tipHovered, setTipHovered] = useState(false);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }: any) => {
            setUser(data.user);
        });

        // Create listener for login
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
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
            <Tooltip
                text={canCreate ? "Create a new post" : "You need to verify your email to create posts"}
                visible={tipHovered}
            />
        </div>
        <ProfileCard compact={true} userId={user.id} />
    </div>
  ) : (
    <CreatePrompt />
  );
}