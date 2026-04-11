
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";

type SupabaseUser = {
  id: string;
  [key: string]: any;
};

export default function VerifyMessageScreen() {

    const [email, setEmail] = useState<string | null>(null);
    
    useEffect(() => {
        supabase.auth.getUser().then(({ data }: any) => {
            setEmail(data.user?.email ?? null);
        });
    
        // Create listener for login
        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setEmail(session?.user?.email ?? null);
        });
    
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return <div className="flex flex-col items-center justify-center gap-8 mt-16">
        <div className="card shadow-md p-8 justify-center">
            <h3 className="mt-8 mb-8">{email}</h3>
            <h2 className="w-full">Check Your Email</h2>
            <p className="w-full">We've sent you an email with a link to verify your email address. Please check your inbox and click the link to complete the verification process. It may be in your spam folder.</p>

            <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 text-center">
                Resend Email
            </button>

            <p className="w-full text-zinc-600 dark:text-zinc-400 text-center mt-8">Need to change your email? <a href="/account/settings" className="text-blue-500 hover:underline">Open Account Settings</a>.</p>
        </div>
    </div>
}