import React from 'react';

export function Logo({ size = 'md', showText = true, className = '' }) {
  // Dimensions mapping
  const sizes = {
    sm: { box: 'w-7 h-7', text: 'text-lg', glyph: 28 },
    md: { box: 'w-9 h-9', text: 'text-xl', glyph: 36 },
    lg: { box: 'w-11 h-11', text: 'text-2xl', glyph: 44 },
    xl: { box: 'w-16 h-16', text: 'text-3xl', glyph: 64 },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Celestial Network Orb Glyph */}
      <div className={`relative ${currentSize.box} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sphere core background gradient */}
            <radialGradient id="sphereCore" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#7dd3fc" stopOpacity="0.45" />
              <stop offset="80%" stopColor="#818cf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.05" />
            </radialGradient>

            {/* Glowing crest crescent on top of sphere */}
            <linearGradient id="crestGlow" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Orbital ring gradient 1 */}
            <linearGradient id="orbitRing1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>

            {/* Orbital ring gradient 2 */}
            <linearGradient id="orbitRing2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Node glow filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Core Sphere */}
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="url(#sphereCore)"
            stroke="#93c5fd"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />

          {/* Top Luminous Celestial Cap (matching the artwork) */}
          <path
            d="M 23 42 A 32 32 0 0 1 77 42 A 34 22 0 0 0 23 42 Z"
            fill="url(#crestGlow)"
            opacity="0.85"
          />

          {/* Internal Network Constellation Edges */}
          <g stroke="#60a5fa" strokeWidth="1.4" strokeOpacity="0.75" strokeLinecap="round">
            <line x1="30" y1="46" x2="49" y2="36" />
            <line x1="49" y1="36" x2="68" y2="44" />
            <line x1="30" y1="46" x2="38" y2="64" />
            <line x1="49" y1="36" x2="57" y2="58" />
            <line x1="38" y1="64" x2="57" y2="58" />
            <line x1="57" y1="58" x2="74" y2="66" />
            <line x1="68" y1="44" x2="74" y2="66" />
            <line x1="49" y1="36" x2="38" y2="64" strokeOpacity="0.35" strokeDasharray="2 2" />
          </g>

          {/* Elliptical Orbital Rings (Celestial planetary orbits) */}
          {/* Orbit 1: Tilted left */}
          <ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="18"
            transform="rotate(-26 50 50)"
            stroke="url(#orbitRing1)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Orbit 2: Tilted right */}
          <ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="18"
            transform="rotate(34 50 50)"
            stroke="url(#orbitRing2)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Orbit 3: Steep vertical ring */}
          <ellipse
            cx="50"
            cy="50"
            rx="43"
            ry="24"
            transform="rotate(82 50 50)"
            stroke="#818cf8"
            strokeWidth="1.2"
            strokeOpacity="0.5"
            fill="none"
          />

          {/* Network Graph Nodes (Vertices on the sphere) */}
          {/* Node 1: Top Apex */}
          <circle cx="49" cy="36" r="4.2" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" filter="url(#softGlow)" />
          {/* Node 2: Left */}
          <circle cx="30" cy="46" r="3.8" fill="#60a5fa" stroke="#ffffff" strokeWidth="1.5" />
          {/* Node 3: Right */}
          <circle cx="68" cy="44" r="3.8" fill="#818cf8" stroke="#ffffff" strokeWidth="1.5" />
          {/* Node 4: Bottom-Left */}
          <circle cx="38" cy="64" r="3.5" fill="#6366f1" stroke="#ffffff" strokeWidth="1.3" />
          {/* Node 5: Center-Right */}
          <circle cx="57" cy="58" r="4" fill="#818cf8" stroke="#ffffff" strokeWidth="1.5" />
          {/* Node 6: Bottom-Right Violet */}
          <circle cx="74" cy="66" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.6" filter="url(#softGlow)" />

          {/* Orbit Path Satellite Nodes */}
          <circle cx="15" cy="42" r="2.8" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
          <circle cx="83" cy="58" r="2.5" fill="#a855f7" stroke="#ffffff" strokeWidth="1" />

          {/* Sparkle Glint at Top-Right of Cap */}
          <path
            d="M 68 23 Q 68 28 73 28 Q 68 28 68 33 Q 68 28 63 28 Q 68 28 68 23 Z"
            fill="#ffffff"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* Brand Name Text: AlgoNexus */}
      {showText && (
        <span className={`font-extrabold ${currentSize.text} tracking-tight leading-none`}>
          <span className="bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Algo
          </span>
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
            Nexus
          </span>
        </span>
      )}
    </div>
  );
}
