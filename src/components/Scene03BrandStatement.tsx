import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BicycleGraphic } from './BicycleGraphic';

export const Scene03BrandStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Kinetic scroll transforms with mobile-safe bounds
  const textLeftX = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const textRightX = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const bikeX = useTransform(scrollYProgress, [0, 1], [-200, 1100]);
  const bikeRotate = useTransform(scrollYProgress, [0, 1], [-4, 3]);
  const yellowLineWidth = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%']);
  const letterSpacing = useTransform(scrollYProgress, [0.2, 0.8], ['-0.02em', '0.04em']);

  return (
    <section
      id="brand-statement"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050814] flex flex-col justify-center overflow-hidden py-24 sm:py-32 border-y border-white/5 select-none"
    >
      {/* Background Technical Grid and Moving Contour */}
      <div className="absolute inset-0 bg-grid-tech pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2" />

      {/* Background kinetic yellow laser streak */}
      <motion.div
        style={{ width: yellowLineWidth }}
        className="absolute top-[48%] left-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)] z-0"
      />

      {/* Top Section Badge */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full mb-8 sm:mb-12 flex items-center justify-between font-mono-tech text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-amber-400">03 // STATEMENT</span>
          <span className="truncate">THE KINETIC MANIFESTO</span>
        </div>
        <div className="hidden sm:inline-block text-[11px] text-amber-400/80">
          PROTAGONIST TRANSITING MIDGROUND
        </div>
      </div>

      {/* Layer 1: Background Marquee Typography */}
      <div className="relative z-0 overflow-hidden opacity-10 whitespace-nowrap mb-2 sm:mb-4 pointer-events-none">
        <motion.div style={{ x: textRightX }} className="flex gap-8">
          <span className="font-display font-black text-6xl sm:text-8xl md:text-[180px] uppercase text-white tracking-tighter">
            PURITY • MOTION • CADENCE • DISCIPLINE •
          </span>
          <span className="font-display font-black text-6xl sm:text-8xl md:text-[180px] uppercase text-white tracking-tighter">
            PURITY • MOTION • CADENCE • DISCIPLINE •
          </span>
        </motion.div>
      </div>

      {/* Layer 2: Core Oversized Headline with Split Planes */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Line 1: MORE THAN A */}
        <motion.div style={{ x: textLeftX }} className="overflow-hidden">
          <motion.h2
            style={{ letterSpacing }}
            className="font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-9xl lg:text-[115px] text-white tracking-tight uppercase leading-[0.9] drop-shadow-2xl"
          >
            MORE THAN
          </motion.h2>
        </motion.div>

        {/* Line 2: A BICYCLE. (Slanted Accent & Highlighting) */}
        <motion.div style={{ x: textRightX }} className="mt-2 md:mt-4 overflow-hidden flex items-center gap-6">
          <motion.h2
            style={{ letterSpacing }}
            className="font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-9xl lg:text-[115px] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 tracking-tight uppercase leading-[0.9] drop-shadow-2xl"
          >
            A BICYCLE.
          </motion.h2>
        </motion.div>
      </div>

      {/* Layer 3: The Protagonist Bicycle traveling THROUGH the typography */}
      <motion.div
        style={{
          x: bikeX,
          rotate: bikeRotate,
        }}
        className="absolute top-[34%] sm:top-[28%] md:top-[22%] left-[-20%] w-[380px] sm:w-[500px] md:w-[620px] z-10 pointer-events-none"
      >
        <div className="relative">
          {/* Motion trail behind the bicycle */}
          <div className="absolute top-[40%] -left-48 w-60 h-[2px] bg-gradient-to-r from-transparent to-amber-400 opacity-70" />
          <div className="absolute top-[65%] -left-36 w-48 h-[2px] bg-gradient-to-r from-transparent to-amber-300 opacity-50" />
          
          <BicycleGraphic
            mode="realistic"
            isSpinning={true}
            spinDuration={0.8}
            className="w-full h-auto opacity-95 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
          />
        </div>
      </motion.div>

      {/* Layer 4: Foreground Editorial Narrative Callout */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12 w-full mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-6 md:col-start-7 bg-[#070B19]/90 border-l-2 border-amber-400 p-6 md:p-8 backdrop-blur-xl">
          <p className="font-mono-tech text-amber-400 text-xs tracking-widest uppercase mb-3">
            THE PHILOSOPHY OF HUMAN PROPULSION
          </p>
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            A bicycle is the most efficient converter of metabolic energy on Earth. No combustion. No synthetic vibration. Just the singular dialogue between rider, tarmac, and atmospheric resistance. WTL refines that dialogue into an uncompromising kinetic instrument.
          </p>
          <div className="mt-4 flex items-center gap-6 font-mono-tech text-[10px] text-slate-400">
            <span>EFFICIENCY RATING: 98.4%</span>
            <span>MASS COMPLIANCE: ISO 4210</span>
          </div>
        </div>
      </div>
    </section>
  );
};
