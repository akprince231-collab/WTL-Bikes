import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ANATOMY_HOTSPOTS } from '../data';
import { BicycleGraphic } from './BicycleGraphic';
import { playFreehubClick } from '../utils/audio';
import { Layers, Sliders, Check, Eye } from 'lucide-react';

export const Scene05FeaturedProduct: React.FC = () => {
  const [activeHotspotId, setActiveHotspotId] = useState<string>('frame');
  const [viewMode, setViewMode] = useState<'realistic' | 'wireframe'>('realistic');

  const activeHotspot = ANATOMY_HOTSPOTS.find((h) => h.id === activeHotspotId) || ANATOMY_HOTSPOTS[0];

  const handleSelectHotspot = (id: string) => {
    playFreehubClick(1.2);
    setActiveHotspotId(id);
  };

  return (
    <section
      id="product-reveal"
      className="relative min-h-screen w-full bg-[#050914] py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 flex flex-col justify-between overflow-hidden select-none border-b border-white/5"
    >
      {/* Background Tech Texture */}
      <div className="absolute inset-0 bg-grid-tech pointer-events-none opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header & Architecture Selector */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 font-mono-tech text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-amber-400 mb-2">
            <span>05 // FLAGSHIP REVEAL</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span className="truncate">PRODUCT ANATOMY</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl text-white uppercase tracking-tight">
            WTL AERO APEX SL
          </h2>
          <p className="font-mono-tech text-[11px] sm:text-xs text-slate-400 tracking-wider sm:tracking-widest mt-1 uppercase">
            FLAGSHIP MONOCOQUE ROAD CHASSIS // TARGET: 6.84 KG
          </p>
        </div>

        {/* View Mode Toggle: Realistic vs. Technical Wireframe */}
        <div className="flex items-center gap-2 bg-[#070B19]/90 border border-white/10 p-1 backdrop-blur-xl self-start md:self-auto">
          <button
            onClick={() => {
              playFreehubClick(1.1);
              setViewMode('realistic');
            }}
            className={`min-h-[40px] px-3.5 sm:px-4 py-2 text-xs font-mono-tech uppercase tracking-wider flex items-center gap-2 transition-all ${
              viewMode === 'realistic'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye size={13} />
            <span>Studio Spec</span>
          </button>
          <button
            onClick={() => {
              playFreehubClick(1.4);
              setViewMode('wireframe');
            }}
            className={`min-h-[40px] px-3.5 sm:px-4 py-2 text-xs font-mono-tech uppercase tracking-wider flex items-center gap-2 transition-all ${
              viewMode === 'wireframe'
                ? 'bg-sky-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span>Wireframe Layup</span>
          </button>
        </div>
      </div>

      {/* Anatomy Navigation Chips */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {ANATOMY_HOTSPOTS.map((hotspot) => {
            const isSelected = hotspot.id === activeHotspotId;
            return (
              <button
                key={hotspot.id}
                onClick={() => handleSelectHotspot(hotspot.id)}
                className={`shrink-0 min-h-[42px] px-3.5 sm:px-4 py-2 font-mono-tech text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 border flex items-center justify-center ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/10 text-amber-400 font-bold shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                    : 'border-white/10 bg-[#070B19]/60 text-slate-400 hover:text-white hover:border-white/30'
                }`}
              >
                <span>{hotspot.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Massive Bicycle Presentation Stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center my-auto min-h-[260px] sm:min-h-[380px] lg:min-h-[500px]">
        <div className="relative w-full max-w-5xl">
          {/* Bicycle Visual with Active Component Highlight */}
          <BicycleGraphic
            mode={viewMode}
            activePart={activeHotspotId}
            isSpinning={true}
            spinDuration={3.5}
            className="w-full h-auto"
          />

          {/* Floating Hotspot Markers on the Bicycle Geometry with Touch-Friendly Hit Areas */}
          {ANATOMY_HOTSPOTS.map((h) => {
            const isCurrent = h.id === activeHotspotId;
            return (
              <button
                key={h.id}
                onClick={() => handleSelectHotspot(h.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none p-2"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                title={h.title}
                aria-label={`Inspect ${h.title}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 scale-125 shadow-[0_0_20px_rgba(251,191,36,0.9)]'
                      : 'bg-[#070B19]/80 border border-amber-400/50 text-amber-400 hover:scale-110 hover:border-amber-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Component Floating Editorial Card */}
        <div className="w-full max-w-4xl mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="bg-[#070B19]/90 border border-white/10 p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative"
            >
              {/* Corner yellow notch */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-amber-400" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="font-mono-tech text-amber-400 text-xs tracking-widest uppercase">
                    {activeHotspot.label}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white uppercase mt-0.5">
                    {activeHotspot.title}
                  </h3>
                </div>
                <div className="font-mono-tech text-xs bg-white/5 border border-white/10 px-3 py-1.5 text-amber-300 self-start md:self-auto">
                  {activeHotspot.specs}
                </div>
              </div>

              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                {activeHotspot.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-white/5 flex items-center justify-between font-mono-tech text-[10px] md:text-xs text-slate-400">
        <div>MODULAR ARCHITECTURE // READY FOR REAL SPECIFICATION DATA</div>
        <div className="flex items-center gap-2 text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>INSPECTING: {activeHotspot.title.toUpperCase()}</span>
        </div>
      </div>
    </section>
  );
};
