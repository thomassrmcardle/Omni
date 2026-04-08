"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/profileCard";

type SupabaseUser = {
  id: string;
  [key: string]: any;
};

export default function ProfileArea() {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: any) => {
      setUser(data.user);
    });
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

  return user ? (
    <ProfileCard userId={user.id} />
  ) : (
    <CreatePrompt />
  );
}