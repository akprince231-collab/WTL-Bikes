import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES_DATA } from '../data';
import { BicycleGraphic } from './BicycleGraphic';
import { playFreehubClick, playWindWhoosh } from '../utils/audio';
import { ArrowUpRight, CheckCircle2, ChevronRight, Gauge, Layers, Shield } from 'lucide-react';

interface Scene04CategoryExplorerProps {
  onSelectBike: (bikeId: string) => void;
}

export const Scene04CategoryExplorer: React.FC<Scene04CategoryExplorerProps> = ({ onSelectBike }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentCategory = CATEGORIES_DATA[selectedIndex];

  const handleCategoryChange = (index: number) => {
    if (index === selectedIndex) return;
    playWindWhoosh();
    playFreehubClick(1 + index * 0.1);
    setSelectedIndex(index);
  };

  return (
    <section
      id="categories"
      className="relative min-h-screen w-full bg-[#060A18] py-24 px-6 lg:px-12 flex flex-col justify-between overflow-hidden select-none border-b border-white/5"
    >
      {/* Dynamic Background Atmosphere */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentCategory.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-b ${currentCategory.colorScheme.bgGradient} pointer-events-none z-0`}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-grid-tech-dense pointer-events-none opacity-25 z-0" />

      {/* Top Header & Section Marker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 mb-2">
            <span>04 // DISCIPLINE MATRIX</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>FIND YOUR RIDE</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight">
            THE FLEET.
          </h2>
        </div>

        {/* Category Selector Tabs (Horizontal scroll on mobile, wrap on desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-[#070B19]/80 p-1.5 sm:p-2 border border-white/10 backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar">
          {CATEGORIES_DATA.map((cat, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(idx)}
                className={`relative shrink-0 px-3.5 sm:px-6 py-2 sm:py-2.5 font-mono-tech text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 clip-parallelogram min-h-[42px] flex items-center justify-center ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{cat.category}</span>
                {isActive && (
                  <motion.div
                    layoutId="categoryActiveIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Central Visual Environment */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-6">
        {/* Left Column: Interactive Specifications & Narrative */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${currentCategory.id}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono-tech text-xs text-amber-400 tracking-widest uppercase">
                  CLASSIFICATION: {currentCategory.category}
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase mt-1">
                  {currentCategory.name}
                </h3>
                <p className="mt-2 sm:mt-3 text-slate-300 text-sm md:text-base font-light leading-relaxed">
                  {currentCategory.tagline}
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 border-y border-white/10 py-4 sm:py-5">
                <div>
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">
                    TARGET MASS
                  </span>
                  <div className="text-lg sm:text-xl font-display font-bold text-amber-400">
                    {currentCategory.weight}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">
                    TERRAIN PROFILE
                  </span>
                  <div className="text-xs font-mono-tech font-medium text-slate-200 mt-0.5 sm:mt-1">
                    {currentCategory.terrain}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">
                    FRAME ARCHITECTURE
                  </span>
                  <div className="text-xs font-mono-tech font-medium text-slate-300 mt-0.5">
                    {currentCategory.frame}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">
                    WHEELSET & DRIVETRAIN
                  </span>
                  <div className="text-xs font-mono-tech font-medium text-slate-300 mt-0.5">
                    {currentCategory.wheels} • {currentCategory.drivetrain}
                  </div>
                </div>
              </div>

              {/* Key Engineering Highlights */}
              <div className="space-y-2">
                {currentCategory.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-mono-tech">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="#product-reveal"
                  onClick={() => playFreehubClick(1.2)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono-tech text-xs font-bold uppercase tracking-widest transition-all clip-parallelogram group shadow-xl shadow-amber-400/20 min-h-[46px]"
                >
                  <span>INSPECT ANATOMY</span>
                  <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Morphing Bicycle Presentation with Directional Wipe */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center relative min-h-[260px] sm:min-h-[380px] lg:min-h-[460px]">
          {/* Circular Backdrop Aura */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: currentCategory.colorScheme.primary }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`bike-${currentCategory.id}`}
              initial={{ opacity: 0, scale: 0.88, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.08, x: -60 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative"
            >
              {/* Dynamic Bicycle Graphic */}
              <div className="relative group cursor-pointer" onClick={() => playFreehubClick(1.3)}>
                <BicycleGraphic
                  mode={currentCategory.category === 'KIDS' ? 'gold-accent' : 'realistic'}
                  isSpinning={true}
                  spinDuration={1.8}
                  accentColor={currentCategory.colorScheme.primary}
                  className="w-full h-auto"
                />

                {/* Micro Telemetry HUD Floating Tag */}
                <div className="absolute top-2 right-4 bg-[#070B19]/90 border border-amber-400/30 px-3 py-1 text-[10px] font-mono-tech text-amber-300 backdrop-blur-md">
                  CHASSIS PROFILE: {currentCategory.category} // DIRECT TORQUE
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Ticker: Fleet Navigation Stepper */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/5 flex items-center justify-between font-mono-tech text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span>0{selectedIndex + 1} / 05 DISCIPLINES</span>
          <span className="hidden sm:inline text-amber-400/80">• CLICK CATEGORIES TO MORPH ENVIRONMENT</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCategoryChange((selectedIndex - 1 + CATEGORIES_DATA.length) % CATEGORIES_DATA.length)}
            className="p-2 border border-white/10 hover:border-amber-400 text-white rounded transition-colors"
            title="Previous Category"
          >
            ← PREV
          </button>
          <button
            onClick={() => handleCategoryChange((selectedIndex + 1) % CATEGORIES_DATA.length)}
            className="p-2 border border-white/10 hover:border-amber-400 text-white rounded transition-colors"
            title="Next Category"
          >
            NEXT →
          </button>
        </div>
      </div>
    </section>
  );
};
