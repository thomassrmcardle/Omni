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
    const fetchDeadline = 5000/2; // 2.5 seconds

    if (!userId) {
        return null;
    }

    try {
        const { data: profile, error } = await timeout(
            Promise.resolve(
                supabase
                    .from("public_profiles")
                    .select("*")
                    .eq("id", userId)
                    .maybeSingle()
            ),
            fetchDeadline // 5 second timeout
        ); 

        if (error) {
            throw error;
        }

        console.log("PROFILE RESULT:", { profile, error, userId });
        return profile || null;
    }
    catch (err) {
        console.log("Error fetching profile:", err);
        if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            await new Promise(res => setTimeout(res, 1000)); // wait 1 second before retrying
            return getProfile(userId, retries - 1);
        } else {
            console.log("All retries failed.");
        }
        return null;
    }

}