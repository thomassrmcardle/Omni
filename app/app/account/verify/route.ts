import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) return new Response("Invalid", {status: 400});

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email_verify_token', token)
        .single()

    if (new Date(data.email_verify_expires_at) < new Date()) {
        return new Response("Token expired", { status: 400 });
    }
    
    if (error || !data) return new Response("Invalid", {status: 400});

    const { error: updateError } = await supabase
        .from('profiles')
        .update({
            email_verified: true,
            email_verify_token: null,
            email_verify_expires_at: null,
        })
        .eq('id', data.id)

    if (updateError) {
        console.error(updateError);
        return new Response("Failed to update", { status: 500 });
    }

    return Response.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/account/verify-success`);
}