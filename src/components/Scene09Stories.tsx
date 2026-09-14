import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EDITORIAL_STORIES } from '../data';
import { EditorialStory } from '../types';
import { ArrowUpRight, BookOpen, Clock, X } from 'lucide-react';
import { playFreehubClick } from '../utils/audio';

export const Scene09Stories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<EditorialStory | null>(null);

  const handleOpenStory = (story: EditorialStory) => {
    playFreehubClick(1.2);
    setSelectedStory(story);
  };

  return (
    <section
      id="stories"
      className="relative min-h-screen w-full bg-[#050814] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 flex flex-col justify-between overflow-hidden select-none border-b border-white/5"
    >
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 bg-grid-tech pointer-events-none opacity-20" />

      {/* Top Header & Editorial Marker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-10 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 font-mono-tech text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-amber-400 mb-2">
            <span>09 // EDITORIAL GAZETTE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="truncate">DISPATCHES FROM THE ROAD</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl text-white tracking-tight uppercase leading-[0.9]">
            WTL STORIES.
          </h2>
        </div>
        <p className="font-mono-tech text-xs text-slate-400 tracking-wider sm:tracking-widest uppercase max-w-xs">
          EXPLORING THE EDGES OF HUMAN ENDURANCE AND MECHANICAL SIMPLICITY.
        </p>
      </div>

      {/* 3 Asymmetric Magazine-Style Editorial Compositions */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Story 01 — Large Hero Feature (Spans 7 columns) */}
        <div
          onClick={() => handleOpenStory(EDITORIAL_STORIES[0])}
          className="lg:col-span-7 group cursor-pointer border border-white/10 bg-[#070B19]/60 p-5 sm:p-6 md:p-8 backdrop-blur-xl transition-all duration-500 hover:border-amber-400/60 relative overflow-hidden"
        >
          {/* Subtle hover background shift */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="flex items-center justify-between font-mono-tech text-xs text-slate-400 pb-4 border-b border-white/10">
            <span className="text-amber-400 font-bold tracking-widest">
              {EDITORIAL_STORIES[0].number} // {EDITORIAL_STORIES[0].category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock size={12} />
              {EDITORIAL_STORIES[0].readTime}
            </span>
          </div>

          <div className="mt-5 sm:mt-6 aspect-[16/10] overflow-hidden relative">
            <img
              src={EDITORIAL_STORIES[0].image}
              alt={EDITORIAL_STORIES[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Animated Yellow Accent Corner Notch */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-r-[28px] border-t-transparent border-r-amber-400 group-hover:opacity-100 opacity-60 transition-opacity" />
          </div>

          <div className="mt-5 sm:mt-6 space-y-3">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white uppercase group-hover:text-amber-300 transition-all duration-300 group-hover:translate-x-1">
              {EDITORIAL_STORIES[0].title}
            </h3>
            <p className="font-mono-tech text-xs text-amber-400 tracking-wider uppercase">
              {EDITORIAL_STORIES[0].subtitle}
            </p>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              {EDITORIAL_STORIES[0].excerpt}
            </p>
            <div className="pt-2 flex items-center justify-between font-mono-tech text-xs text-slate-400">
              <span>BY {EDITORIAL_STORIES[0].author.toUpperCase()}</span>
              <span className="flex items-center gap-1 text-amber-400 group-hover:translate-x-1 transition-transform font-bold">
                <span>READ DISPATCH</span>
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* Right Stack: Story 02 & Story 03 (Spans 5 columns) */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          {EDITORIAL_STORIES.slice(1).map((story) => (
            <div
              key={story.id}
              onClick={() => handleOpenStory(story)}
              className="group cursor-pointer border border-white/10 bg-[#070B19]/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-500 hover:border-amber-400/60 relative overflow-hidden"
            >
              <div className="flex items-center justify-between font-mono-tech text-[11px] text-slate-400 pb-3 border-b border-white/10">
                <span className="text-amber-400 font-bold tracking-widest">
                  {story.number} // {story.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {story.readTime}
                </span>
              </div>

              <div className="mt-4 aspect-[16/9] overflow-hidden relative">
                <img
                  src={story.image}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="font-display font-bold text-xl sm:text-2xl text-white uppercase group-hover:text-amber-300 transition-all duration-300 group-hover:translate-x-1">
                  {story.title}
                </h4>
                <p className="text-slate-300 text-xs font-light leading-relaxed line-clamp-2">
                  {story.excerpt}
                </p>
                <div className="pt-2 flex items-center justify-between font-mono-tech text-[11px] text-slate-400">
                  <span>BY {story.author.split(',')[0].toUpperCase()}</span>
                  <span className="flex items-center gap-1 text-amber-400 group-hover:translate-x-1 transition-transform font-bold">
                    <span>EXPLORE</span>
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Story Modal / Reading Drawer */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#070B19] border border-amber-400/40 max-w-2xl w-full max-h-[88vh] overflow-y-auto p-5 sm:p-8 md:p-10 relative shadow-2xl text-white"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-white border border-white/10 hover:border-white/30 rounded transition-colors"
                aria-label="Close story"
              >
                <X size={20} />
              </button>

              <div className="font-mono-tech text-xs text-amber-400 tracking-widest uppercase mb-2">
                {selectedStory.number} // {selectedStory.category}
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase leading-tight mb-2">
                {selectedStory.title}
              </h3>
              <p className="font-mono-tech text-xs text-slate-400 uppercase tracking-widest mb-6">
                {selectedStory.subtitle}
              </p>

              <div className="aspect-[16/9] w-full overflow-hidden border border-white/10 mb-6">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>{selectedStory.excerpt}</p>
                <p>
                  The essence of endurance cycling lies in the stripping away of artificial noise. On a human-powered bicycle, every climb is paid for in lactic acid and cardiac cadence; every descent is a reward sculpted by gravitational physics and aerodynamic posture.
                </p>
                <p>
                  At WTL, our engineers test alongside our team riders across Alpine gravel cols and coastal gale passes, translating every road vibration and aerodynamic eddy into carbon fiber refinements.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono-tech text-xs text-slate-400">
                <span>AUTHOR: {selectedStory.author}</span>
                <span className="text-amber-400">WTL EDITORIAL REPOSITORY</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
