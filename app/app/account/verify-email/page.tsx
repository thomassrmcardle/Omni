
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

    function EmailLabel({email }: { email?: string | null }) {
        if (email) {
            return <h3 className="mt-4 text-2xl w-full text-center">{email}</h3>;
        }
        else {
            return <div className="animate-pulse mt-4 flex flex-row items-center w-full justify-center">
                <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-2" />
            </div>
        }
    }

    return <div className="bg-white dark:bg-black py-32 px-16 w-full" >
        <div className="flex flex-col items-center justify-center">
            <div className="card shadow-md p-8 justify-center max-w-lg">
                <EmailLabel email={email} />
                <h2 className="w-full font-bold text-xl mt-8">Check Your Email</h2>
                <p className="w-full mt-2">We've sent you an email with a link to verify your email address. Please check your inbox and click the link to complete the verification process. It may be in your spam folder.</p>

                <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 text-center w-full mt-4">
                    Resend Email
                </button>

                <p className="w-full text-zinc-600 dark:text-zinc-400 text-center mt-4">Need to change your email? <a href="/account/settings" className="text-blue-500 hover:underline">Open Account Settings</a>.</p>
            </div>
        </div>
    </div>
}