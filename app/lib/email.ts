import { Resend } from "resend"
import VerifyEmail from "@/emails/VerifyEmail"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerifyEmail({email, displayName, token} : {email: string, displayName: string, token: string}) {
    if (email.length == 0) return {}

    const verifyURL = `${process.env.NEXT_PUBLIC_SITE_URL}/account/verify?token=${token}`;

    await resend.emails.send({
        from: "Omni <onboarding@resend.dev>",
        to: email,
        subject: "Verify Your Email",
        react: VerifyEmail({displayName, verifyURL})
    })
} 