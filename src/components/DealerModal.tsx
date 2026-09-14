import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, MapPin, Phone, Check, Calendar, ArrowRight } from 'lucide-react';
import { DEALERS } from '../data';
import { DealerLocation } from '../types';
import { playFreehubClick } from '../utils/audio';

interface DealerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DealerModal: React.FC<DealerModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDealer, setSelectedDealer] = useState<DealerLocation | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen) return null;

  const filteredDealers = DEALERS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookTestRide = (dealer: DealerLocation) => {
    playFreehubClick(1.3);
    setSelectedDealer(dealer);
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedDealer(null);
    }, 3200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#070B19] border border-amber-400/40 w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative text-white my-auto"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="font-mono-tech text-[10px] sm:text-xs text-amber-400 tracking-widest uppercase">
                GLOBAL NETWORK // STUDIOS & PARTNERS
              </span>
              <h3 className="font-display font-black text-xl sm:text-3xl uppercase mt-0.5 sm:mt-1">
                FIND A WTL DEALER
              </h3>
            </div>
            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-white border border-white/10 rounded transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search bar */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search city, country or studio (e.g. Milan, London)..."
                className="w-full min-h-[44px] bg-white/5 border border-white/10 pl-11 pr-4 py-2.5 text-xs font-mono-tech text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Dealer Results List */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[460px] space-y-4">
            {bookingConfirmed && selectedDealer && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-amber-400/10 border border-amber-400 text-amber-300 font-mono-tech text-xs flex items-center gap-3 mb-4"
              >
                <Check size={18} className="text-amber-400 shrink-0" />
                <span>
                  TEST RIDE REQUEST CONFIRMED FOR {selectedDealer.name.toUpperCase()}. CONCIERGE WILL CONTACT YOU SHORTLY.
                </span>
              </motion.div>
            )}

            {filteredDealers.map((dealer) => (
              <div
                key={dealer.id}
                className="p-4 border border-white/10 bg-white/[0.02] hover:border-amber-400/50 hover:bg-white/[0.04] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono-tech text-[10px] uppercase px-2 py-0.5 bg-amber-400/10 border border-amber-400/30 text-amber-300">
                      {dealer.type}
                    </span>
                    <span className="font-mono-tech text-xs text-slate-400">
                      {dealer.city}, {dealer.country}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">
                    {dealer.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-tech mt-1">
                    <MapPin size={12} className="text-amber-400 shrink-0" />
                    <span>{dealer.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-tech mt-0.5">
                    <Phone size={12} className="text-amber-400 shrink-0" />
                    <span>{dealer.phone}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookTestRide(dealer)}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all self-stretch sm:self-center shrink-0 flex items-center justify-center gap-2"
                >
                  <Calendar size={14} />
                  <span>Book Test Ride</span>
                </button>
              </div>
            ))}

            {filteredDealers.length === 0 && (
              <div className="text-center py-12 text-slate-400 font-mono-tech text-xs">
                NO WTL LOCATIONS FOUND MATCHING &quot;{searchTerm}&quot;.
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 sm:p-4 border-t border-white/10 bg-black/40 flex items-center justify-between font-mono-tech text-[10px] sm:text-[11px] text-slate-400">
            <span className="truncate pr-2">CUSTOM FITTING & WIND-TUNNEL SIZING AVAILABLE</span>
            <button onClick={onClose} className="text-amber-400 hover:underline min-h-[36px] px-2 flex items-center">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
