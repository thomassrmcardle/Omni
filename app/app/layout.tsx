import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omni - Your News Hub",
  description: "Stay informed with the latest headlines from around the world. From a global community, find news that matters to you, all in one place.",
};

function FooterLayout() {
  return (
    <footer className="w-full text-center py-4 text-sm text-zinc-500 dark:text-zinc-400">
       <div className="flex space-evenly w-full gap-8">
        <div className="match-stack">
          <h3 className="font-semibold" >Navigation</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="/" className="text-white-200 hover:underline">
              Home
            </a></li>
            <li><a href="/donate" className="text-white-200 hover:underline">
              Donate
            </a></li>
            <li><a href="/contact" className="text-white-200 hover:underline">
              Contact Us
            </a></li>
          </ul>
        </div>

        <div className="match-stack">
          <h3 className="font-semibold">Account</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="/guidelines" className="text-white-200 hover:underline">
              Sign up
            </a></li>
            <li><a href="/privacy" className="text-white-200 hover:underline">
              Login
            </a></li>
            <li><a href="/recover" className="text-white-200 hover:underline">
              Recover Account
            </a></li>
          </ul>
        </div>

        <div className="match-stack">
          <h3 className="font-semibold" >About</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="/mission" className="text-white-200 hover:underline">
              Our Mission
            </a></li>
            <li><a href="/involve" className="text-white-200 hover:underline">
              Get Involved
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

      <p>&copy; {new Date().getFullYear()} Omni. All rights reserved.</p>
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
      <body className="min-h-full flex flex-col">{children}</body>
      <FooterLayout />
    </html>
  );
}
