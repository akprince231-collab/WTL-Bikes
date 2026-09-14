export type BicycleRenderMode = 'realistic' | 'wireframe' | 'silhouette' | 'minimal' | 'gold-accent';

export interface BicycleSpecs {
  id: string;
  name: string;
  tagline: string;
  category: 'ROAD' | 'GRAVEL' | 'MTB' | 'URBAN' | 'KIDS';
  weight: string;
  frame: string;
  wheels: string;
  drivetrain: string;
  brakes: string;
  terrain: string;
  colorScheme: {
    primary: string;
    accent: string;
    bgGradient: string;
  };
  highlights: string[];
}

export interface AnatomyHotspot {
  id: string;
  label: string;
  title: string;
  description: string;
  x: number; // percentage in SVG viewBox
  y: number;
  specs: string;
}

export interface EditorialStory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  author: string;
}

export interface DealerLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  type: 'Flagship Studio' | 'Pro Partner' | 'Service Hub';
}
