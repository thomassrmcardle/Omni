import { supabase } from "./supabaseClient.js";

export default async function getProfile(userId: string, retries = 3) {
  if (!userId) return null;

  const { data } = await supabase
    .from("public_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return data || null;
}