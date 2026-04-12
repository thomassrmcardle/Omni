"use client";

import { supabase } from "@/lib/supabaseClient";

export default async function getProfile(userId: string, retries = 3) {
    if (!userId) {
        return null;
    }

    const { data: profile, error } = await supabase
        .from("public_profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

    console.log("PROFILE RESULT:", { profile, error, userId });

    if (error) {
        if (retries > 0) {
            console.warn("Error fetching profile, retrying...", error);
            return await getProfile(userId, retries - 1);
        }
        console.error("Error fetching profile:", error);
        return null;
    }
    if (!profile) {
        console.warn("No profile found for user ID:", userId);
        return null;
    }
    return profile;
}