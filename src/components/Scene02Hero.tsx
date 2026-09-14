import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Compass, MoveDown, ShieldCheck, Zap, Disc } from 'lucide-react';
import { BicycleGraphic } from './BicycleGraphic';
import { playFreehubClick, playWindWhoosh } from '../utils/audio';

interface Scene02HeroProps {
  onExploreBikes: () => void;
  onDiscoverWtl: () => void;
}

export const Scene02Hero: React.FC<Scene02HeroProps> = ({ onExploreBikes, onDiscoverWtl }) => {
  const [wheelSpeed, setWheelSpeed] = useState(1.4);

  // Scroll driven parallax for hero elements
  const { scrollY } = useScroll();
  const heroBikeX = useTransform(scrollY, [0, 800], [0, 260]);
  const heroTextY = useTransform(scrollY, [0, 800], [0, 160]);
  const heroBgY = useTransform(scrollY, [0, 800], [0, 240]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#070B19] pt-24 pb-12 px-6 lg:px-12 select-none"
    >
      {/* 1. Background Texture & Technical Grid */}
      <motion.div
        style={{ y: heroBgY }}
        className="absolute inset-0 bg-grid-tech pointer-events-none opacity-30 z-0"
      />

      {/* Dynamic Background Light Pools */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-amber-400/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. Technical Vector Lines (Diagonal Velocity Strands) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.35, x: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute top-[18%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.25, x: 0 }}
          transition={{ duration: 1.8, delay: 0.4 }}
          className="absolute top-[58%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
        />
        {/* Slanted Yellow Kinetic Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[42%] left-[10%] w-[38%] h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-transparent origin-left"
        />
      </div>

      {/* Top Edge Micro-Typography */}
      <div className="relative z-10 flex items-center justify-between font-mono-tech text-[10px] md:text-xs text-slate-400 tracking-[0.25em] uppercase border-b border-white/5 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
          <span>WTL CHASSIS SERIES: 2026 ROAD & GRAVEL</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="hidden md:flex items-center gap-6"
        >
          <span>AERODYNAMIC COEFFICIENT: 0.218 CdA</span>
          <span>HUMAN POWER TARGET: 100% DIRECT TORQUE</span>
        </motion.div>
      </div>

      {/* Main Spatial Core: Layered Typography + Chasing Bicycle */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto min-h-[520px] max-w-7xl mx-auto w-full">
        <div className="relative w-full">
          {/* 7. Oversized Headline (Revealed Word-by-Word with Physical Spatial Mask) */}
          <motion.div
            style={{ y: heroTextY }}
            className="relative z-20 pointer-events-none"
          >
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[135px] leading-[0.9] tracking-tighter text-white uppercase select-none drop-shadow-2xl"
              >
                RIDE
              </motion.h1>
            </div>
            <div className="overflow-hidden flex items-baseline gap-4 md:gap-8 flex-wrap">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[135px] leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-amber-400 uppercase select-none drop-shadow-2xl"
              >
                BEYOND.
              </motion.h1>
            </div>
          </motion.div>

          {/* 4, 5, 6. The Cinematic Bicycle entering from off-screen and crossing behind & through the typography */}
          <motion.div
            style={{ x: heroBikeX }}
            initial={{ x: '-60%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[4%] sm:top-[2%] md:top-[0%] left-[2%] sm:left-[8%] md:left-[16%] w-[92%] sm:w-[78%] md:w-[70%] lg:w-[62%] max-w-[820px] z-10 pointer-events-auto"
            onMouseEnter={() => {
              setWheelSpeed(0.6);
              playFreehubClick(1.4);
            }}
            onMouseLeave={() => setWheelSpeed(1.4)}
          >
            <div className="relative group cursor-pointer">
              {/* Speed streamline */}
              <div className="absolute top-[32%] -left-32 w-48 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400" />
              <div className="absolute top-[70%] -left-48 w-64 h-[2px] bg-gradient-to-r from-transparent via-amber-400/30 to-amber-300" />
              
              <BicycleGraphic
                mode="realistic"
                isSpinning={true}
                spinDuration={wheelSpeed}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* 10. Floating Technical Telemetry Labels around the bicycle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -top-4 right-[12%] bg-[#070B19]/90 border border-amber-400/40 px-3 py-1 text-[10px] font-mono-tech uppercase text-amber-300 backdrop-blur-md hidden sm:flex items-center gap-2"
              >
                <Zap size={11} className="text-amber-400" />
                <span>INTEGRATED COCKPIT // 0 EXPOSED CABLES</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="absolute bottom-6 left-[8%] bg-[#070B19]/90 border border-white/20 px-3 py-1 text-[10px] font-mono-tech uppercase text-slate-300 backdrop-blur-md hidden sm:flex items-center gap-2"
              >
                <Disc size={11} className="text-amber-400" />
                <span>TORAY T1100 CARBON CHASSIS // 6.84 KG</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 8. Supporting line & 9. CTA Elements */}
        <div className="relative z-30 mt-12 md:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-md"
          >
            <p className="font-mono-tech text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              01 // HUMAN KINETIC ARTISTRY
            </p>
            <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
              Built for the road ahead. Zero compromise between aerodynamic ruthlessness and all-day endurance.
            </p>
          </motion.div>

          {/* Sequential CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <button
              onClick={() => {
                playWindWhoosh();
                playFreehubClick(1.3);
                onExploreBikes();
              }}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 active:bg-amber-300 text-slate-950 font-mono-tech font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-amber-400/20 transform hover:-translate-y-0.5 clip-parallelogram min-h-[48px]"
            >
              <span>EXPLORE BIKES</span>
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => {
                playFreehubClick(1.1);
                onDiscoverWtl();
              }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 active:bg-white/15 text-white font-mono-tech font-semibold text-xs uppercase tracking-widest border border-white/15 hover:border-amber-400/50 transition-all duration-300 flex items-center justify-center gap-3 group backdrop-blur-md transform hover:-translate-y-0.5 clip-parallelogram min-h-[48px]"
            >
              <span>DISCOVER WTL</span>
              <Compass size={14} className="text-amber-400 group-hover:rotate-45 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* 11. Bottom Scroll Indicator with Kinetic Animated Wheel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative z-10 flex items-center justify-between border-t border-white/5 pt-6 font-mono-tech text-[10px] text-slate-400"
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border border-amber-400/40 flex items-center justify-center animate-spin">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          </div>
          <span className="tracking-widest uppercase">SCROLL TO DRIVE PROTAGONIST</span>
        </div>

        <div className="flex items-center gap-2">
          <span>02 / 10 SCENES</span>
          <MoveDown size={14} className="text-amber-400 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
