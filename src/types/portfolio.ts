
export interface Profile {
  name: string;
  formalName?: string;
  brandName?: string;
  shortName: string;
  role: string;
  secondaryRole?: string;
  location?: string;
  tagline: string;
  heroSubtext?: string;
  clientCount?: string;
  clientProofAvatars?: string[];
  heroAvatar?: string;
  navAvatar?: string;
  aboutPhoto?: string;
  bioTitle?: string;
  bioParagraphs?: string[];
  featuredQuote?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
  social: {
    email: string;
    phone?: string;
    whatsapp?: string;
    linktree?: string;
    bookingLink?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    behance?: string;
    threads?: string;
    github?: string;
  };
}

export interface ClientLogo {
  name: string;
  symbol: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  link: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface WorkHistoryItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  description?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface FaqItem {
  number: string;
  question: string;
  answer: string;
}

export interface Portfolio {
  profile: Profile;
  clientLogos: ClientLogo[];
  projects: Project[];
  tools: string[];
  services: ServiceItem[];
  workHistory: WorkHistoryItem[];
  education?: EducationItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
}
