import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BicycleGraphic } from './BicycleGraphic';
import { playWindWhoosh, playFreehubClick } from '../utils/audio';

interface SprintChaseOverlayProps {
  isActive: boolean;
  onComplete: () => void;
}

export const SprintChaseOverlay: React.FC<SprintChaseOverlayProps> = ({ isActive, onComplete }) => {
  useEffect(() => {
    if (isActive) {
      playWindWhoosh();
      playFreehubClick(1.6);
      const timer = setTimeout(() => {
        onComplete();
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] pointer-events-none overflow-hidden flex items-center">
        {/* Fullscreen Speed Warp Lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-transparent"
        />

        {/* The Sprinting Bicycle */}
        <motion.div
          initial={{ x: '-100vw', y: 0 }}
          animate={{ x: '110vw', y: [0, -15, 8, 0] }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-[280px] sm:w-[480px] md:w-[720px]"
        >
          <div className="relative">
            {/* Speed Lasers */}
            <div className="absolute top-[35%] -left-72 w-96 h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-amber-300 shadow-[0_0_20px_#FBBF24]" />
            <div className="absolute top-[65%] -left-96 w-[500px] h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

            <BicycleGraphic
              mode="gold-accent"
              isSpinning={true}
              spinDuration={0.4}
              className="w-full h-auto filter drop-shadow-[0_20px_35px_rgba(251,191,36,0.5)]"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
