import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProfileArea from "@/components/profileArea";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

const site_title = "Omni - Global News";
const site_description = "Stay informed with Omni, with a global community and countless articles, written by people for people.";

export const metadata: Metadata = {
  title: site_title,
  description: site_description,
  openGraph: {
    title: site_title,
    description: site_description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site_title,
    description: site_description,
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



function NavLayout() {
  return (
    <nav className="w-full py-4 px-8 flex items-center justify-between bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-700">
      <div className="flex space-x-8 items-center text-center">
        <a href="/" className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
          Omni
        </a>
        <a href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200">
          About Us
        </a>
        <a href="/donate" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200">
          Donate
        </a>
      </div>
      <input
        type="text"
        placeholder="Search news..."
        className="hidden search-bar sm:block px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-600 dark:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ProfileArea />
    </nav>
  );
}

function FooterLayout() {
  return (
    <footer className="w-full text-center py-4 text-sm text-zinc-500 dark:text-zinc-400">
       <div className="flex space-evenly w-full gap-8">
        
        <div className="match-stack">
          <h3 className="font-semibold" >About</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="/mission" className="text-white-200 hover:underline">
              Our Mission
            </a></li>
            <li><a href="/involve" className="text-white-200 hover:underline">
              Get Involved
            </a></li>
            <li><a href="/reliability" className="text-white-200 hover:underline">
              Reliability
            </a></li>
            <li><a href="/press" className="text-white-200 hover:underline">
              Press Kit
            </a></li>
            <li><a href="/contact" className="text-white-200 hover:underline">
              Contact Us
            </a></li>
          </ul>
        </div>
        
        <div className="match-stack">
          <h3 className="font-semibold" >Navigation</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="/" className="text-white-200 hover:underline">
              Home
            </a></li>
            <li><a href="/" className="text-white-200 hover:underline">
              Profile
            </a></li>
            <li><a href="/donate" className="text-white-200 hover:underline">
              Donate
            </a></li>
          </ul>
        </div>

        <div className="match-stack">
          <h3 className="font-semibold">Social</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="/guidelines" className="text-white-200 hover:underline">
              Instagram
            </a></li>
          </ul>
        </div>

        <div className="match-stack">
          <h3 className="font-semibold" >Privacy and Terms</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="/guidelines" className="text-white-200 hover:underline">
              Community Guidelines
            </a></li>
            <li><a href="/privacy" className="text-white-200 hover:underline">
              Privacy Policy
            </a></li>
            <li><a href="/terms" className="text-white-200 hover:underline">
              Terms of Service
            </a></li>
          </ul>
        </div>
      </div>

      <p className="caption">&copy; {new Date().getFullYear()} Omni. All rights reserved.</p>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <NavLayout />
      <body className="min-h-full flex flex-col">{children}</body>
      <FooterLayout />
    </html>
  );
}
