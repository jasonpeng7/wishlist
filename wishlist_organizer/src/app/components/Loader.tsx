"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Generate flakes on mount
    const flakes = Array.from({ length: 30 }, (_, i) => i);
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#090a0f] overflow-hidden">
      {/* Container for snow - contained within loader but uses fixed positioning logic via CSS if needed, 
          or here relative to this div. Let's make it self-contained. */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((flake) => (
          <div
            key={flake}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 2 + 1}s`, // Faster for loader feel
              animationDelay: `${Math.random() * 1}s`,
              width: `${Math.random() * 4 + 3}px`,
              height: `${Math.random() * 4 + 3}px`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Optional: A small "Loading..." text or icon could go here if needed, 
          but request asked specifically for snowfall instead of spinner. */}
      <div className="z-10 text-white font-bold text-lg animate-pulse tracking-widest drop-shadow-md">
        LOADING...
      </div>
    </div>
  );
}
