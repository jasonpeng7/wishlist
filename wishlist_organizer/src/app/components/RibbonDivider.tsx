"use client";

const RibbonDivider = () => (
  <div className="flex justify-center items-center my-4">
    <svg width="300" height="100" viewBox="0 0 300 100">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: '#ffd700', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#ffc107', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      {/* Knot */}
      <path d="M140,40 C135,35 135,65 140,60 L160,60 C165,65 165,35 160,40 Z" fill="#ffc107" />
      
      {/* Left side of bow */}
      <path d="M145,50 C 0,0 0,100 145,50 Z" fill="url(#goldGradient)" />
      <path d="M145,50 L10,10 C 0,20 0,80 10,90 L145,50" fill="#ffd700" />
      
      {/* Left side grooves */}
      <path d="M145,50 C 60,30 60,40 145,50 Z" fill="#000" opacity="0.1" />
      <path d="M145,50 C 60,70 60,60 145,50 Z" fill="#000" opacity="0.1" />
      
      {/* Right side of bow */}
      <path d="M155,50 C 300,0 300,100 155,50 Z" fill="url(#goldGradient)" />
      <path d="M155,50 L290,10 C 300,20 300,80 290,90 L155,50" fill="#ffd700" />
      
      {/* Right side grooves */}
      <path d="M155,50 C 240,30 240,40 155,50 Z" fill="#000" opacity="0.1" />
      <path d="M155,50 C 240,70 240,60 155,50 Z" fill="#000" opacity="0.1" />
    </svg>
  </div>
);

export default RibbonDivider;
