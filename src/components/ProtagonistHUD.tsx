import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Activity } from 'lucide-react';
import { playFreehubClick, playWindWhoosh } from '../utils/audio';

interface ProtagonistHUDProps {
  onReplayEntrance: () => void;
  onTriggerSprint: () => void;
  activeSection: string;
}

const SCENE_NAMES = [
  { id: 'hero', label: '01. Entrance & Hero' },
  { id: 'brand-statement', label: '02. Manifesto' },
  { id: 'categories', label: '03. Fleet Matrix' },
  { id: 'product-reveal', label: '04. Anatomy' },
  { id: 'engineering', label: '05. Engineering' },
  { id: 'lifestyle', label: '06. Sanctuary' },
  { id: 'story', label: '07. Brand Story' },
  { id: 'stories', label: '08. Editorial' },
  { id: 'final-cta', label: '09. The Destination' },
];

export const ProtagonistHUD: React.FC<ProtagonistHUDProps> = ({
  onReplayEntrance,
  onTriggerSprint,
  activeSection,
}) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    playFreehubClick(1.2);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Floating Pill / Mini HUD Trigger (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        {!collapsed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#070B19]/95 border border-amber-400/40 backdrop-blur-2xl p-4 shadow-2xl text-white font-mono-tech select-none w-[calc(100vw-32px)] max-w-sm"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2 text-[10px] text-amber-400 font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>CHASE TELEMETRY // {Math.round(scrollPercent)}%</span>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="p-1 text-slate-400 hover:text-white text-xs font-bold px-2 py-0.5 bg-white/5 border border-white/10"
              >
                CLOSE
              </button>
            </div>

            {/* Mobile Progress Bar */}
            <div className="mb-3">
              <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
            </div>

            {/* Mobile Actions: Sprint Chase & Quick Jumps */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => {
                  playWindWhoosh();
                  onTriggerSprint();
                }}
                className="flex-1 min-h-[42px] py-2 bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:bg-amber-300"
              >
                <Play size={12} className="fill-slate-950" />
                <span>Sprint Chase</span>
              </button>
              <button
                onClick={onReplayEntrance}
                className="min-h-[42px] px-3 bg-white/10 active:bg-white/20 border border-white/15 text-slate-200 text-xs flex items-center justify-center gap-1.5"
                title="Replay Intro"
              >
                <RotateCcw size={13} />
                <span>Intro</span>
              </button>
            </div>

            {/* Mobile Scene Jumps */}
            <div className="grid grid-cols-3 gap-1.5">
              {SCENE_NAMES.slice(0, 6).map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    scrollToSection(scene.id);
                    setCollapsed(true);
                  }}
                  className="py-1.5 px-2 text-[10px] bg-white/5 active:bg-amber-400 active:text-slate-950 border border-white/10 transition-colors truncate text-center"
                >
                  {scene.label.split(' ')[1]}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <button
            onClick={() => setCollapsed(false)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#070B19]/95 border border-amber-400/60 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.3)] text-amber-400 font-mono-tech text-xs active:scale-95 transition-all backdrop-blur-xl"
            aria-label="Open Telemetry HUD"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold tracking-wider">{Math.round(scrollPercent)}%</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest border-l border-white/15 pl-2">CHASE</span>
          </button>
        )}
      </div>

      {/* Desktop / Laptop HUD (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="bg-[#070B19]/90 border border-amber-400/30 backdrop-blur-2xl p-3 shadow-2xl text-white font-mono-tech select-none max-w-xs">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 mb-2">
            <div className="flex items-center gap-2 text-[10px] text-amber-400 font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>PROTAGONIST CHASE HUD</span>
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 border border-white/10 hover:border-white/30"
            >
              {collapsed ? 'EXPAND' : 'MIN'}
            </button>
          </div>

          {!collapsed ? (
            <div className="space-y-3">
              {/* Real-time Progress Bar with Mini Bicycle Icon */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>JOURNEY COMPLETION</span>
                  <span className="text-amber-400 font-bold">{Math.round(scrollPercent)}%</span>
                </div>
                <div className="relative w-full h-1.5 bg-white/10 overflow-visible">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-300"
                    style={{ width: `${scrollPercent}%` }}
                  />
                  {/* Mini bicycle position indicator */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center -translate-x-1/2 shadow-lg"
                    style={{ left: `${scrollPercent}%` }}
                    title="Protagonist Current Position"
                  >
                    <Activity size={10} />
                  </div>
                </div>
              </div>

              {/* Quick Scene Jumps */}
              <div className="grid grid-cols-3 gap-1">
                {SCENE_NAMES.slice(0, 6).map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => scrollToSection(scene.id)}
                    className="px-1.5 py-1 text-[9px] bg-white/5 hover:bg-amber-400 hover:text-slate-950 border border-white/5 transition-colors truncate"
                    title={scene.label}
                  >
                    {scene.label.split(' ')[1]}
                  </button>
                ))}
              </div>

              {/* Kinetic Actions */}
              <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                <button
                  onClick={() => {
                    playWindWhoosh();
                    onTriggerSprint();
                  }}
                  className="flex-1 py-1.5 bg-amber-400/20 hover:bg-amber-400 hover:text-slate-950 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                  title="Watch the bicycle sprint across screen"
                >
                  <Play size={10} />
                  <span>Sprint Chase</span>
                </button>
                <button
                  onClick={onReplayEntrance}
                  className="p-1.5 bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Replay Entrance Sequence"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
              <span>{Math.round(scrollPercent)}% SCROLLED</span>
              <button
                onClick={() => {
                  playWindWhoosh();
                  onTriggerSprint();
                }}
                className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-amber-400 text-slate-950 font-bold"
              >
                Sprint
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
