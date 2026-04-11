import { supabase } from "@/lib/supabaseClient";

export default async function getProfile(userId: string) {
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