import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WtlLogo } from './WtlLogo';
import { BicycleGraphic } from './BicycleGraphic';
import { playFreehubClick, playWindWhoosh } from '../utils/audio';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface Scene01EntranceProps {
  onComplete: () => void;
}

export const Scene01Entrance: React.FC<Scene01EntranceProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'calibrating' | 'logo-reveal' | 'bike-transit' | 'finished'>('calibrating');
  const [telemetryCount, setTelemetryCount] = useState(0);

  useEffect(() => {
    // Stage 1: Calibrating telemetry markings
    const timer1 = setTimeout(() => {
      setStage('logo-reveal');
    }, 900);

    // Stage 2: Logo reveals, prepare bicycle entrance
    const timer2 = setTimeout(() => {
      setStage('bike-transit');
      playWindWhoosh();
      playFreehubClick(1.2);
    }, 2200);

    // Stage 3: Bicycle sweeps through, complete entrance
    const timer3 = setTimeout(() => {
      setStage('finished');
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  // Subtle telemetry ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryCount((prev) => (prev + 1) % 100);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    playFreehubClick(1.5);
    setStage('finished');
    onComplete();
  };

  if (stage === 'finished') return null;

  return (
    <AnimatePresence>
      <motion.div
        id="scene-01-entrance"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] bg-[#070B19] text-white flex flex-col justify-between p-4 sm:p-8 md:p-14 overflow-hidden select-none"
      >
        {/* Ambient Technical Grid & Diagonal Laser Lines */}
        <div className="absolute inset-0 bg-grid-tech pointer-events-none opacity-40" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Top Header Markings */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span className="font-mono-tech text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-amber-300 uppercase truncate">
              WTL // 01.INIT
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 font-mono-tech text-[11px] text-slate-400 tracking-wider">
            <span>ALTITUDE: 1,420M</span>
            <span>VELOCITY: 42.4 KM/H</span>
            <span>CADENCE: {85 + (telemetryCount % 15)} RPM</span>
          </div>
          <button
            onClick={handleSkip}
            className="group flex items-center gap-1.5 px-3 sm:px-4 py-2 min-h-[44px] border border-white/20 hover:border-amber-400 text-[11px] sm:text-xs font-mono-tech tracking-wider text-slate-300 hover:text-amber-400 transition-colors uppercase shrink-0"
          >
            <span>Skip Intro</span>
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Center Stage: WTL Logo Reveal & Entering Bicycle Transit */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-2">
          {/* Logo Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{
              opacity: stage !== 'calibrating' ? 1 : 0,
              y: stage !== 'calibrating' ? 0 : 30,
              scale: stage !== 'calibrating' ? 1 : 0.95,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-full"
          >
            <div className="w-full flex justify-center">
              <WtlLogo size="hero" showSubtitle={true} />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage !== 'calibrating' ? 0.75 : 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 font-mono-tech text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase text-slate-300 text-center px-4"
            >
              HUMAN-POWERED PRECISION ARCHITECTURE
            </motion.p>
          </motion.div>

          {/* Physically Moving Bicycle Transit across the screen */}
          <AnimatePresence>
            {stage === 'bike-transit' && (
              <motion.div
                initial={{ x: '-120vw', opacity: 0 }}
                animate={{ x: '120vw', opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.3,
                  ease: [0.25, 0.1, 0.25, 1], // aerodynamic momentum
                }}
                className="absolute w-[280px] sm:w-[500px] md:w-[680px] pointer-events-none"
              >
                <div className="relative">
                  {/* Motion Blur & Streak Trails */}
                  <div className="absolute top-[40%] -left-60 w-72 h-[2px] bg-gradient-to-r from-transparent to-amber-400 opacity-80" />
                  <div className="absolute top-[65%] -left-80 w-96 h-[2px] bg-gradient-to-r from-transparent to-amber-300 opacity-60" />
                  <BicycleGraphic
                    mode="realistic"
                    isSpinning={true}
                    spinDuration={0.6}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Technical Grid & Status */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 sm:pt-4 font-mono-tech text-[9px] sm:text-[10px] md:text-xs text-slate-400">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-amber-400">ACTIVE ENTRY</span>
            <span className="hidden md:inline">SYSTEM: RECURRING BICYCLE PROTAGONIST</span>
          </div>
          <div className="tracking-widest truncate max-w-[200px] sm:max-w-none text-right">
            {stage === 'calibrating' && 'CALIBRATING CHASSIS DYNAMICS...'}
            {stage === 'logo-reveal' && 'IDENTIFYING BRAND KINEMATICS...'}
            {stage === 'bike-transit' && 'TRANSIT IN PROGRESS...'}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
