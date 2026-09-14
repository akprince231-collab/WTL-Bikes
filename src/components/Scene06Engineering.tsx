import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BicycleGraphic } from './BicycleGraphic';

export const Scene06Engineering: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Unique behaviors for each word (with mobile-safe ranges)
  // 1. CONTROL slides horizontally
  const controlX = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  // 2. PERFORMANCE scales into view
  const perfScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.85, 1.05, 0.9]);
  const perfOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0.4, 1, 0.5]);

  // 3. COMFORT appears through mask
  const comfortY = useTransform(scrollYProgress, [0.2, 0.6], [50, 0]);

  // 4. PRECISION tracks across the viewport
  const precisionX = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const precisionTracking = useTransform(scrollYProgress, [0.2, 0.7], ['0.01em', '0.12em']);

  // Background wireframe bicycle moving smoothly through the scene
  const wireBikeX = useTransform(scrollYProgress, [0, 1], [-250, 1000]);

  return (
    <section
      id="engineering"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#040711] py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden select-none border-b border-white/5"
    >
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-grid-tech-dense pointer-events-none opacity-20" />

      {/* Wireframe bicycle moving in the background layer behind the words */}
      <motion.div
        style={{ x: wireBikeX }}
        className="absolute top-[35%] left-[-15%] w-[360px] sm:w-[550px] md:w-[750px] pointer-events-none z-0 opacity-40"
      >
        <BicycleGraphic
          mode="wireframe"
          isSpinning={true}
          spinDuration={1.2}
          className="w-full h-auto"
        />
      </motion.div>

      {/* Section Marker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-8 sm:mb-12 flex items-center justify-between font-mono-tech text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-sky-400">06 // KINETIC DYNAMICS</span>
          <span className="truncate">COMPUTATIONAL AERODYNAMICS</span>
        </div>
        <div className="hidden sm:inline-block text-[11px] text-sky-400/80">
          WIREFRAME CHASSIS INTERPOLATION
        </div>
      </div>

      {/* Main Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-10 sm:mb-16">
        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl text-white tracking-tight uppercase leading-[0.9]">
          ENGINEERED
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
            FOR THE RIDE.
          </span>
        </h2>
      </div>

      {/* The 4 Distinct Visual Statements */}
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8 sm:space-y-12 md:space-y-16">
        {/* 1. CONTROL — Slides Horizontally with velocity */}
        <div className="overflow-hidden border-b border-white/5 pb-4 sm:pb-6">
          <motion.div style={{ x: controlX }} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
            <span className="font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter text-white/90">
              CONTROL
            </span>
            <span className="font-mono-tech text-[10px] sm:text-xs md:text-sm text-amber-400 tracking-wider sm:tracking-widest uppercase">
              // 66.5° RAKE • LATERAL RIGIDITY
            </span>
          </motion.div>
        </div>

        {/* 2. PERFORMANCE — Scales into View */}
        <div className="overflow-hidden border-b border-white/5 pb-4 sm:pb-6">
          <motion.div
            style={{ scale: perfScale, opacity: perfOpacity }}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 origin-left"
          >
            <span className="font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-amber-300">
              PERFORMANCE
            </span>
            <span className="font-mono-tech text-[10px] sm:text-xs md:text-sm text-sky-400 tracking-wider sm:tracking-widest uppercase">
              // 14.2W AERODYNAMIC ADVANTAGE
            </span>
          </motion.div>
        </div>

        {/* 3. COMFORT — Appears through Mask */}
        <div className="overflow-hidden border-b border-white/5 pb-4 sm:pb-6">
          <div className="clip-diagonal">
            <motion.div style={{ y: comfortY }} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
              <span className="font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter text-slate-200">
                COMFORT
              </span>
              <span className="font-mono-tech text-[10px] sm:text-xs md:text-sm text-amber-400 tracking-wider sm:tracking-widest uppercase">
                // MICRO-FLEX SEATSTAY TUNING
              </span>
            </motion.div>
          </div>
        </div>

        {/* 4. PRECISION — Tracks across the viewport with expanding kerning */}
        <div className="overflow-hidden border-b border-white/5 pb-4 sm:pb-6">
          <motion.div
            style={{ x: precisionX, letterSpacing: precisionTracking }}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
          >
            <span className="font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-9xl uppercase text-amber-400">
              PRECISION
            </span>
            <span className="font-mono-tech text-[10px] sm:text-xs md:text-sm text-slate-400 tracking-wider sm:tracking-widest uppercase">
              // SUB-MILLIMETER TOLERANCES
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-16 flex flex-col sm:flex-row items-center justify-between font-mono-tech text-[10px] text-slate-400 gap-4">
        <div>CFD SIMULATION RUN // 1,200,000 CELLS EVALUATED</div>
        <div className="flex items-center gap-6">
          <span>DRAG REDUCTION: -8.6%</span>
          <span>YAW ANGLE TEST: 0° TO 20°</span>
        </div>
      </div>
    </section>
  );
};
