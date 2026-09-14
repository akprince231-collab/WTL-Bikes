import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playFreehubClick, playWindWhoosh } from '../utils/audio';
import { ArrowRight, Mountain, Compass, Wind, RotateCw } from 'lucide-react';
import { cyclistMountainImg, gravelTrailImg, roadBikeStudioImg } from '../data';

interface EnvironmentSlide {
  id: string;
  title: string;
  location: string;
  narrative: string;
  altitude: string;
  gradient: string;
  image: string;
  tag: string;
}

const ENVIRONMENTS: EnvironmentSlide[] = [
  {
    id: 'alpine',
    title: 'THE ALPINE DAWN',
    location: 'PASSO DEL STELVIO // 2,757M',
    narrative: 'When the world is still asleep, the rhythm of your breath and the crisp hum of 28mm tires on cold tarmac are the only sounds in existence.',
    altitude: '2,757 METERS',
    gradient: '12.4% PEAK PITCH',
    image: cyclistMountainImg,
    tag: 'HUMAN POWERED ENDURANCE',
  },
  {
    id: 'coastal',
    title: 'THE COASTAL OVERLOOK',
    location: 'JAGUAR POINT GRAVEL // 450M',
    narrative: 'Where smooth asphalt dissolves into jagged sea-spray limestone. The gravel chassis absorbs every vibration, inviting you to ride beyond the map.',
    altitude: '450 METERS',
    gradient: 'WIND SHEAR 42 KM/H',
    image: gravelTrailImg,
    tag: 'GRAVEL FREEDOM',
  },
  {
    id: 'studio',
    title: 'THE AERODYNAMIC TUNNEL',
    location: 'MILAN SPEED LABORATORY',
    narrative: 'Every tube angle, internal cable junction, and spoke tension tuned to minimize wake turbulence and turn rider energy into pure velocity.',
    altitude: 'SEA LEVEL TEST',
    gradient: 'CdA 0.218 VERIFIED',
    image: roadBikeStudioImg,
    tag: 'RACING KINETICS',
  },
];

export const Scene07Lifestyle: React.FC = () => {
  const [activeEnvIndex, setActiveEnvIndex] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const currentEnv = ENVIRONMENTS[activeEnvIndex];

  const handleNext = () => {
    if (isWiping) return;
    setIsWiping(true);
    playWindWhoosh();
    playFreehubClick(1.4);

    setTimeout(() => {
      setActiveEnvIndex((prev) => (prev + 1) % ENVIRONMENTS.length);
      setIsWiping(false);
    }, 450);
  };

  const handleSelectEnv = (idx: number) => {
    if (idx === activeEnvIndex || isWiping) return;
    setIsWiping(true);
    playWindWhoosh();
    playFreehubClick(1.2);

    setTimeout(() => {
      setActiveEnvIndex(idx);
      setIsWiping(false);
    }, 450);
  };

  return (
    <section
      id="lifestyle"
      className="relative min-h-screen w-full bg-[#03060E] flex flex-col justify-between overflow-hidden select-none border-b border-white/5 py-16 sm:py-20 px-4 sm:px-6 lg:px-12"
    >
      {/* Background Fullscreen Cinematic Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEnv.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentEnv.image}
            alt={currentEnv.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-45 filter brightness-90 contrast-110"
          />
          {/* Cinematic Vignette and Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#03060E] via-[#070B19]/60 to-[#03060E]/80" />
          <div className="absolute inset-0 bg-grid-tech opacity-15" />
        </motion.div>
      </AnimatePresence>

      {/* Interactive Spoked Wheel Wipe Overlay (Creative Transition Device) */}
      <AnimatePresence>
        {isWiping && (
          <motion.div
            initial={{ x: '-100vw', rotate: 0 }}
            animate={{ x: '100vw', rotate: 720 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] rounded-full border-[12px] sm:border-[20px] md:border-[24px] border-amber-400 bg-amber-400/10 backdrop-blur-md shadow-[0_0_80px_rgba(251,191,36,0.8)] relative flex items-center justify-center shrink-0">
              {/* Spoke lines in wheel wipe */}
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-[2px] bg-amber-300/60"
                  style={{ transform: `rotate(${i * 11.25}deg)` }}
                />
              ))}
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-slate-950 border-2 sm:border-4 border-amber-400 flex items-center justify-center font-mono-tech text-[10px] sm:text-xs text-amber-400 font-bold">
                WTL
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header & Environmental Marker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono-tech text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-amber-400">07 // SANCTUARY</span>
          <span className="hidden sm:inline">HUMAN MOVEMENT & ENVIRONMENT</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden md:inline text-amber-300">WHEEL-MASK TRANSITION ACTIVE</span>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-3 py-2 min-h-[40px] bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white font-mono-tech text-xs tracking-wider transition-all"
          >
            <RotateCw size={12} className={isWiping ? 'animate-spin' : ''} />
            <span>Cycle World</span>
          </button>
        </div>
      </div>

      {/* Main Environmental Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 sm:py-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/40 text-amber-300 font-mono-tech text-[10px] sm:text-xs tracking-widest uppercase mb-4">
            <Wind size={13} className="text-amber-400" />
            <span>{currentEnv.tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[0.9]">
            {currentEnv.title}
          </h2>

          <p className="mt-2 font-mono-tech text-xs sm:text-sm text-amber-400 tracking-[0.2em] uppercase">
            {currentEnv.location}
          </p>

          <p className="mt-4 sm:mt-6 text-slate-200 text-sm sm:text-base md:text-lg font-light leading-relaxed drop-shadow-md">
            {currentEnv.narrative}
          </p>

          {/* Environmental Telemetry */}
          <div className="mt-6 sm:mt-8 flex items-center gap-6 sm:gap-8 font-mono-tech text-xs border-t border-white/15 pt-4 text-slate-300">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">ELEVATION</span>
              <span className="text-amber-400 font-bold">{currentEnv.altitude}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">CONDITIONS</span>
              <span className="text-white font-bold">{currentEnv.gradient}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Environmental Navigation Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-white/10 pt-4 sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-tech text-xs">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full no-scrollbar">
          {ENVIRONMENTS.map((env, i) => (
            <button
              key={env.id}
              onClick={() => handleSelectEnv(i)}
              className={`shrink-0 min-h-[42px] px-3.5 sm:px-4 py-2 border transition-all ${
                i === activeEnvIndex
                  ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold'
                  : 'border-white/10 text-slate-400 hover:text-white hover:border-white/30'
              }`}
            >
              0{i + 1} {env.title.split(' ')[1] || env.title}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[11px]">
          <span>CLICK TO TRIGGER SPOKE TRANSITION</span>
        </div>
      </div>
    </section>
  );
};
