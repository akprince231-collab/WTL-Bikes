import React from 'react';

export type BicycleStyleMode = 'realistic' | 'wireframe' | 'silhouette' | 'gold-accent';

interface BicycleGraphicProps {
  className?: string;
  mode?: BicycleStyleMode;
  wheelAngle?: number; // rotation in degrees
  activePart?: string | null; // e.g. 'frame', 'wheels', 'drivetrain', 'cockpit', 'brakes', 'saddle'
  accentColor?: string;
  isSpinning?: boolean;
  spinDuration?: number; // seconds per full turn
  facingDirection?: 'right' | 'left';
}

export const BicycleGraphic: React.FC<BicycleGraphicProps> = ({
  className = '',
  mode = 'realistic',
  wheelAngle = 0,
  activePart = null,
  accentColor = '#FBBF24',
  isSpinning = false,
  spinDuration = 2.2,
  facingDirection = 'right',
}) => {
  // 24 spoke lines generation for wheel realism
  const spokeCount = 20;
  const spokes = Array.from({ length: spokeCount }, (_, i) => {
    const angle = (i * 360) / spokeCount;
    const rad = (angle * Math.PI) / 180;
    const x1 = Math.cos(rad) * 20;
    const y1 = Math.sin(rad) * 20;
    const x2 = Math.cos(rad) * 115;
    const y2 = Math.sin(rad) * 115;
    return { x1, y1, x2, y2, angle };
  });

  const isWireframe = mode === 'wireframe';
  const isSilhouette = mode === 'silhouette';
  const isGold = mode === 'gold-accent';

  // Dynamic colors based on mode
  const frameColor = isWireframe
    ? '#38BDF8'
    : isGold
    ? '#FBBF24'
    : isSilhouette
    ? '#0F172A'
    : '#1E293B';

  const frameHighlight = isWireframe
    ? '#60A5FA'
    : isGold
    ? '#FDE047'
    : accentColor;

  const rimColor = isWireframe
    ? '#1E293B'
    : isSilhouette
    ? '#0A0F1D'
    : '#111827';

  const spokeColor = isWireframe
    ? 'rgba(56, 189, 248, 0.4)'
    : isGold
    ? 'rgba(251, 191, 36, 0.5)'
    : isSilhouette
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(203, 213, 225, 0.35)';

  const tireColor = isWireframe ? '#0E1726' : '#0B0F19';

  return (
    <div
      className={`relative inline-block ${facingDirection === 'left' ? '-scale-x-100' : ''} ${className}`}
      style={{ filter: isWireframe ? 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.35))' : 'drop-shadow(0 14px 28px rgba(0,0,0,0.4))' }}
    >
      <svg
        viewBox="0 0 1000 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="carbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A3447" />
            <stop offset="50%" stopColor="#172033" />
            <stop offset="100%" stopColor="#0B1120" />
          </linearGradient>

          <linearGradient id="accentYellowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="discRotorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Wheel group template */}
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ========================================================
            REAR WHEEL (Center at X: 200, Y: 350)
           ======================================================== */}
        <g
          transform="translate(200, 350)"
          className={isSpinning ? 'origin-center' : ''}
          style={{
            transformOrigin: '200px 350px',
            transform: isSpinning ? undefined : `rotate(${wheelAngle}deg)`,
            animation: isSpinning ? `spin ${spinDuration}s linear infinite` : undefined,
          }}
        >
          {/* Outer Tire (700x28c) */}
          <circle r="145" stroke={tireColor} strokeWidth="18" fill="none" />
          {/* Reflective strip */}
          <circle r="136" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.45" fill="none" strokeDasharray="12 4" />
          {/* Deep Aero Carbon Rim (50mm depth) */}
          <circle
            r="126"
            stroke={rimColor}
            strokeWidth="19"
            fill="none"
            className={activePart === 'wheels' ? 'stroke-amber-400 animate-pulse' : ''}
          />
          {/* Rim Branding Accent */}
          <circle r="117" stroke={frameHighlight} strokeWidth="2.5" strokeDasharray="30 180" fill="none" opacity="0.8" />
          
          {/* Spokes */}
          <g stroke={spokeColor} strokeWidth="1.2">
            {spokes.map((s, idx) => (
              <line key={`rear-spoke-${idx}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
            ))}
          </g>

          {/* Disc Brake Rotor 160mm */}
          <circle
            r="38"
            stroke="url(#discRotorGrad)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="6 2"
            opacity="0.9"
            className={activePart === 'brakes' ? 'stroke-amber-400 stroke-[6px]' : ''}
          />
          <circle r="34" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" fill="none" />

          {/* Rear Cassette Sprockets (12-speed) */}
          <circle r="26" stroke="#94A3B8" strokeWidth="6" fill="#1E293B" strokeDasharray="4 2" />
          <circle r="16" stroke="#CBD5E1" strokeWidth="4" fill="#0F172A" />

          {/* Hub Shell */}
          <circle r="11" fill={accentColor} />
          <circle r="4" fill="#0F172A" />
        </g>

        {/* ========================================================
            FRONT WHEEL (Center at X: 800, Y: 350)
           ======================================================== */}
        <g
          transform="translate(800, 350)"
          className={isSpinning ? 'origin-center' : ''}
          style={{
            transformOrigin: '800px 350px',
            transform: isSpinning ? undefined : `rotate(${wheelAngle}deg)`,
            animation: isSpinning ? `spin ${spinDuration}s linear infinite` : undefined,
          }}
        >
          {/* Outer Tire */}
          <circle r="145" stroke={tireColor} strokeWidth="18" fill="none" />
          {/* Reflective safety band */}
          <circle r="136" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.45" fill="none" strokeDasharray="12 4" />
          {/* Deep Aero Carbon Rim */}
          <circle
            r="126"
            stroke={rimColor}
            strokeWidth="19"
            fill="none"
            className={activePart === 'wheels' ? 'stroke-amber-400 animate-pulse' : ''}
          />
          <circle r="117" stroke={frameHighlight} strokeWidth="2.5" strokeDasharray="30 180" fill="none" opacity="0.8" />

          {/* Spokes */}
          <g stroke={spokeColor} strokeWidth="1.2">
            {spokes.map((s, idx) => (
              <line key={`front-spoke-${idx}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
            ))}
          </g>

          {/* Front Disc Brake Rotor 160mm */}
          <circle
            r="38"
            stroke="url(#discRotorGrad)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="6 2"
            opacity="0.9"
            className={activePart === 'brakes' ? 'stroke-amber-400 stroke-[6px]' : ''}
          />
          <circle r="34" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" fill="none" />

          {/* Front Hub Shell */}
          <circle r="11" fill={accentColor} />
          <circle r="4" fill="#0F172A" />
        </g>

        {/* ========================================================
            REAR DERAILLEUR & CHAINSTAY HARDWARE
           ======================================================== */}
        <g opacity={isWireframe ? 0.6 : 1}>
          {/* Rear dropouts */}
          <polygon points="195,345 210,345 205,360 190,360" fill="#64748B" />
          {/* Rear Derailleur Body */}
          <path d="M196 355 L190 385 L208 402 L216 388 Z" fill="#334155" stroke="#475569" strokeWidth="1.5" />
          {/* Upper & Lower Jockey Wheels */}
          <circle cx="196" cy="382" r="7" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="210" cy="398" r="7" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />
          {/* Derailleur cage accent */}
          <line x1="196" y1="382" x2="210" y2="398" stroke={accentColor} strokeWidth="2" />
        </g>

        {/* ========================================================
            CHAIN & CRANKSET (BB at X: 470, Y: 350)
           ======================================================== */}
        {/* Drive Chain */}
        <path
          d="M200 338 L470 326 A28 28 0 0 1 498 350 L470 374 L208 400 L196 382 L200 362 Z"
          fill="none"
          stroke={isWireframe ? 'rgba(56, 189, 248, 0.5)' : '#94A3B8'}
          strokeWidth="3.5"
          strokeDasharray="4 2"
          opacity={isWireframe ? 0.7 : 0.9}
          className={activePart === 'drivetrain' ? 'stroke-amber-400 stroke-[5px]' : ''}
        />

        {/* ========================================================
            MAIN BICYCLE FRAME (Aero Diamond Geometry)
           ======================================================== */}
        <g
          className={`transition-all duration-300 ${
            activePart === 'frame' ? 'filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]' : ''
          }`}
        >
          {/* Chainstays (BB 470,350 to Rear Dropout 200,350) */}
          <line
            x1="200"
            y1="350"
            x2="470"
            y2="350"
            stroke="url(#carbonGradient)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {isWireframe && (
            <line x1="200" y1="350" x2="470" y2="350" stroke={frameHighlight} strokeWidth="2" strokeDasharray="5 3" />
          )}

          {/* Seatstays (Rear Dropout 200,350 to Seat Cluster 390,170) */}
          <line
            x1="200"
            y1="350"
            x2="390"
            y2="170"
            stroke="url(#carbonGradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Seatstay Yellow Aero Line */}
          <line x1="220" y1="330" x2="380" y2="180" stroke={accentColor} strokeWidth="3" opacity="0.85" />

          {/* Seat Tube (BB 470,350 to Seat Junction 390,170) */}
          <line
            x1="470"
            y1="350"
            x2="390"
            y2="170"
            stroke="url(#carbonGradient)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          {/* Down Tube (BB 470,350 to Headtube Lower 710,195) */}
          <path
            d="M470 350 L710 195"
            stroke="url(#carbonGradient)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          {/* Down Tube Brand Graphic: "WTL" Slanted Accent */}
          {!isWireframe && (
            <g transform="translate(560, 275) rotate(-32)">
              <rect x="-40" y="-7" width="80" height="14" fill="#0A0F1D" rx="2" />
              <text
                x="-32"
                y="5"
                fill="#FFFFFF"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="900"
                fontSize="12"
                letterSpacing="4"
              >
                WTL
              </text>
              <rect x="24" y="-7" width="8" height="14" fill={accentColor} />
            </g>
          )}

          {/* Top Tube (Seat Junction 390,170 to Headtube Upper 700,150) */}
          <line
            x1="390"
            y1="170"
            x2="700"
            y2="150"
            stroke="url(#carbonGradient)"
            strokeWidth="22"
            strokeLinecap="round"
          />
          {/* Top Tube Speed Slash Accent */}
          <line x1="420" y1="168" x2="680" y2="151" stroke={accentColor} strokeWidth="3" opacity="0.9" />

          {/* Head Tube (700,150 to 710,205) */}
          <line
            x1="700"
            y1="145"
            x2="714"
            y2="210"
            stroke="url(#carbonGradient)"
            strokeWidth="26"
            strokeLinecap="round"
          />

          {/* Front Fork (Headtube 714,210 to Front Dropout 800,350) */}
          <line
            x1="714"
            y1="210"
            x2="800"
            y2="350"
            stroke="url(#carbonGradient)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Fork Blade Contrast Line */}
          <line x1="724" y1="225" x2="796" y2="345" stroke={accentColor} strokeWidth="3" opacity="0.9" />

          {/* Wireframe Geometry Lines & Measurement Points */}
          {isWireframe && (
            <g stroke="#38BDF8" strokeWidth="1.5">
              <circle cx="470" cy="350" r="4" fill="#38BDF8" />
              <circle cx="390" cy="170" r="4" fill="#38BDF8" />
              <circle cx="700" cy="150" r="4" fill="#38BDF8" />
              <circle cx="800" cy="350" r="4" fill="#38BDF8" />
              <circle cx="200" cy="350" r="4" fill="#38BDF8" />
              {/* Geometry Triangles */}
              <polygon points="200,350 470,350 390,170" fill="rgba(56,189,248,0.06)" strokeDasharray="4 2" />
              <polygon points="470,350 700,150 714,210" fill="rgba(56,189,248,0.06)" strokeDasharray="4 2" />
              {/* Virtual Top Tube length dimension */}
              <line x1="390" y1="140" x2="700" y2="140" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="525" y="132" fill="#FBBF24" fontSize="10" fontFamily="Space Grotesk" textAnchor="middle">
                TT: 554 MM / 73.5°
              </text>
            </g>
          )}
        </g>

        {/* ========================================================
            SEATPOST & RACING SADDLE (Contact Point)
           ======================================================== */}
        <g
          className={`transition-all duration-300 ${
            activePart === 'saddle' ? 'filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]' : ''
          }`}
        >
          {/* Aero Carbon Seatpost */}
          <line x1="390" y1="170" x2="368" y2="120" stroke="#1E293B" strokeWidth="16" strokeLinecap="square" />
          <line x1="390" y1="170" x2="368" y2="120" stroke="#334155" strokeWidth="6" />
          {/* Seat Clamp */}
          <rect x="358" y="112" width="20" height="8" rx="2" fill="#64748B" />
          {/* 3D-Printed Aero Saddle */}
          <path
            d="M320 112 Q350 110 395 110 Q425 112 432 118 Q410 120 370 122 Q330 122 320 112 Z"
            fill={isWireframe ? '#0E1726' : '#0F172A'}
            stroke={frameHighlight}
            strokeWidth="2"
          />
          {/* Honeycomb lattice highlight on saddle */}
          <path d="M340 114 Q370 113 410 113" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 2" />
        </g>

        {/* ========================================================
            COCKPIT: STEM, DROP HANDLEBARS, BRAKE HOODS
           ======================================================== */}
        <g
          className={`transition-all duration-300 ${
            activePart === 'cockpit' ? 'filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]' : ''
          }`}
        >
          {/* Integrated Aero Stem (Headtube top 700,145 to 745,120) */}
          <path d="M695 150 L700 135 L745 125 L750 138 Z" fill="#1E293B" stroke="#475569" strokeWidth="1" />
          {/* Stem Faceplate with yellow accent */}
          <rect x="744" y="122" width="8" height="16" rx="2" fill={accentColor} />

          {/* Ergonomic Drop Handlebars (Bar sweep + drop curve) */}
          {/* Tops and Forward Reach */}
          <path
            d="M748 130 Q785 128 800 134 Q810 142 805 165 Q795 185 770 190"
            fill="none"
            stroke={isWireframe ? '#38BDF8' : '#1E293B'}
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Bar Tape Texture Highlight */}
          <path
            d="M752 130 Q785 128 800 134 Q810 142 805 165 Q795 185 770 190"
            fill="none"
            stroke="#475569"
            strokeWidth="4"
            strokeDasharray="4 3"
          />

          {/* Integrated Brake / Shifter Hoods */}
          <path
            d="M796 132 Q815 130 818 142 Q810 152 798 152 Z"
            fill="#0F172A"
            stroke={accentColor}
            strokeWidth="1.5"
          />
          {/* Brake Lever */}
          <path d="M814 144 Q816 165 808 175" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ========================================================
            CRANKSET, CHAINRING & PEDALS (BB at 470, 350)
           ======================================================== */}
        <g
          transform="translate(470, 350)"
          className={`transition-all duration-300 ${
            activePart === 'drivetrain' ? 'filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]' : ''
          }`}
        >
          {/* 54T Aero Outer Chainring */}
          <circle r="38" fill="#1E293B" stroke="#64748B" strokeWidth="4" strokeDasharray="6 2" />
          <circle r="30" fill="none" stroke={accentColor} strokeWidth="2" strokeDasharray="14 14" opacity="0.8" />

          {/* Crank Arms & Pedals - synchronized rotation */}
          <g
            style={{
              transform: isSpinning ? undefined : `rotate(${wheelAngle}deg)`,
              animation: isSpinning ? `spin ${spinDuration}s linear infinite` : undefined,
            }}
          >
            {/* Right Crank Arm (pointing up-forward) */}
            <line x1="0" y1="0" x2="38" y2="-48" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
            <line x1="0" y1="0" x2="38" y2="-48" stroke={frameHighlight} strokeWidth="3" strokeLinecap="round" />
            {/* Right Pedal */}
            <rect x="30" y="-56" width="18" height="8" rx="2" fill="#CBD5E1" stroke="#334155" strokeWidth="1" />

            {/* Left Crank Arm (pointing down-rearward, 180 deg opposite) */}
            <line x1="0" y1="0" x2="-38" y2="48" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
            <line x1="0" y1="0" x2="-38" y2="48" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            {/* Left Pedal */}
            <rect x="-48" y="44" width="18" height="8" rx="2" fill="#94A3B8" stroke="#334155" strokeWidth="1" />

            {/* Center BB Axle Cap */}
            <circle cx="0" cy="0" r="14" fill="#0A0F1D" stroke={accentColor} strokeWidth="2.5" />
            <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
          </g>
        </g>

        {/* ========================================================
            DISC BRAKE CALIPERS (Front & Rear)
           ======================================================== */}
        <g
          className={`transition-all duration-300 ${
            activePart === 'brakes' ? 'filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]' : ''
          }`}
        >
          {/* Rear Caliper (mounted on chainstay / seatstay junction) */}
          <rect x="206" y="322" width="22" height="14" rx="3" fill="#0A0F1D" stroke={accentColor} strokeWidth="1.5" />
          {/* Front Caliper (mounted inside fork leg) */}
          <rect x="786" y="322" width="22" height="14" rx="3" fill="#0A0F1D" stroke={accentColor} strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};
