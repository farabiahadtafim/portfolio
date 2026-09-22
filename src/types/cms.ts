export interface SiteSettings {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  main_image_url: string;
  bg_color: string;
  updated_at?: string;
}

export interface CMSProject {
  id: string;
  title: string;
  category: string;
  accent_color: string;
  image_url?: string | null;
  order_index: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Main (Home) Page Data Types
export interface HomeSettings {
  id: string;
  hero_headline_top: string;
  hero_headline_bottom: string;
  hero_tagline: string;
  hero_avatar_url: string;
  hero_cta_text: string;
  client_count: string;
  bio_title: string;
  about_photo_url: string;
  carousel_images?: string[];
  updated_at?: string;
}

export interface MainProject {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  link: string;
  order_index?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface FaqItem {
  number: string;
  question: string;
  answer: string;
}

export type ConnectionStatus = 'connected' | 'connecting' | 'demo_mode' | 'error';

export interface PortfolioContextType {
  // Work Page state
  settings: SiteSettings;
  projects: CMSProject[];

  // Main Page state
  homeSettings: HomeSettings;
  mainProjects: MainProject[];
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];

  isLoading: boolean;
  connectionStatus: ConnectionStatus;
  lastSynced: Date | null;
  errorMessage: string | null;

  // Work Page mutations
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<{ success: boolean; error?: string }>;
  createProject: (project: Omit<CMSProject, 'id' | 'order_index'>) => Promise<{ success: boolean; data?: CMSProject; error?: string }>;
  updateProject: (id: string, updates: Partial<CMSProject>) => Promise<{ success: boolean; error?: string }>;
  deleteProject: (id: string) => Promise<{ success: boolean; error?: string }>;
  reorderProjects: (orderedProjects: CMSProject[]) => Promise<{ success: boolean; error?: string }>;

  // Main Page mutations
  updateHomeSettings: (updates: Partial<HomeSettings>) => Promise<{ success: boolean; error?: string }>;
  createMainProject: (project: Omit<MainProject, 'id'>) => Promise<{ success: boolean; data?: MainProject; error?: string }>;
  updateMainProject: (id: string, updates: Partial<MainProject>) => Promise<{ success: boolean; error?: string }>;
  deleteMainProject: (id: string) => Promise<{ success: boolean; error?: string }>;

  createService: (service: Omit<ServiceItem, 'id'>) => Promise<{ success: boolean; data?: ServiceItem; error?: string }>;
  updateService: (id: string, updates: Partial<ServiceItem>) => Promise<{ success: boolean; error?: string }>;
  deleteService: (id: string) => Promise<{ success: boolean; error?: string }>;

  createTestimonial: (item: Omit<TestimonialItem, 'id'>) => Promise<{ success: boolean; data?: TestimonialItem; error?: string }>;
  updateTestimonial: (id: string, updates: Partial<TestimonialItem>) => Promise<{ success: boolean; error?: string }>;
  deleteTestimonial: (id: string) => Promise<{ success: boolean; error?: string }>;

  createFaq: (item: FaqItem) => Promise<{ success: boolean; data?: FaqItem; error?: string }>;
  updateFaq: (number: string, updates: Partial<FaqItem>) => Promise<{ success: boolean; error?: string }>;
  deleteFaq: (number: string) => Promise<{ success: boolean; error?: string }>;

  // Storage
  uploadAsset: (file: File, folder?: string, oldFileUrl?: string) => Promise<{ success: boolean; publicUrl?: string; error?: string }>;
}
