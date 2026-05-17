// components/journalist/JournalistAvatar.tsx — SVG illustration of Priya AI

'use client';

export default function JournalistAvatar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 280"
      className="w-full h-full object-cover rounded-t-xl"
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Skin tone */}
        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c58c67" />
          <stop offset="100%" stopColor="#8d5f42" />
        </linearGradient>

        {/* Blazer texture */}
        <pattern id="blazerTexture" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0,0 L10,10 M10,0 L0,10" stroke="#111" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>

      {/* Studio Background */}
      <rect width="200" height="280" fill="url(#bgGradient)" />
      
      {/* Studio Grid Lines */}
      <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1">
        <path d="M 0 50 L 200 50 M 0 100 L 200 100 M 0 150 L 200 150 M 0 200 L 200 200 M 0 250 L 200 250" />
        <path d="M 50 0 L 50 280 M 100 0 L 100 280 M 150 0 L 150 280" />
      </g>

      {/* Torso & Blazer */}
      <path
        d="M 40 280 L 45 200 C 45 170 60 150 100 150 C 140 150 155 170 155 200 L 160 280 Z"
        fill="#1e1e24"
      />
      <path
        d="M 40 280 L 45 200 C 45 170 60 150 100 150 C 140 150 155 170 155 200 L 160 280 Z"
        fill="url(#blazerTexture)"
      />

      {/* Collar/Shirt */}
      <path d="M 85 152 L 100 180 L 115 152 Z" fill="#f8fafc" />
      <path d="M 75 145 L 85 180 L 100 195 L 115 180 L 125 145 Z" fill="#cbd5e1" opacity="0.8" />

      {/* Neck */}
      <path d="M 85 110 L 85 160 C 85 160 100 165 115 160 L 115 110 Z" fill="url(#skinGradient)" />
      {/* Neck shadow */}
      <path d="M 85 130 C 95 145 105 145 115 130 L 115 155 C 105 165 95 165 85 155 Z" fill="#000" opacity="0.15" />

      {/* Head */}
      <ellipse cx="100" cy="100" rx="35" ry="42" fill="url(#skinGradient)" />

      {/* Hair (Back) */}
      <path d="M 65 90 C 60 140 70 180 80 185 C 80 185 60 140 68 80 Z" fill="#111111" />
      <path d="M 135 90 C 140 140 130 180 120 185 C 120 185 140 140 132 80 Z" fill="#111111" />

      {/* Face features */}
      {/* Eyebrows */}
      <path d="M 78 85 Q 85 82 92 86" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 122 85 Q 115 82 108 86" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Eyes */}
      <ellipse cx="85" cy="95" rx="5" ry="3.5" fill="#fff" />
      <circle cx="85" cy="95" r="2.5" fill="#2d1a11" />
      <ellipse cx="115" cy="95" rx="5" ry="3.5" fill="#fff" />
      <circle cx="115" cy="95" r="2.5" fill="#2d1a11" />
      
      {/* Eyeliner/lashes */}
      <path d="M 79 94 Q 85 90 91 95" fill="none" stroke="#111" strokeWidth="1.5" />
      <path d="M 121 94 Q 115 90 109 95" fill="none" stroke="#111" strokeWidth="1.5" />

      {/* Nose */}
      <path d="M 100 95 L 100 115 Q 102 118 105 116" fill="none" stroke="#6b442b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Lips */}
      <path d="M 90 125 Q 100 122 110 125 Q 100 132 90 125" fill="#a05252" />
      <path d="M 90 125 Q 100 128 110 125" fill="none" stroke="#702b2b" strokeWidth="0.5" />

      {/* Hair (Front/Bangs) */}
      <path d="M 63 100 C 60 70 75 50 100 50 C 125 50 140 70 137 100 C 130 65 110 60 100 65 C 90 60 70 65 63 100 Z" fill="#181818" />

      {/* Microphone/Lapel */}
      <circle cx="90" cy="180" r="4" fill="#111" />
      <rect x="89" y="176" width="2" height="4" fill="#333" />
      <circle cx="90" cy="180" r="1" fill="#444" />

      {/* LIVE Indicator Overlay */}
      <g transform="translate(10, 10)">
        <rect width="45" height="18" rx="4" fill="rgba(0,0,0,0.6)" />
        <circle cx="12" cy="9" r="3" fill="#ff3b5c">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="18" y="12.5" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">LIVE</text>
      </g>
    </svg>
  );
}
