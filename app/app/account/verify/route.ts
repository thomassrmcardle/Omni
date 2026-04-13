export const runtime = "nodejs";

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // 🔥 NOT public
);

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) return new Response("Invalid", {status: 400});

    const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('email_verify_token', token)
        .single()
    
    if (error || !data) return new Response("Invalid", {status: 400});

    if (new Date(data.email_verify_expires_at) < new Date()) {
        return new Response("Token expired", { status: 400 });
    }

    console.log('Found user', data.id)

    const { data: updatedData, error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({
            email_verified: true,
            email_verify_token: null,
            email_verify_expires_at: null,
        })
        .eq('id', data.id)
        .select()

    if (updateError) {
        console.error(updateError);
        return new Response("Failed to update", { status: 500 });
    }

    console.log('Updated', updatedData)

    return Response.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/account/verify-success`);
}