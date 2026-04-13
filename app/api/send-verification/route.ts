
export const runtime = 'nodejs';

import { createClient } from "../../lib/supabase/server.js";
import getProfile from "../../lib/getProfile.js";
import { generateVerifyToken } from "../../lib/generateVerifyToken.js";

export async function sendVerifyEmail({email, displayName, token} : {email: string, displayName: string, token: string}) {
    if (email.length == 0) return {}

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const verifyURL = `${process.env.NEXT_PUBLIC_SITE_URL}/account/verify?token=${token}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
        <div style="padding: 20px;">
        <p>Hello ${displayName},</p>
        <p>This email address has been linked to an Omni account. To verify this was you, please click the button below to complete the process.</p>
        <a href="${verifyURL}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none;">Verify Email</a>
        <p>If this was not you, please ignore this email. We apologise for any inconvenience.</p>
        </div>
        <div style="background-color: rgb(10,10,10); padding: 12px; width: 100%;">
        <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} Omni. All rights reserved.</p>
        </div>
        </body>
        </html>
    `;

    await resend.emails.send({
        from: "Omni <onboarding@resend.dev>",
        to: email,
        subject: "Verify Your Email",
        html: htmlContent
    })
}

export async function POST() {

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY);
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