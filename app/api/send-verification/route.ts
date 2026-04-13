import { sendVerifyEmail } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";
import getProfile from "@/lib/getProfile";

export async function POST() {

    const supabase = await createClient()

    const {
        data: {user},
        error,
    } = await supabase.auth.getUser()


    if (!user) {
        return new Response("Unauthorised", {status: 401})
    }
    
    
    const profile = await getProfile(user.id)
    if (!profile) {
        return new Response("Unauthorised", {status: 401})
    }


    if (!profile.email) {
        return new Response("Unauthorised", {status: 401})
    }

    await sendVerifyEmail({
        email: user.email || '',
        displayName: profile.displayName,
        token: profile.email_verify_token
    })

    return new Response('OK')

    // 1. Get user (from session)
    // 2. Rate limit check
    // 3. Generate / reuse token
    // 4. Send email via resend
}