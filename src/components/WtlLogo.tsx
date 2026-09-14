import React from 'react';

interface WtlLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'light' | 'brand' | 'monochrome';
  showSubtitle?: boolean;
}

export const WtlLogo: React.FC<WtlLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
  showSubtitle = false,
}) => {
  const heightMap = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-11 sm:h-12',
    xl: 'h-16 sm:h-20',
    hero: 'h-20 sm:h-28 md:h-36',
  };

  // Color mapping:
  // 'light' (inverted brand on dark canvas): Crisp pure white for W & L, vibrant gold for T
  // 'brand' (original print/light background): Deep navy #102A43 for W & L, vibrant gold for T
  // 'monochrome': Uniform white
  const navyColor = variant === 'brand' ? '#102A43' : '#FFFFFF';
  const goldColor = variant === 'monochrome' ? '#FFFFFF' : '#F5B833';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightMap[size]} w-auto transition-transform duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]`}
        aria-label="WTL Bikes"
        role="img"
      >
        <defs>
          {/* Subtle soft ribbon shadow gradient where the W stroke folds over the T crossbar */}
          <linearGradient id="wtlFoldShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E3B00" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#A86506" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F5B833" stopOpacity="0" />
          </linearGradient>

          {/* Premium athletic gold gradient for the T glyph */}
          <linearGradient id="wtlGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBD34D" />
            <stop offset="40%" stopColor="#F5B833" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* 1. Letter 'W' - Forward-slanted kinetic geometry, top right stroke flows seamlessly into T */}
        <g fill={navyColor}>
          {/* Stroke 1: Outer down-stroke */}
          <path d="M 24 12 L 46 12 L 68 88 L 46 88 Z" />
          {/* Stroke 2: Inner up-stroke */}
          <path d="M 52 88 L 74 88 L 122 24 L 104 24 Z" />
          {/* Stroke 3: Inner down-stroke */}
          <path d="M 104 24 L 124 24 L 164 88 L 144 88 Z" />
          {/* Stroke 4: Up-stroke continuing into the top crossbar of T with forward slice */}
          <path d="M 148 88 L 170 88 L 208 12 L 236 12 L 230 30 L 182 30 Z" />
        </g>

        {/* 2. Letter 'T' - Signature Gold Wing & Slanted Stem */}
        {/* Main T Crossbar (with aerodynamic rounded trailing right wingtip) & Slanted Stem */}
        <path
          d="M 230 30 L 236 12 L 304 12 C 316 12 324 18 324 30 L 274 30 L 254 88 L 232 88 L 252 30 Z"
          fill={variant === 'monochrome' ? '#FFFFFF' : 'url(#wtlGoldGrad)'}
        />

        {/* Soft shadow on the T crossbar at the fold junction under the W stroke */}
        {variant !== 'monochrome' && (
          <path
            d="M 230 30 L 236 12 L 256 12 L 250 30 Z"
            fill="url(#wtlFoldShadow)"
          />
        )}

        {/* 3. Letter 'L' - Slanted Stem with Angled Racing Base Cut */}
        <path
          d="M 354 12 L 376 12 L 358 70 L 418 70 L 412 88 L 328 88 Z"
          fill={navyColor}
        />

        {/* Optional subtle BIKES wordmark if explicitly enabled */}
        {showSubtitle && (
          <text
            x="332"
            y="98"
            fill={goldColor}
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            fontSize="10"
            letterSpacing="5"
            opacity="0.9"
          >
            BIKES
          </text>
        )}
      </svg>
    </div>
  );
};

