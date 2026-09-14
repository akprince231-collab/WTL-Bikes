import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { BicycleGraphic } from './BicycleGraphic';
import { WtlLogo } from './WtlLogo';
import { playFreehubClick, playWindWhoosh } from '../utils/audio';

interface Scene10FinalCTAProps {
  onExploreBikes: () => void;
  onOpenDealerModal: () => void;
}

export const Scene10FinalCTA: React.FC<Scene10FinalCTAProps> = ({
  onExploreBikes,
  onOpenDealerModal,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // The returning bicycle accelerates toward the CTA then exits off-screen right
  const finalBikeX = useTransform(scrollYProgress, [0.1, 0.85], [-350, 1150]);
  const finalBikeScale = useTransform(scrollYProgress, [0.1, 0.5, 0.85], [0.85, 1.1, 0.95]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    playFreehubClick(1.5);
    setSubscribed(true);
  };

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#040711] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Grids & Amber Horizon Glow */}
      <div className="absolute inset-0 bg-grid-tech pointer-events-none opacity-25" />
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-400/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Final CTA Arena */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-32 pb-16 sm:pb-24 flex-1 flex flex-col justify-center">
        {/* Section Marker */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono-tech text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-amber-400 mb-4 sm:mb-6">
          <span>10 // THE CHASE ENDS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span className="truncate">DESTINATION REACHED</span>
        </div>

        {/* Large Headline */}
        <div className="relative max-w-4xl">
          <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight uppercase leading-[0.9] drop-shadow-2xl">
            YOUR NEXT RIDE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-white">
              STARTS HERE.
            </span>
          </h2>
        </div>

        {/* The Returning Bicycle Protagonist Moving Across toward the CTA and Exiting */}
        <div className="relative w-full h-36 sm:h-52 md:h-64 my-4 sm:my-6 overflow-hidden">
          <motion.div
            style={{ x: finalBikeX, scale: finalBikeScale }}
            className="absolute top-0 left-0 w-[300px] sm:w-[480px] md:w-[620px] pointer-events-none"
          >
            <div className="relative">
              {/* Aerodynamic Speed Trails */}
              <div className="absolute top-[35%] -left-48 w-60 h-[2px] bg-gradient-to-r from-transparent to-amber-400 opacity-80" />
              <div className="absolute top-[65%] -left-64 w-80 h-[2px] bg-gradient-to-r from-transparent to-amber-300 opacity-60" />
              
              <BicycleGraphic
                mode="realistic"
                isSpinning={true}
                spinDuration={0.65}
                className="w-full h-auto filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Dual CTA Buttons - Full Width on Mobile, Inline on Desktop */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 pt-2 sm:pt-4 w-full sm:w-auto">
          <button
            onClick={() => {
              playWindWhoosh();
              playFreehubClick(1.3);
              onExploreBikes();
            }}
            className="w-full sm:w-auto min-h-[48px] px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono-tech font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-amber-400/25 transform hover:-translate-y-0.5 clip-parallelogram group"
          >
            <span>EXPLORE BIKES</span>
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              playFreehubClick(1.2);
              onOpenDealerModal();
            }}
            className="w-full sm:w-auto min-h-[48px] px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-mono-tech font-semibold text-xs uppercase tracking-widest border border-white/15 hover:border-amber-400/50 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md transform hover:-translate-y-0.5 clip-parallelogram group"
          >
            <MapPin size={14} className="text-amber-400 group-hover:scale-110 transition-transform" />
            <span>FIND A DEALER</span>
          </button>
        </div>
      </div>

      {/* Brand Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#02050C] px-4 sm:px-6 lg:px-12 py-12 sm:py-16 text-slate-400 font-mono-tech text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-12 border-b border-white/10">
          {/* Col 1: Logo & Statement */}
          <div className="md:col-span-4 space-y-4">
            <WtlLogo size="md" />
            <p className="text-slate-400 text-xs font-light leading-relaxed max-w-sm mt-3">
              Precision human-powered road, gravel, and urban bicycles engineered for direct torque, wind-tunnel efficiency, and athletic endurance.
            </p>
            <div className="text-[10px] text-amber-400/80">
              STRICTLY HUMAN-POWERED ARCHITECTURE // NO MOTORS
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-bold tracking-widest uppercase">COLLECTIONS</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#categories" className="hover:text-amber-400 transition-colors">Veloce Aero (Road)</a></li>
              <li><a href="#categories" className="hover:text-amber-400 transition-colors">Terra Apex (Gravel)</a></li>
              <li><a href="#categories" className="hover:text-amber-400 transition-colors">Summit XC (MTB)</a></li>
              <li><a href="#categories" className="hover:text-amber-400 transition-colors">Metro Kinetic (Urban)</a></li>
              <li><a href="#categories" className="hover:text-amber-400 transition-colors">Junior Sprint (Kids)</a></li>
            </ul>
          </div>

          {/* Col 3: Technology */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-bold tracking-widest uppercase">TECHNOLOGY</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#product-reveal" className="hover:text-amber-400 transition-colors">Torayca T1100 Carbon</a></li>
              <li><a href="#engineering" className="hover:text-amber-400 transition-colors">Aerodynamic Tunnel (CdA)</a></li>
              <li><a href="#product-reveal" className="hover:text-amber-400 transition-colors">Active Micro-Flex</a></li>
              <li><a href="#product-reveal" className="hover:text-amber-400 transition-colors">Zero-Cable Cockpit</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Dispatch Signup */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold tracking-widest uppercase">THE WTL DISPATCH</h4>
            <p className="text-slate-400 text-xs">
              Receive aerodynamic white papers, endurance dispatches, and studio release alerts.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-amber-400 bg-amber-400/10 border border-amber-400/30 p-3 text-xs">
                <CheckCircle2 size={16} />
                <span>YOU ARE REGISTERED FOR WTL DISPATCHES.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter rider email"
                  required
                  className="bg-white/5 border border-white/10 px-4 py-2.5 min-h-[44px] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 min-h-[44px] bg-amber-400 text-slate-950 font-bold uppercase hover:bg-amber-300 transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Rights & Certification */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} WTL BIKES INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>ISO 4210 RACING STANDARD</span>
            <span>WTL KINETICS LAB</span>
            <span>PRIVACY & WARRANTY</span>
          </div>
        </div>
      </footer>
    </section>
  );
};
