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
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="w-full max-w-md card shadow-md p-8 justify-center">

          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

          <input type="email" placeholder="Email" value={input_email} onChange={(e) => setInputEmail(e.target.value)} className="w-full border border-zinc-300 rounded-md p-2 mb-4" />
          <input type="password" placeholder="Password" value={input_password} onChange={(e) => setInputPassword(e.target.value)} className="w-full border border-zinc-300 rounded-md p-2 mb-4" />
          
          <div className="flex flex-row gap-2 items-center mb-4">
            <input type="radio" id="remember" name="remember" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mb-4" />
            <p className="ml-2 text-sm text-gray-600 dark:text-gray-400">I agree to the
              <a href="/terms" className="text-blue-500 hover:underline">Terms and Conditions</a>
              &
              <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>
            </p>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            All users will also be expected to abide by the <a href="/guidelines" className="text-blue-500 hover:underline">Community Guidelines</a>, designed to ensure safety ande respect. Failure to comply with these guidelines may result in account suspension or termination.
          </p>

          <button className="w-full bg-blue-500 text-white rounded-md p-2" onClick={() => CreateAccount()} disabled={!termsAccepted}>
            Sign Up
          </button>

        </div>
      </main>
    </div>
  );
}
