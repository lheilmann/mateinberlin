"use client";

export default function RankingCard() {
  return (
    <>
      <div className="relative flex flex-col p-4 rounded-lg border border-zinc-700 bg-zinc-800">
        <div className="flex gap-4 items-center">
          <span className="flex text-zinc-500 uppercase tracking-wider">
            Ranking
          </span>
          <div className="flex items-center justify-center bg-zinc-700 px-1.5 py-0.5 rounded">
            <span className="text-sm text-zinc-400">coming soon</span>
          </div>
        </div>
        <div className="flex flex-col py-4 gap-2">
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
