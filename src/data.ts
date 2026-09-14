import { BicycleSpecs, AnatomyHotspot, EditorialStory, DealerLocation } from './types';
import cyclistMountainImg from './assets/images/wtl_cyclist_mountain_1789219609847.jpg';
import roadBikeStudioImg from './assets/images/wtl_road_bike_studio_1789219595935.jpg';
import gravelTrailImg from './assets/images/wtl_gravel_trail_1789219623269.jpg';

export { cyclistMountainImg, roadBikeStudioImg, gravelTrailImg };

export const CATEGORIES_DATA: BicycleSpecs[] = [
  {
    id: 'road',
    name: 'WTL VELOCE AERO',
    tagline: 'Pure aerodynamic velocity engineered for tarmac domination.',
    category: 'ROAD',
    weight: '6.84 kg',
    frame: 'Torayca T1100 Unidirectional Carbon Monocoque',
    wheels: 'WTL Aero 50mm Disc Carbon with CeramicSpeed Bearings',
    drivetrain: 'Electronic Synchro-Shift 2x12 Speed (52/36T - 11/30T)',
    brakes: 'Hydraulic Flat-Mount 160mm Ice-Tech Rotors',
    terrain: 'Smooth Asphalt & Velodrome Passes',
    colorScheme: {
      primary: '#FBBF24',
      accent: '#38BDF8',
      bgGradient: 'from-[#070B19] via-[#0A1128] to-[#040711]'
    },
    highlights: ['Wind-tunnel verified CdA 0.218', 'Fully integrated internal routing', 'Zero-cable cockpit']
  },
  {
    id: 'gravel',
    name: 'WTL TERRA APEX',
    tagline: 'Infinite horizons, untamed gravel and relentless durability.',
    category: 'GRAVEL',
    weight: '7.45 kg',
    frame: 'High-Modulus Carbon with Vibration-Dampening Seatstays',
    wheels: 'WTL Gravel Wide Hookless 40mm (up to 50mm clearance)',
    drivetrain: 'Wide-Range 1x12 Speed (42T - 10/52T)',
    brakes: 'Hydraulic Disc 180mm Front / 160mm Rear',
    terrain: 'Crushed Limestone, Forest Fire Roads & Mixed Trail',
    colorScheme: {
      primary: '#F59E0B',
      accent: '#10B981',
      bgGradient: 'from-[#0B1524] via-[#09111E] to-[#050912]'
    },
    highlights: ['50mm tyre clearance', 'Direct downtube cargo storage', 'Active compliance micro-flex']
  },
  {
    id: 'mtb',
    name: 'WTL SUMMIT XC',
    tagline: 'Aggressive cross-country precision built for technical elevation.',
    category: 'MTB',
    weight: '9.10 kg',
    frame: 'Toray Ultra-Lite Carbon with Boost 148 Spacing',
    wheels: 'WTL 29" Asymmetric Carbon Wheels with 2.4" Racing Treads',
    drivetrain: '1x12 Wireless Electronic High-Torque Shift',
    brakes: '4-Piston Hydraulic Disc Calipers (180/180mm)',
    terrain: 'Singletrack, Alpine Climbs & Rock Gardens',
    colorScheme: {
      primary: '#EAB308',
      accent: '#F97316',
      bgGradient: 'from-[#07121C] via-[#060D18] to-[#02060A]'
    },
    highlights: ['110mm remote lockout fork', 'Progressive 66.5° head angle', 'Integrated carbon bashguard']
  },
  {
    id: 'urban',
    name: 'WTL METRO KINETIC',
    tagline: 'Fast, sharp, and whisper-quiet urban transit architecture.',
    category: 'URBAN',
    weight: '8.20 kg',
    frame: 'Hydroformed Triple-Butted 6061-T6 Alloy with Carbon Fork',
    wheels: 'WTL Urban 700c Puncture-Shield Reflective Rims',
    drivetrain: 'Carbon Belt Drive with 8-Speed Internal Planetary Hub',
    brakes: 'Dual Piston All-Weather Hydraulic Discs',
    terrain: 'Metropolitan Corridors, Pavements & Bike Boulevards',
    colorScheme: {
      primary: '#FBBF24',
      accent: '#A855F7',
      bgGradient: 'from-[#090E24] via-[#080D1F] to-[#040610]'
    },
    highlights: ['Clean Gates carbon belt drive', 'Integrated dynamo daytime lights', 'Stealth fender mounts']
  },
  {
    id: 'kids',
    name: 'WTL JUNIOR SPRINT',
    tagline: 'Lightweight ergonomic geometry designed for next-gen riders.',
    category: 'KIDS',
    weight: '6.30 kg',
    frame: 'Featherlight 6061 Aircraft Aluminum Custom Tuned',
    wheels: '24" Fast-Rolling Sealed Bearing Spoke Wheels',
    drivetrain: '1x8 Short-Cage Rapidfire Trigger Gearset',
    brakes: 'Short-Reach Ergonomic Child-Specific Hydraulic Levers',
    terrain: 'Neighborhood Circuits, Pump Tracks & Family Paths',
    colorScheme: {
      primary: '#FBBF24',
      accent: '#EC4899',
      bgGradient: 'from-[#0A162B] via-[#07101E] to-[#03070E]'
    },
    highlights: ['Micro-proportional crank length', 'Safety-tuned steering limiter', 'Ultra-low standover height']
  }
];

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'frame',
    label: '01 / CHASSIS',
    title: 'Monocoque Carbon Chassis',
    description: 'High-tensile Toray T1100 carbon layup engineered with kammtail aerodynamic profiles to slice through head- and cross-winds.',
    x: 48,
    y: 42,
    specs: 'TORAYCA T1100 / 780G UNPAINTED'
  },
  {
    id: 'cockpit',
    label: '02 / COCKPIT',
    title: 'Integrated Aero Bar & Stem',
    description: 'One-piece carbon cockpit with zero exposed cables. Designed with flared drops for ergonomic sprint ergonomics and a 12-degree stem pitch.',
    x: 74,
    y: 28,
    specs: 'ONE-PIECE 380-420MM / INTERNAL GUIDES'
  },
  {
    id: 'wheels',
    label: '03 / WHEELSET',
    title: '50mm Depth Aerodynamic Rims',
    description: 'Deep-profile spoked carbon wheels with bladed straight-pull spokes and ceramic hub internals for near-frictionless rotation.',
    x: 82,
    y: 68,
    specs: '50MM HOOKLESS / 28MM EXTERNAL / CERAMIC'
  },
  {
    id: 'drivetrain',
    label: '04 / DRIVETRAIN',
    title: 'Synchronized 12-Speed Crankset',
    description: 'Carbon fiber crank arms paired with an oversized bottom bracket shell (BB386EVO) ensuring 100% of rider wattage delivers to the tarmac.',
    x: 46,
    y: 68,
    specs: '54/40T CARBON CRANK / 11-34T CASSETTE'
  },
  {
    id: 'brakes',
    label: '05 / BRAKING',
    title: 'Hydraulic Flat-Mount Calipers',
    description: 'Precision dual-piston calipers operating on floating titanium-carrier rotors for fade-free descent stopping power in dry or wet.',
    x: 20,
    y: 65,
    specs: '160MM FRONT / 140MM REAR ICE-TECH'
  },
  {
    id: 'saddle',
    label: '06 / CONTACT',
    title: '3D-Printed Honeycomb Saddle',
    description: 'Zonal cushioning manufactured via liquid-resin 3D printing, mounted on oval 7x9mm carbon rails for targeted ischial support.',
    x: 32,
    y: 26,
    specs: 'CARBON SHELL / CARBON 7X9MM RAILS'
  }
];

