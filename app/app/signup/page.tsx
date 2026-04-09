"use client";

import React from "react";
import { useRouter } from 'next/navigation'
import { supabase } from "../../lib/supabaseClient";

export default function Home() {
  const router = useRouter();

  var [input_email, setInputEmail] = React.useState("");
  var [input_password, setInputPassword] = React.useState("");

  var [termsAccepted, setTermsAccepted] = React.useState(false);

  async function CreateAccount() {

    const { data, error } : any = await supabase.auth.signUp({
      email: input_email,
      password: input_password
    });

    if (error) {
      console.error("Error creating account:", error);
    } else {
      console.log("Account created successfully:", data);
      router.push("/profiles/" + data.user.id);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full max-w-md bg-white dark:bg-black rounded-lg shadow-md p-8 justify-center">

          <h2>Sign Up</h2>

          <input type="email" placeholder="Email" value={input_email} onChange={(e) => setInputEmail(e.target.value)} className="w-full border border-zinc-300 rounded-md p-2 mb-4" />
          <input type="password" placeholder="Password" value={input_password} onChange={(e) => setInputPassword(e.target.value)} className="w-full border border-zinc-300 rounded-md p-2 mb-4" />
          
          <div>
            <input type="radio" id="remember" name="remember" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mb-4" />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">I agree to the Terms and Conditions, Privacy Policy and Community Guidelines</label>
          </div>

          <button className="w-full bg-blue-500 text-white rounded-md p-2" onClick={() => CreateAccount()} disabled={!termsAccepted}>
            Sign Up
          </button>

        </div>
      </main>
    </div>
  );
}
