"use client";

import getProfile from "@/operators/profileManager";
import { useEffect, useState } from "react";

export default function ProfileCard({ profile, userId, compact } : any) {

  function getImg() {
    if (compact) {
      return "https://placehold.co/24x24";
    } else {
      return "https://placehold.co/42x42";
    }
  }

  var grow = "w-full";
  var iconSize = compact ? "w-6 h-6" : "w-10 h-10";

  if (!profile) {
    return (
      <a className={grow + " animate-pulse"} href={`/profiles/${userId || 123}`} >
          <div className={"flex flex-row items-center "+grow+" rounded-lg border border-zinc-200 p-4 dark:border-zinc-700 gap-2"}>
              <div className={"rounded-full bg-zinc-300 dark:bg-zinc-700 " + iconSize} />
              <div className="flex flex-col w-full">
                  <div className="bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-2 h-4" />
                  <div className="bg-zinc-300 dark:bg-zinc-700 rounded w-1/4 h-4" />
              </div>
          </div>
      </a>
    );
  }

  return (
    <a className={grow} href={`/profiles/${profile.id}`} >
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