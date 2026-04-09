"use client";

import React from "react";
import { useRouter } from 'next/navigation'
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const router = useRouter();

  var [input_email, setInputEmail] = React.useState("");
  var [input_password, setInputPassword] = React.useState("");

  async function LoginToAccount() {

    const { data, error } : any = await supabase.auth.signInWithPassword({
      email: input_email,
      password: input_password
    });

    if (error) {
      console.error("Error logging in account:", error);
    } else {
      console.log("Account logged in successfully:", data);
      router.push("/profiles/" + data.user.id);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="w-full max-w-md card shadow-md p-8 justify-center">

          <h1 className="text-2xl font-bold mb-4">Log In</h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>.
          </p>

          <input name="email" type="email" placeholder="Email" value={input_email} onChange={(e) => setInputEmail(e.target.value)} className="w-full border border-zinc-300 rounded-md p-2 mb-4" />
          <input name="password" type="password" placeholder="Password" value={input_password} onChange={(e) => setInputPassword(e.target.value)} className="w-full border border-zinc-300 rounded-md p-2 mb-4" />
          

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Can't remember your password? <a href="/forgot-password" target="_blank" className="text-blue-500 hover:underline">Reset it here</a>.
          </p>

          <button className="w-full bg-blue-500 text-white rounded-md p-2" onClick={() => LoginToAccount()}>
            Log In
          </button>

        </div>
      </main>
    </div>
  );
}
