"use client";

import { useState } from "react";

export default function Santa() {
  // Fixed 1 second delay
  const [delay] = useState(1);

  return (
    <div
      className="santa-container pointer-events-none fixed z-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg
        viewBox="0 0 500 150"
        className="w-64 md:w-96 drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connecting Reins */}
        <path
          d="M160 75 Q 250 85 350 85 L 450 80"
          stroke="#D4AF37"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Reindeer Group */}
        <g transform="translate(0, 10)">
          {/* Reindeer 1 (Back) */}
          <g transform="translate(350, 0)">
            <path
              d="M10 60 Q 15 55 25 60 L 35 55 Q 40 50 35 45 L 30 50 Q 25 45 20 50 L 15 55 Z"
              fill="#8B4513"
            />{" "}
            {/* Antlers/Head */}
            <path
              d="M5 70 Q 15 60 35 65 Q 45 70 40 80 Q 30 85 20 80 Z"
              fill="#8B4513"
            />{" "}
            {/* Body */}
            <path
              d="M10 80 L 5 95 M 35 80 L 40 95"
              stroke="#8B4513"
              strokeWidth="3"
            />{" "}
            {/* Legs */}
            <circle cx="35" cy="55" r="1.5" fill="black" /> {/* Eye */}
            <circle cx="38" cy="58" r="1.5" fill="red" />{" "}
            {/* Nose - maybe Rudolph at front? No this is back */}
          </g>

          {/* Reindeer 2 */}
          <g transform="translate(390, -5)">
            <path
              d="M10 60 Q 15 55 25 60 L 35 55 Q 40 50 35 45 L 30 50 Q 25 45 20 50 L 15 55 Z"
              fill="#8B4513"
            />
            <path
              d="M5 70 Q 15 60 35 65 Q 45 70 40 80 Q 30 85 20 80 Z"
              fill="#8B4513"
            />
            <path
              d="M10 80 L 5 95 M 35 80 L 40 95"
              stroke="#8B4513"
              strokeWidth="3"
            />
            <circle cx="35" cy="55" r="1.5" fill="black" />
          </g>

          {/* Reindeer 3 */}
          <g transform="translate(430, 5)">
            <path
              d="M10 60 Q 15 55 25 60 L 35 55 Q 40 50 35 45 L 30 50 Q 25 45 20 50 L 15 55 Z"
              fill="#8B4513"
            />
            <path
              d="M5 70 Q 15 60 35 65 Q 45 70 40 80 Q 30 85 20 80 Z"
              fill="#8B4513"
            />
            <path
              d="M10 80 L 5 95 M 35 80 L 40 95"
              stroke="#8B4513"
              strokeWidth="3"
            />
            <circle cx="35" cy="55" r="1.5" fill="black" />
          </g>

          {/* Reindeer 4 (Front - Rudolph) */}
          <g transform="translate(470, 0)">
            <path
              d="M10 60 Q 15 55 25 60 L 35 55 Q 40 50 35 45 L 30 50 Q 25 45 20 50 L 15 55 Z"
              fill="#8B4513"
            />
            <path
              d="M5 70 Q 15 60 35 65 Q 45 70 40 80 Q 30 85 20 80 Z"
              fill="#8B4513"
            />
            <path
              d="M10 80 L 5 95 M 35 80 L 40 95"
              stroke="#8B4513"
              strokeWidth="3"
            />
            <circle cx="35" cy="55" r="1.5" fill="black" />
            <circle cx="39" cy="57" r="2" fill="red" /> {/* Rudolph Nose */}
          </g>
        </g>
        {/* Sleigh Runners */}
        <path
          d="M30 100 C 20 90, 20 110, 30 115 L 150 115 C 170 115, 180 100, 160 95"
          stroke="#FFD700"
          strokeWidth="4"
          fill="none"
        />
        {/* Sleigh Body */}
        <path
          d="M40 80 C 40 110, 100 110, 130 100 L 150 100 C 160 100, 170 90, 170 80 L 160 60 L 50 60 L 40 80 Z"
          fill="#C41E3A"
          stroke="#FFD700"
          strokeWidth="2"
        />
        <path d="M50 60 L 160 60" stroke="#FFD700" strokeWidth="3" />{" "}
        {/* Sleigh Trim */}
        {/* Bag of Toys */}
        <path d="M60 60 Q 50 30 80 20 Q 110 30 100 60 Z" fill="#8B4513" />
        <circle cx="75" cy="35" r="5" fill="#FF69B4" /> {/* Toy ball */}
        <rect x="85" y="30" width="10" height="10" fill="#32CD32" />{" "}
        {/* Toy box */}
        {/* Santa */}
        <g transform="translate(10, 0)">
          {/* Body */}
          <path d="M100 60 Q 120 90 140 60" fill="#C41E3A" />
          {/* Head/Face */}
          <circle cx="120" cy="45" r="12" fill="#FFDAB9" />
          {/* Beard */}
          <path d="M110 50 Q 120 65 130 50 Q 120 55 110 50" fill="white" />
          {/* Hat */}
          <path d="M108 40 Q 120 20 132 40 Z" fill="#C41E3A" />
          <circle cx="120" cy="25" r="4" fill="white" /> {/* Pompom */}
          <rect x="108" y="38" width="24" height="5" rx="2" fill="white" />{" "}
          {/* Hat trim */}
          {/* Arm/Mitten */}
          <path
            d="M125 55 L 145 45"
            stroke="#C41E3A"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="145" cy="45" r="4" fill="black" /> {/* Mitten */}
        </g>
      </svg>
    </div>
  );
}
