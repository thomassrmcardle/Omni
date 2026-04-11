"use client";

import getProfile from "@/operators/profileManager";
import { useEffect, useState } from "react";

export default function ProfileCard({ userId, compact } : any) {

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    let isMounted = true; // flag to prevent state updates after unmount
    async function loadProfile() {
      try {
        const profileData = await getProfile(userId);
        if (isMounted) {
          setProfile(profileData || {}); // fallback prevents infinite null
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
        if (isMounted) setProfile(null); // break out of loading state
      }
    }
    if (userId) {
      loadProfile();
    }
    return () => {
      isMounted = false; // cleanup flag on unmount
    };
  }, [userId]);

  function getImg() {
    if (compact) {
      return "https://placehold.co/24x24";
    } else {
      return "https://placehold.co/42x42";
    }
  }

  var grow = compact ? "" : "w-full";
  var iconSize = compact ? "w-6 h-6" : "w-10 h-10";


  if (!profile) {
    return (
      <div className={"flex flex-row items-center "+grow+" rounded-lg border border-zinc-200 p-4 dark:border-zinc-700 gap-2 animate-pulse"}>
          <div className={"rounded-full bg-zinc-300 dark:bg-zinc-700 "+iconSize} />
          <div className="flex flex-col w-full">
              <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-2" />
              {compact ? null : <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-1/3" />}
          </div>
      </div>
    );
  }

  return (
    <a className={grow} href={`/profiles/${userId}`} >
        <div className={"flex flex-row items-center flex-1 "+grow+" rounded-lg border border-zinc-200 p-4 dark:border-zinc-700 gap-2"}>
            <img src={getImg()} alt="Profile Picture" className={"rounded-full "+iconSize} />
            <div className="flex flex-col">
                <h2 className="font-semibold">{profile?.display_name || "New User"}</h2>
                {compact ? null : <p className="text-sm text-zinc-600 dark:text-zinc-400">{profile?.job_title || "Data analyst"}</p>}
            </div>
        </div>
    </a>
  );
}