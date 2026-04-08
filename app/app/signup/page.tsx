"use client";

import React from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Home() {

    var [input_email, setInputEmail] = React.useState("");
    var [input_password, setInputPassword] = React.useState("");

    async function CreateAccount() {

        const { data, error } : any = supabase.auth.signUp({
            email: input_email,
            password: input_password
        });

        if (error) {
            console.error("Error creating account:", error);
        } else {
            console.log("Account created successfully:", data);
            document.location.href = "/profiles/" + data.user.id;
        }
    }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full max-w-md bg-white dark:bg-black rounded-lg shadow-md p-8">
            <input type="email" placeholder="Email" value={input_email} onChange={(e) => setInputEmail(e.target.value)} className="w-full border border-zinc-300 rounded-md p-2 mb-4" />
            <input type="password" placeholder="Password" value={input_password} onChange={(e) => setInputPassword(e.target.value)} className="w-full border border-zinc-300 rounded-md p-2 mb-4" />
            <button className="w-full bg-blue-500 text-white rounded-md p-2" onClick={() => CreateAccount()}>
              Sign Up
            </button>

        </div>
      </main>
    </div>
  );
}
