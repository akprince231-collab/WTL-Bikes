import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Menu, X, ArrowRight, MapPin, Compass } from 'lucide-react';
import { WtlLogo } from './WtlLogo';
import { isAudioOn, setAudioEnabled, playFreehubClick } from '../utils/audio';

interface NavbarProps {
  onOpenDealerModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDealerModal, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [mobileMenuOpen]);

  const toggleAudio = () => {
    const next = !audioActive;
    setAudioActive(next);
    setAudioEnabled(next);
    if (next) {
      playFreehubClick(1.2);
    }
  };

  const navLinks = [
    { label: 'Bicycles', href: '#categories' },
    { label: 'Anatomy', href: '#product-reveal' },
    { label: 'Engineering', href: '#engineering' },
    { label: 'Lifestyle', href: '#lifestyle' },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    playFreehubClick(1.1);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="wtl-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#070B19]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo with responsive breathing space */}
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, '#hero')}
            className="group flex items-center focus:outline-none mr-6 sm:mr-8 md:mr-12 lg:mr-16 xl:mr-24 shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            id="nav-brand-logo"
            aria-label="WTL Bikes Home"
          >
            <WtlLogo size="md" />
          </a>

          {/* Desktop Navigation Links with clean gap from the logo */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-9 mr-auto" id="nav-desktop-links">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="relative group text-xs font-mono-tech uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-colors duration-200 py-1"
              >
                <span>{item.label}</span>
                {/* Directional yellow underline */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Ambient Sound Engine Toggle */}
            <button
              id="audio-toggle-btn"
              onClick={toggleAudio}
              className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center min-w-[40px] min-h-[40px] ${
                audioActive
                  ? 'border-amber-400 bg-amber-400/10 text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                  : 'border-white/10 text-slate-400 hover:text-white hover:border-white/30'
              }`}
              title={audioActive ? 'Mute Mechanical Audio' : 'Enable Freehub & Aero Sound'}
            >
              {audioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="sr-only">Toggle Sound</span>
            </button>

            {/* Primary CTA: Find a Dealer */}
            <button
              id="nav-dealer-cta"
              onClick={() => {
                playFreehubClick(1.3);
                onOpenDealerModal();
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 md:px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-amber-400/20 group clip-parallelogram"
            >
              <MapPin size={14} className="transition-transform group-hover:scale-110" />
              <span>Find a Dealer</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-300 hover:text-white border border-white/10 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with Safe-Area & Touch Optimization */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[64px] z-40 bg-[#070B19]/98 backdrop-blur-2xl border-b border-amber-400/20 px-6 py-6 flex flex-col justify-between lg:hidden overflow-y-auto max-h-[calc(100dvh-64px)]"
          >
            <div className="space-y-6">
              <div className="text-[10px] font-mono-tech text-amber-400 tracking-widest uppercase flex items-center justify-between">
                <span>NAVIGATION EXPEDITION</span>
                <span className="text-slate-500">WTL BIKES</span>
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="min-h-[52px] text-2xl font-display font-bold tracking-wider text-slate-200 active:text-amber-400 hover:text-amber-400 transition-colors flex items-center justify-between border-b border-white/5 py-2"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={18} className="text-amber-400" />
                  </a>
                ))}
              </div>

              {/* Sound Engine quick toggle inside mobile drawer */}
              <div className="pt-2">
                <button
                  onClick={toggleAudio}
                  className="w-full py-3 px-4 rounded border border-white/10 bg-white/[0.03] text-left flex items-center justify-between font-mono-tech text-xs text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    {audioActive ? <Volume2 size={16} className="text-amber-400" /> : <VolumeX size={16} className="text-slate-400" />}
                    <span>Aero Sound & Freehub FX</span>
                  </span>
                  <span className={audioActive ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                    {audioActive ? 'ENABLED' : 'MUTED'}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10 pb-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDealerModal();
                }}
                className="w-full min-h-[48px] py-3.5 bg-amber-400 active:bg-amber-300 hover:bg-amber-300 text-slate-950 font-mono-tech font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 clip-parallelogram shadow-lg shadow-amber-400/20"
              >
                <MapPin size={16} />
                <span>Find a Dealer Studio</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
