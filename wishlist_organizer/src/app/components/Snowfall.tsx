"use client";

import { CSSProperties, memo, useEffect, useState } from "react";

function Snowfall({ paused = false, className = "" }: { paused?: boolean; className?: string }) {
  const [snowflakes, setSnowflakes] = useState<CSSProperties[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, () => {
      const diameter = `${Math.random() * 3 + 2}px`;
      return {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 14 + 17}s`,
        animationDelay: `${-Math.random() * 31}s`,
        width: diameter,
        height: diameter,
        "--snow-rest": `${Math.random() * 100}%`,
      } as CSSProperties;
    });
    setSnowflakes(flakes);
  }, []);

  return (
    <div
      className={`snow-container fixed inset-0 z-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {snowflakes.map((style, index) => (
        <div
          key={index}
          className="snowflake"
          style={{ ...style, animationPlayState: paused ? "paused" : "running" }}
        />
      ))}
    </div>
  );
}

export default memo(Snowfall);

