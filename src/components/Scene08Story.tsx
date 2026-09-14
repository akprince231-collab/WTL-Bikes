import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BicycleGraphic } from './BicycleGraphic';
import { Sparkles, ArrowDownRight, Compass } from 'lucide-react';
import { gravelTrailImg } from '../data';

export const Scene08Story: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.7], [0.96, 1.04]);
  const bikeTransitX = useTransform(scrollYProgress, [0.1, 0.9], [-80, 500]);
  const yellowLineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#060917] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden select-none border-b border-white/5"
    >
      {/* Background Technical Textures */}
      <div className="absolute inset-0 bg-grid-tech pointer-events-none opacity-20" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Yellow precision trajectory line weaving down */}
      <motion.div
        style={{ height: yellowLineHeight }}
        className="absolute left-[6%] md:left-[12%] top-0 w-[2px] bg-gradient-to-b from-amber-400 via-amber-300 to-transparent z-10 pointer-events-none"
      />

      {/* Top Section Marker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-8 sm:mb-12 flex items-center justify-between font-mono-tech text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-amber-400">08 // ORIGIN & MISSION</span>
          <span className="truncate">THE PURSUIT OF DIRECT TORQUE</span>
        </div>
        <div className="hidden sm:inline-block text-[11px] text-amber-400/80">
          PROTAGONIST WEAVING BETWEEN LAYERS
        </div>
      </div>

      {/* Main Split Layout: Typography on Left, Visual Composition on Right */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Typography */}
        <motion.div style={{ y: textY }} className="lg:col-span-6 space-y-6 sm:space-y-8">
          <div>
            <span className="font-mono-tech text-xs text-amber-400 tracking-widest uppercase">
              THE BRAND FOUNDATION
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl text-white tracking-tight uppercase leading-[0.9] mt-2">
              THE WTL
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                STORY.
              </span>
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-5 text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            <p>
              We believe a bicycle is not an accessory, nor an engine-dependent machine. It is the purest extension of human physiology ever conceived.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base">
              Every curve, lay-up orientation, and aerodynamic profile in a WTL chassis exists for one single purpose: to translate human heart rate and pedal revolutions into unadulterated forward momentum.
            </p>
          </div>

          {/* Three Core Brand Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-white/10 pt-4 sm:pt-6">
            <div className="border-l border-amber-400/40 pl-3">
              <span className="font-mono-tech text-[10px] text-amber-400 block uppercase">01 / INTEGRITY</span>
              <span className="font-display font-bold text-white text-sm">Human Powered</span>
            </div>
            <div className="border-l border-amber-400/40 pl-3">
              <span className="font-mono-tech text-[10px] text-amber-400 block uppercase">02 / AERODYNAMICS</span>
              <span className="font-display font-bold text-white text-sm">Form Slices Air</span>
            </div>
            <div className="border-l border-amber-400/40 pl-3">
              <span className="font-mono-tech text-[10px] text-amber-400 block uppercase">03 / ENDURANCE</span>
              <span className="font-display font-bold text-white text-sm">All-Day Mastery</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Layered Brand Imagery & Interlaced Bicycle Movement */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[300px] sm:min-h-[420px]">
          {/* Framed Editorial Cycling Image */}
          <motion.div
            style={{ scale: imageScale }}
            className="relative w-full max-w-lg aspect-[4/3] overflow-hidden border border-white/10 shadow-2xl z-10"
          >
            <img
              src={gravelTrailImg}
              alt="WTL Field Testing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-105 brightness-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060917] via-transparent to-transparent opacity-60" />
            
            {/* Image Corner Caption */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-[#070B19]/90 border border-white/10 p-2.5 sm:p-3 backdrop-blur-md flex items-center justify-between">
              <span className="font-mono-tech text-[9px] sm:text-[10px] text-amber-400 uppercase tracking-widest">
                EXPEDITION // 2026 ARCHIVES
              </span>
              <span className="font-mono-tech text-[9px] sm:text-[10px] text-slate-400">
                PROVEN ON ROAD & DIRT
              </span>
            </div>
          </motion.div>

          {/* The Protagonist Bicycle Moving Dynamically between layers */}
          <motion.div
            style={{ x: bikeTransitX }}
            className="absolute -bottom-6 -left-10 sm:-left-20 w-[260px] sm:w-[380px] md:w-[440px] z-30 pointer-events-none"
          >
            <BicycleGraphic
              mode="gold-accent"
              isSpinning={true}
              spinDuration={1.1}
              className="w-full h-auto filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
