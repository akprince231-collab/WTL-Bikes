import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Scene01Entrance } from './components/Scene01Entrance';
import { Scene02Hero } from './components/Scene02Hero';
import { Scene03BrandStatement } from './components/Scene03BrandStatement';
import { Scene04CategoryExplorer } from './components/Scene04CategoryExplorer';
import { Scene05FeaturedProduct } from './components/Scene05FeaturedProduct';
import { Scene06Engineering } from './components/Scene06Engineering';
import { Scene07Lifestyle } from './components/Scene07Lifestyle';
import { Scene08Story } from './components/Scene08Story';
import { Scene09Stories } from './components/Scene09Stories';
import { Scene10FinalCTA } from './components/Scene10FinalCTA';
import { DealerModal } from './components/DealerModal';
import { ProtagonistHUD } from './components/ProtagonistHUD';
import { SprintChaseOverlay } from './components/SprintChaseOverlay';
import { playFreehubClick } from './utils/audio';

export default function App() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [dealerModalOpen, setDealerModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [sprintActive, setSprintActive] = useState(false);

  // Smooth scroll handler helper
  const scrollToSection = (id: string) => {
    playFreehubClick(1.2);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-white selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden font-sans">
      {/* 01. Pre-Hero Cinematic Entrance */}
      {showEntrance && (
        <Scene01Entrance onComplete={() => setShowEntrance(false)} />
      )}

      {/* Global High-Speed Sprint Animation Overlay */}
      <SprintChaseOverlay
        isActive={sprintActive}
        onComplete={() => setSprintActive(false)}
      />

      {/* Interactive Sticky Header */}
      <Navbar
        onOpenDealerModal={() => setDealerModalOpen(true)}
        activeSection={activeSection}
      />

      {/* 02. Spatial Hero Scene */}
      <Scene02Hero
        onExploreBikes={() => scrollToSection('categories')}
        onDiscoverWtl={() => scrollToSection('story')}
      />

      {/* 03. Brand Statement ("MORE THAN A BICYCLE") */}
      <Scene03BrandStatement />

      {/* 04. Category Explorer ("FIND YOUR RIDE") */}
      <Scene04CategoryExplorer
        onSelectBike={() => scrollToSection('product-reveal')}
      />

      {/* 05. Flagship Product Reveal & Anatomy Interaction */}
      <Scene05FeaturedProduct />

      {/* 06. Engineered For The Ride */}
      <Scene06Engineering />

      {/* 07. Full-Screen Cinematic Lifestyle Movement */}
      <Scene07Lifestyle />

      {/* 08. The WTL Story */}
      <Scene08Story />

      {/* 09. WTL Editorial Stories */}
      <Scene09Stories />

      {/* 10. The Chase Ends Final CTA & Brand Footer */}
      <Scene10FinalCTA
        onExploreBikes={() => scrollToSection('categories')}
        onOpenDealerModal={() => setDealerModalOpen(true)}
      />

      {/* Interactive Protagonist Journey HUD */}
      <ProtagonistHUD
        onReplayEntrance={() => setShowEntrance(true)}
        onTriggerSprint={() => setSprintActive(true)}
        activeSection={activeSection}
      />

      {/* Global Dealer Locator Modal */}
      <DealerModal
        isOpen={dealerModalOpen}
        onClose={() => setDealerModalOpen(false)}
      />
    </div>
  );
}
