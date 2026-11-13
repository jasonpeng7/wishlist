"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Snowfall from "./Snowfall";
import "../auth.css";

export default function AuthScene({ children }: { children: ReactNode }) {
  const [snowPaused, setSnowPaused] = useState(false);

  return (
    <div className="auth-scene">
      <Snowfall className="auth-snow" paused={snowPaused} />
      <Link className="auth-brand" href="/" aria-label="Wishr home">
        <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M5 12h18v12H5zM3 8h22v5H3zM14 8v16M14 8C5 9 5 1 9 3c3 1 5 5 5 5Zm0 0c9 1 9-7 5-5-3 1-5 5-5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        Wishr
      </Link>
      <p className="auth-tagline">A little wishing. A lot of giving.</p>
      <div className="auth-cottage">
        <Image className="auth-roof" src="/auth-cottage-roof.svg" alt="" width={520} height={184} priority aria-hidden="true" />
        <div className="auth-wall">{children}</div>
        <div className="auth-ground" aria-hidden="true" />
      </div>
      <footer className="auth-footer" aria-label="Wishr">
        <div className="auth-footer-content">
          <p className="auth-footer-message">
            <span>Make a wishlist</span><span aria-hidden="true">·</span>
            <span>Share with your people</span><span aria-hidden="true">·</span>
            <span>Give thoughtfully</span>
          </p>
          <button type="button" className="auth-snow-toggle" aria-pressed={snowPaused} onClick={() => setSnowPaused((paused) => !paused)}>
            {snowPaused ? "Resume snowfall" : "Pause snowfall"}
          </button>
        </div>
      </footer>
      <svg className="auth-landscape" viewBox="0 0 1600 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 124Q300 71 600 126t550-4 450 12v46H0Z" fill="#263b43" />
        <path d="M0 160q350-53 700-4t900-6v30H0Z" fill="#30454a" />
      </svg>
    </div>
  );
}
