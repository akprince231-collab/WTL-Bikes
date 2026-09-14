import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { BicycleGraphic, BicycleStyleMode } from './BicycleGraphic';

interface ChasingBicycleProps {
  mode?: BicycleStyleMode;
  direction?: 'right' | 'left';
  speedMultiplier?: number;
  showSpeedTrails?: boolean;
  className?: string;
  activePart?: string | null;
  interactive?: boolean;
  scale?: number;
}

export const ChasingBicycle: React.FC<ChasingBicycleProps> = ({
  mode = 'realistic',
  direction = 'right',
  speedMultiplier = 1,
  showSpeedTrails = true,
  className = '',
  activePart = null,
  interactive = true,
  scale = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [internalWheelAngle, setInternalWheelAngle] = useState(0);

  // Animate wheel angle continuously
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      const speed = (isHovered ? 580 : 340) * speedMultiplier;
      setInternalWheelAngle((prev) => (prev + speed * delta) % 360);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, speedMultiplier]);

  return (
    <div
      className={`relative select-none pointer-events-auto ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: `scale(${scale})` }}
    >
      {/* Dynamic Aerodynamic Speed Trails (Yellow & Cyan Laser Lines) */}
      {showSpeedTrails && (
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
          {/* Top tube trailing streamline */}
          <motion.div
            className="absolute top-[28%] -left-32 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-amber-400"
            style={{ width: isHovered ? '240px' : '140px' }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              x: [0, -12, 0],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Bottom bracket streamline */}
          <motion.div
            className="absolute top-[68%] -left-44 h-[2px] bg-gradient-to-r from-transparent via-amber-300/30 to-amber-300"
            style={{ width: isHovered ? '260px' : '160px' }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              x: [0, -20, 0],
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* Wheel wake air swirl */}
          <motion.div
            className="absolute top-[75%] left-[16%] w-24 h-12 rounded-full border border-amber-400/20 blur-[2px]"
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.4, 0.1, 0.4],
              x: [-10, -35, -10],
            }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </div>
      )}

      {/* Main Bicycle Vector Visual */}
      <BicycleGraphic
        mode={mode}
        wheelAngle={internalWheelAngle}
        activePart={activePart}
        facingDirection={direction}
        className="w-full h-auto transition-transform duration-500 ease-out"
      />

      {/* Interactive Telemetry Overlay on Hover */}
      {interactive && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 border border-amber-400/40 px-3 py-1 text-[10px] font-mono-tech uppercase tracking-widest text-amber-300 shadow-xl backdrop-blur-md"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping mr-2" />
          KINETIC PROTAGONIST // CADENCE 94 RPM // CdA 0.218
        </motion.div>
      )}
    </div>
  );
};
