"use client";

import { useUser } from "@supabase/auth-helpers-react";
import Badge from "../components/Badge";

export default function RankingCard() {
  const user = useUser();

  if (!user) return null;

  return (
    <>
      <div className="relative flex flex-col p-4 rounded-lg border border-lila-700 bg-lila-800">
        <div className="flex gap-4 items-center">
          <span className="flex text-lila-400 uppercase tracking-wider">
            Ranking
          </span>
          <Badge>coming soon</Badge>
        </div>
        <div className="flex flex-col py-4 gap-2 text-lila-300">
          <div className="flex flex-row w-full items-center justify-between">
            <span>skdjhfsd</span>
            <span className="font-mono tracking-wider">7040</span>
          </div>
          <div className="flex flex-row w-full items-center justify-between">
            <span>sdkfsdfsdf</span>
            <span className="font-mono tracking-wider">1508</span>
          </div>
          <div className="flex flex-row w-full items-center justify-between">
            <span>skd_jh1</span>
            <span className="font-mono tracking-wider">784</span>
          </div>
          <div className="flex flex-row w-full items-center justify-between">
            <span>TTEfvhdv88</span>
            <span className="font-mono tracking-wider">500</span>
          </div>
        </div>
        <div className="absolute inset-x-2 top-11 bottom-2 backdrop-blur-sm z-90"></div>
      </div>
    </>
  );
}
