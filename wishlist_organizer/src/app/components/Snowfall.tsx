"use client";

import { useEffect, useState } from "react";

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Create snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => i);
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="snow-container fixed inset-0 z-0 pointer-events-none">
      {snowflakes.map((flake) => (
        <div
          key={flake}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
            width: `${Math.random() * 5 + 5}px`,
            height: `${Math.random() * 5 + 5}px`,
          }}
        />
      ))}
    </div>
  );
}

