
export const runtime = 'nodejs';

import { NextRequest } from 'next/server.js';
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
        <body style="margin:0; padding:0; background-color:#f4f4f5; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="width:100%; padding:40px 0;">
                <div style="max-width:480px; margin:0 auto; background:white; border-radius:12px; padding:32px; box-shadow:0 4px 20px rgba(0,0,0,0.05);">
                    <h2 style="margin:0 0 16px 0; font-size:22px; color:#111;">Verify your email</h2>
                    <p style="font-size:15px; color:#333; margin:0 0 16px 0;">
                        Hello ${displayName || "there"},
                    </p>
                    <p style="font-size:15px; color:#444; margin:0 0 24px 0; line-height:1.6;">
                        Thanks for signing up to Omni. Please confirm your email address by clicking the button below.
                        This link will expire in 1 hour.
                        After this period, you will have to request another email in order to complete the verification process.
                    </p>
                    <div style="text-align:center; margin:24px 0;">
                        <a href="${verifyURL}" style="display:inline-block; padding:12px 24px; font-size:15px; font-weight:600; color:white; background-color:#2563eb; border-radius:8px; text-decoration:none;">
                            Verify email
                        </a>
                    </div>
                    <p style="font-size: 14px; color:#666; margin: 0px; margin-top: 32px; line-height: 1.5">
                        If this does not work, try pasting the following link into your browser:
                    </p>
                    <p style="font-size: 12px; color:#999; word-breaks:break-all">${verifyURL}</p>
                    <p style="font-size:14px; color:#666; margin:24px 0 0 0; line-height:1.5;">
                        If you didn’t create an account, you can safely ignore this email.
                    </p>
                    <p style="font-size:14px; color:#666; margin:24px 0 0 0; line-height:1.5;">
                        Thank you,<br>
                        The Omni Team
                    </p>
                    <p style="font-size:12px; color:#999; margin-top:16px;">
                        This is an automated message, please don’t reply. Contact our support team if necessary.
                    </p>
                </div>
                <div style="max-width:480px; margin:16px auto 0 auto; text-align:center;">
                    <p style="font-size:12px; color:#888;">
                        © ${new Date().getFullYear()} Omni. All rights reserved.
                    </p>
                </div>
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

export async function POST(request: NextRequest) {

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { createServerClient } = await import("@supabase/ssr");

    function parseCookies(cookieHeader: string) {
        const cookies: Record<string, string> = {};
        if (!cookieHeader) return cookies;
        cookieHeader.split(';').forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            if (name && value) cookies[name] = decodeURIComponent(value);
        });
        return cookies;
    }

    const cookieStore = parseCookies(request.headers.get('cookie') || '');

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore[name];
            },
          },
        }
    );

    const {
        data: {user},
        error,
    } = await supabase.auth.getUser()


    console.log(user, error)

    if (!user) {
        return new Response("Unauthorised", {status: 401})
    }
    
    
    const profile = await getProfile(user.id)

    console.log(profile)

    if (!profile) { 
        return new Response("Unauthorised", {status: 401})
    }


    if (!user.email) {
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
        displayName: profile.display_name,
        token: verify_token
    })

    return new Response('OK')

    // 1. Get user (from session)
    // 2. Rate limit check
    // 3. Generate / reuse token
    // 4. Send email via resend
}