export type CategoryType = 'all' | 'commercials' | 'motion' | 'reels' | 'photography' | 'ai';

export interface Project {
  id: string;
  title: string;
  category: CategoryType;
  categoryName: string;
  client: string;
  duration?: string;
  year: string;
  thumbnail: string;
  videoUrl: string;
  embedType: 'youtube' | 'behance';
  isVertical?: boolean;
  isFeatured?: boolean;
  description: string;
  tools: string[];
  isAI?: boolean;
}

export interface SoftwareTool {
  name: string;
  nameAr: string;
  iconName: string;
  category: string;
  proficiency: number;
  description: string;
  yearsOfUse: string;
}

export interface StatItem {
  number: string;
  label: string;
  sublabel: string;
}

export interface GearItem {
  category: string;
  name: string;
  specs: string;
}
