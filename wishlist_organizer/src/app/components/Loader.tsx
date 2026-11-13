"use client";

import Snowfall from "./Snowfall";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#090a0f] overflow-hidden">
      <Snowfall />
      <div role="status" className="relative z-10 text-white font-bold text-lg animate-pulse tracking-widest drop-shadow-md">
        LOADING...
      </div>
    </div>
  );
}
