"use client";

import { supabase } from "@/lib/supabaseClient";

function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export default async function getProfile(userId: string, retries = 3) {
    if (!userId) {
        return null;
    }

    try {
        const { data: profile, error } = await supabase
            .from("public_profiles")
            .select("*")
            .eq("id", userId)
            .maybeSingle();

        console.log("PROFILE RESULT:", { profile, error, userId });
        return profile || null;
    }
    catch (err) {
        console.log("Error fetching profile:", err);
        return null;
    }

}