import { sendVerifyEmail } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";
import getProfile from "@/lib/getProfile";
import { generateVerifyToken } from "@/lib/generateVerifyToken";

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

    const verify_token = generateVerifyToken()

    await supabase
        .from('profiles')
        .update({
            email_verify_token: verify_token,
            email_verify_expires_at: new Date(Date.now() + 1000*60*60) // 1 hour
        })
        .eq("id", user.id)

    await sendVerifyEmail({
        email: user.email || '',
        displayName: profile.displayName,
        token: verify_token
    })

    return new Response('OK')

    // 1. Get user (from session)
    // 2. Rate limit check
    // 3. Generate / reuse token
    // 4. Send email via resend
}