export const EDITORIAL_STORIES: EditorialStory[] = [
  {
    id: 'story-1',
    number: '01',
    title: 'The 300km Solitude',
    subtitle: 'Chasing the first dawn across the Trans-Alpine spine.',
    category: 'ENDURANCE DISPATCH',
    readTime: '6 MIN READ',
    image: cyclistMountainImg,
    excerpt: 'At 04:15 AM, the thermometer reads 2°C at the summit pass. Silence is broken only by the rhythmic clicking of the freehub and crisp tire hum on frost.',
    author: 'Elena Vance, Ultra-Distance Specialist'
  },
  {
    id: 'story-2',
    number: '02',
    title: 'Gram by Gram in the Tunnel',
    subtitle: 'Inside the 50m/s wind facility shaping the WTL Apex.',
    category: 'AERODYNAMIC SCIENCE',
    readTime: '8 MIN READ',
    image: roadBikeStudioImg,
    excerpt: 'Aerodynamics is a game of millimeters. By reshaping the fork crown junction and integrating the disc brake calipers flush into the carbon flow, we saved 14.2 watts.',
    author: 'Dr. Marcus Thorne, Lead Aerodynamicist'
  },
  {
    id: 'story-3',
    number: '03',
    title: 'The Coastal Overlook',
    subtitle: 'Where paved tarmac dissolves into jagged cliffside grit.',
    category: 'GRAVEL EXPEDITIONS',
    readTime: '5 MIN READ',
    image: gravelTrailImg,
    excerpt: 'No maps, no scheduled turn-offs. When you ride a human-powered machine built for whatever surface emerges, every trail becomes a sanctuary.',
    author: 'Kai Lindqvist, Field Test Director'
  }
];

export const DEALERS: DealerLocation[] = [
  {
    id: 'd1',
    name: 'WTL Flagship Milano',
    city: 'Milan',
    country: 'Italy',
    address: 'Via Tortona 32, 20144 Milano',
    phone: '+39 02 8941 7720',
    type: 'Flagship Studio'
  },
  {
    id: 'd2',
    name: 'WTL Studio London',
    city: 'London',
    country: 'United Kingdom',
    address: '14 Shoreditch High Street, London E1 6PG',
    phone: '+44 20 7946 0812',
    type: 'Flagship Studio'
  },
  {
    id: 'd3',
    name: 'WTL Apex Zurich',
    city: 'Zürich',
    country: 'Switzerland',
    address: 'Badenerstrasse 116, 8004 Zürich',
    phone: '+41 44 240 1888',
    type: 'Pro Partner'
  },
  {
    id: 'd4',
    name: 'WTL Boulder Velo',
    city: 'Boulder, CO',
    country: 'United States',
    address: '1805 Pearl St, Boulder, CO 80302',
    phone: '+1 (303) 442-9901',
    type: 'Pro Partner'
  },
  {
    id: 'd5',
    name: 'WTL Tokyo Ginza',
    city: 'Tokyo',
    country: 'Japan',
    address: '6-10-1 Ginza, Chuo City, Tokyo 104-0061',
    phone: '+81 3 3572 4410',
    type: 'Flagship Studio'
  },
  {
    id: 'd6',
    name: 'WTL Melbourne Velo',
    city: 'Melbourne',
    country: 'Australia',
    address: '228 Gertrude St, Fitzroy VIC 3065',
    phone: '+61 3 9419 6632',
    type: 'Service Hub'
  }
];
