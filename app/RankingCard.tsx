"use client";

import { useUser } from "@supabase/auth-helpers-react";
import Badge from "~components/Badge";

export default function RankingCard() {
  const user = useUser();

  if (!user) return null;

  return (
    <>
      <div className="relative flex flex-col gap-2 rounded-lg border border-primary-700 bg-primary-800 p-4">
        <div className="flex items-center gap-4">
          <span className="flex uppercase tracking-wider text-primary-400">
            Ranking
          </span>
          <Badge>coming soon</Badge>
        </div>
        <div className="flex flex-col gap-3 py-4 text-primary-400">
          <div className="flex w-full flex-row items-center justify-between">
            <span>skdjhfsd</span>
            <span className="font-mono tracking-wider">7040</span>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <span>sdkfsdfsdf</span>
            <span className="font-mono tracking-wider">1508</span>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <span>skd_jh1</span>
            <span className="font-mono tracking-wider">784</span>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <span>TTEfvhdv88</span>
            <span className="font-mono tracking-wider">500</span>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <span>fdf__dfg</span>
            <span className="font-mono tracking-wider">100</span>
          </div>
        </div>
        <div className="z-90 absolute inset-x-2 top-11 bottom-2 backdrop-blur-sm"></div>
      </div>
    </>
  );
}
