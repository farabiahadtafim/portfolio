import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured, uploadPortfolioAsset } from '../lib/supabaseClient';
import {
  SiteSettings,
  CMSProject,
  HomeSettings,
  MainProject,
  ServiceItem,
  TestimonialItem,
  FaqItem,
  ConnectionStatus,
  PortfolioContextType,
} from '../types/cms';
import portfolioJson from '../data/portfolio.json';

// --- ROBUST FALLBACK DEFAULTS ---
const DEFAULT_SETTINGS: SiteSettings = {
  id: 'default',
  hero_title: 'PORTFOLIO',
  hero_subtitle: 'Packaging & Brand Identity Designer',
  main_image_url: '/image/Portfolio-Page-Main-Image.webp',
  bg_color: '#141316',
};

const DEFAULT_PROJECTS: CMSProject[] = [
  { id: '1', title: 'Lavender Vision', category: 'Brand Identity', accent_color: '#b8a6c9', order_index: 0, is_active: true },
  { id: '2', title: 'Sand Gold Brand', category: 'Packaging Design', accent_color: '#d7a56d', order_index: 1, is_active: true },
  { id: '3', title: 'Slate Teal Web', category: 'Digital Product', accent_color: '#5d8d9a', order_index: 2, is_active: true },
  { id: '4', title: 'Terracotta App', category: 'UI/UX Design', accent_color: '#c96b57', order_index: 3, is_active: true },
  { id: '5', title: 'Muted Olive UI', category: 'Visual Systems', accent_color: '#8c9b6b', order_index: 4, is_active: true },
  { id: '6', title: 'Peach Layout', category: 'Editorial Layout', accent_color: '#e29578', order_index: 5, is_active: true },
];

const DEFAULT_HOME_SETTINGS: HomeSettings = {
  id: 'default',
  hero_headline_top: 'THINK',
  hero_headline_bottom: 'CREATIVELY',
  hero_tagline: 'I help brands turn\nideas into structured,\nmeaningful experiences',
  hero_avatar_url: '/image/tafim-cartoon-head.webp',
  hero_cta_text: 'Book a call with me',
  client_count: portfolioJson.profile.clientCount || '99+ Happy clients',
  bio_title: portfolioJson.profile.bioTitle || 'Product Label & Packaging Designer | Visualizer',
  about_photo_url: portfolioJson.profile.aboutPhoto || '/Brand Identity & Packaging Designer Portfolio _ UI_UX Designer_files/pYrkmWKg9iMIMEQDan7ESNhHlA.webp',
  carousel_images: [
    '/image/projects/hoodverse.webp',
    '/image/projects/tea-sense.webp',
    '/image/projects/fruit-blends.webp',
    '/image/projects/ruthless.webp',
    '/image/tafim-cartoon-head.webp',
  ],
};

const DEFAULT_MAIN_PROJECTS: MainProject[] = (portfolioJson.projects as any[]).map((p, idx) => ({
  id: p.id || String(idx),
  title: p.title,
  category: p.category,
  tags: p.tags || [],
  image: p.image,
  link: p.link || '#',
  order_index: idx,
}));

const DEFAULT_SERVICES: ServiceItem[] = (portfolioJson.services as any[]).map((s, idx) => ({
  id: s.id || String(idx),
  title: s.title,
  description: s.description,
  tags: s.tags || [],
}));

const DEFAULT_TESTIMONIALS: TestimonialItem[] = (portfolioJson.testimonials as any[]).map((t, idx) => ({
  id: t.id || String(idx),
  name: t.name,
  role: t.role,
  quote: t.quote,
  avatar: t.avatar,
}));

const DEFAULT_FAQS: FaqItem[] = (portfolioJson.faqs as any[]).map((f) => ({
  number: f.number,
  question: f.question,
  answer: f.answer,
}));

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  // Work Page states
  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cms_cached_settings');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [projects, setProjects] = useState<CMSProject[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cms_cached_projects');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return DEFAULT_PROJECTS;
  });

  // Main Page states
  const [homeSettings, setHomeSettings] = useState<HomeSettings>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cms_cached_home_settings');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return DEFAULT_HOME_SETTINGS;
  });

  const [mainProjects, setMainProjects] = useState<MainProject[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cms_cached_main_projects');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return DEFAULT_MAIN_PROJECTS;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cms_cached_services');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return DEFAULT_SERVICES;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cms_cached_testimonials');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return DEFAULT_TESTIMONIALS;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cms_cached_faqs');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return DEFAULT_FAQS;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    isSupabaseConfigured ? 'connecting' : 'demo_mode'
  );
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync cache with local storage
  const saveLocalCache = useCallback(
    (
      newSettings: SiteSettings,
      newProjects: CMSProject[],
      newHomeSettings?: HomeSettings,
      newMainProjects?: MainProject[],
      newServices?: ServiceItem[],
      newTestimonials?: TestimonialItem[],
      newFaqs?: FaqItem[]
    ) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cms_cached_settings', JSON.stringify(newSettings));
        localStorage.setItem('cms_cached_projects', JSON.stringify(newProjects));
        if (newHomeSettings) localStorage.setItem('cms_cached_home_settings', JSON.stringify(newHomeSettings));
        if (newMainProjects) localStorage.setItem('cms_cached_main_projects', JSON.stringify(newMainProjects));
        if (newServices) localStorage.setItem('cms_cached_services', JSON.stringify(newServices));
        if (newTestimonials) localStorage.setItem('cms_cached_testimonials', JSON.stringify(newTestimonials));
        if (newFaqs) localStorage.setItem('cms_cached_faqs', JSON.stringify(newFaqs));
      }
    },
    []
  );

  // Fetch initial data from Supabase
  const fetchData = useCallback(async () => {
    if (!supabase || !isSupabaseConfigured) {
      setConnectionStatus('demo_mode');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setConnectionStatus('connecting');

      // 1. Fetch Work site settings
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (settingsData) setSettings(settingsData);

      // 2. Fetch 3D projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (projectsData && projectsData.length > 0) setProjects(projectsData);

      // 3. Fetch Home settings
      const { data: homeData } = await supabase
        .from('home_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (homeData) setHomeSettings(homeData);

      // 4. Fetch Home projects
      const { data: mainProjectsData } = await supabase
        .from('home_projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (mainProjectsData && mainProjectsData.length > 0) setMainProjects(mainProjectsData);

      // 5. Fetch Services
      const { data: servicesData } = await supabase.from('home_services').select('*');
      if (servicesData && servicesData.length > 0) setServices(servicesData);

      // 6. Fetch Testimonials
      const { data: testData } = await supabase.from('home_testimonials').select('*');
      if (testData && testData.length > 0) setTestimonials(testData);

      // 7. Fetch FAQs
      const { data: faqsData } = await supabase.from('home_faqs').select('*');
      if (faqsData && faqsData.length > 0) setFaqs(faqsData);

      saveLocalCache(
        settingsData || settings,
        projectsData || projects,
        homeData || homeSettings,
        mainProjectsData || mainProjects,
        servicesData || services,
        testData || testimonials,
        faqsData || faqs
      );

      setConnectionStatus('connected');
      setLastSynced(new Date());
      setErrorMessage(null);
    } catch (err: any) {
      console.warn('CMS fetch warning (continuing with cached data):', err);
      setConnectionStatus(isSupabaseConfigured ? 'connected' : 'demo_mode');
    } finally {
      setIsLoading(false);
    }
  }, [saveLocalCache, settings, projects, homeSettings, mainProjects, services, testimonials, faqs]);

  // Subscribe to real-time changes
  useEffect(() => {
    fetchData();

    if (!supabase || !isSupabaseConfigured) return;

    const channel = supabase
      .channel('public:realtime_portfolio_all')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_settings' },
        (payload) => {
          if (payload.new && (payload.new as SiteSettings).id === 'default') {
            const updated = payload.new as SiteSettings;
            setSettings(updated);
            setLastSynced(new Date());
            saveLocalCache(updated, projects, homeSettings, mainProjects, services, testimonials, faqs);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'home_settings' },
        (payload) => {
          if (payload.new && (payload.new as HomeSettings).id === 'default') {
            const updated = payload.new as HomeSettings;
            setHomeSettings(updated);
            setLastSynced(new Date());
            saveLocalCache(settings, projects, updated, mainProjects, services, testimonials, faqs);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'home_projects' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMainProjects((prev) => [...prev, payload.new as MainProject]);
          } else if (payload.eventType === 'UPDATE') {
            setMainProjects((prev) => prev.map((p) => (p.id === payload.new.id ? (payload.new as MainProject) : p)));
          } else if (payload.eventType === 'DELETE') {
            setMainProjects((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
          setLastSynced(new Date());
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setConnectionStatus('connected');
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setConnectionStatus('error');
        }
      });

    return () => {
      supabase?.removeChannel(channel);
    };
  }, []);

  // --- WORK PAGE MUTATIONS ---

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings, updated_at: new Date().toISOString() };
    setSettings(updated);
    saveLocalCache(updated, projects, homeSettings, mainProjects, services, testimonials, faqs);

    if (!supabase || !isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('site_settings').upsert(updated, { onConflict: 'id' });
      if (error) throw error;
      setLastSynced(new Date());
      return { success: true };
    } catch (err: any) {
      console.error('Failed to update settings:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  };

  const createProject = async (projectData: Omit<CMSProject, 'id' | 'order_index'>) => {
    const newProject: CMSProject = {
      ...projectData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      order_index: projects.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [...projects, newProject];
    setProjects(updated);
    saveLocalCache(settings, updated, homeSettings, mainProjects, services, testimonials, faqs);

    if (!supabase || !isSupabaseConfigured) return { success: true, data: newProject };

    try {
      const { error } = await supabase.from('projects').insert(newProject);
      if (error) throw error;
      setLastSynced(new Date());
      return { success: true, data: newProject };
    } catch (err: any) {
      console.error('Failed to create project:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  };

  const updateProject = async (id: string, updates: Partial<CMSProject>) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p));
    setProjects(updated);
    saveLocalCache(settings, updated, homeSettings, mainProjects, services, testimonials, faqs);

    if (!supabase || !isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('projects').update(updates).eq('id', id);
      if (error) throw error;
      setLastSynced(new Date());
      return { success: true };
    } catch (err: any) {
      console.error('Failed to update project:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveLocalCache(settings, updated, homeSettings, mainProjects, services, testimonials, faqs);

    if (!supabase || !isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setLastSynced(new Date());
      return { success: true };
    } catch (err: any) {
      console.error('Failed to delete project:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  };

  const reorderProjects = async (orderedProjects: CMSProject[]) => {
    const updatedWithIndices = orderedProjects.map((p, idx) => ({ ...p, order_index: idx }));
    setProjects(updatedWithIndices);
    saveLocalCache(settings, updatedWithIndices, homeSettings, mainProjects, services, testimonials, faqs);

    if (!supabase || !isSupabaseConfigured) return { success: true };

    try {
      const updates = updatedWithIndices.map((p) =>
        supabase!.from('projects').update({ order_index: p.order_index }).eq('id', p.id)
      );
      await Promise.all(updates);
      setLastSynced(new Date());
      return { success: true };
    } catch (err: any) {
      console.error('Failed to reorder projects:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  };

  // --- MAIN PAGE MUTATIONS ---

  const updateHomeSettings = async (updates: Partial<HomeSettings>) => {
    const updated: HomeSettings = {
      ...homeSettings,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    setHomeSettings(updated);
    saveLocalCache(settings, projects, updated, mainProjects, services, testimonials, faqs);

    if (!supabase || !isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('home_settings').upsert(updated, { onConflict: 'id' });
      if (error) throw error;
      setLastSynced(new Date());
      return { success: true };
    } catch (err: any) {
      console.error('Failed to update home settings:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  };

  const createMainProject = async (projectData: Omit<MainProject, 'id'>) => {
    const newProject: MainProject = {
      ...projectData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      order_index: mainProjects.length,
    };
    const updated = [...mainProjects, newProject];
    setMainProjects(updated);
    saveLocalCache(settings, projects, homeSettings, updated, services, testimonials, faqs);

    if (!supabase || !isSupabaseConfigured) return { success: true, data: newProject };

    try {
      const { error } = await supabase.from('home_projects').insert(newProject);
      if (error) throw error;
      setLastSynced(new Date());
      return { success: true, data: newProject };
    } catch (err: any) {
      console.error('Failed to insert main project:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  };

  const updateMainProject = async (id: string, updates: Partial<MainProject>) => {
    const updated = mainProjects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setMainProjects(updated);
    saveLocalCache(settings, projects, homeSettings, updated, services, testimonials, faqs);

    if (!supabase || !isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('home_projects').update(updates).eq('id', id);
      if (error) throw error;
      setLastSynced(new Date());
      return { success: true };
    } catch (err: any) {
      console.error('Failed to update main project:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  };

  const deleteMainProject = async (id: string) => {
    const updated = mainProjects.filter((p) => p.id !== id);
    setMainProjects(updated);
    saveLocalCache(settings, projects, homeSettings, updated, services, testimonials, faqs);

    if (!supabase || !isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('home_projects').delete().eq('id', id);
      if (error) throw error;
      setLastSynced(new Date());
      return { success: true };
    } catch (err: any) {
      console.error('Failed to delete main project:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  };

  const createService = async (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    };
    const updated = [...services, newService];
    setServices(updated);
    saveLocalCache(settings, projects, homeSettings, mainProjects, updated, testimonials, faqs);
    return { success: true, data: newService };
  };

  const updateService = async (id: string, updates: Partial<ServiceItem>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setServices(updated);
    saveLocalCache(settings, projects, homeSettings, mainProjects, updated, testimonials, faqs);
    return { success: true };
  };

  const deleteService = async (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    saveLocalCache(settings, projects, homeSettings, mainProjects, updated, testimonials, faqs);
    return { success: true };
  };

  const createTestimonial = async (itemData: Omit<TestimonialItem, 'id'>) => {
    const newItem: TestimonialItem = {
      ...itemData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    };
    const updated = [...testimonials, newItem];
    setTestimonials(updated);
    saveLocalCache(settings, projects, homeSettings, mainProjects, services, updated, faqs);
    return { success: true, data: newItem };
  };

  const updateTestimonial = async (id: string, updates: Partial<TestimonialItem>) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setTestimonials(updated);
    saveLocalCache(settings, projects, homeSettings, mainProjects, services, updated, faqs);
    return { success: true };
  };

  const deleteTestimonial = async (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    saveLocalCache(settings, projects, homeSettings, mainProjects, services, updated, faqs);
    return { success: true };
  };

  const createFaq = async (item: FaqItem) => {
    const updated = [...faqs, item];
    setFaqs(updated);
    saveLocalCache(settings, projects, homeSettings, mainProjects, services, testimonials, updated);
    return { success: true, data: item };
  };

  const updateFaq = async (number: string, updates: Partial<FaqItem>) => {
    const updated = faqs.map((f) => (f.number === number ? { ...f, ...updates } : f));
    setFaqs(updated);
    saveLocalCache(settings, projects, homeSettings, mainProjects, services, testimonials, updated);
    return { success: true };
  };

  const deleteFaq = async (number: string) => {
    const updated = faqs.filter((f) => f.number !== number);
    setFaqs(updated);
    saveLocalCache(settings, projects, homeSettings, mainProjects, services, testimonials, updated);
    return { success: true };
  };

  const uploadAsset = async (file: File, folder = 'uploads') => {
    if (!isSupabaseConfigured) {
      return new Promise<{ success: boolean; publicUrl?: string; error?: string }>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ success: true, publicUrl: reader.result as string });
        };
        reader.onerror = () => {
          resolve({ success: false, error: 'Failed to read file locally' });
        };
        reader.readAsDataURL(file);
      });
    }

    const { url, error } = await uploadPortfolioAsset(file, folder);
    if (error || !url) {
      return { success: false, error: error || 'Failed to upload' };
    }
    return { success: true, publicUrl: url };
  };

  return (
    <PortfolioContext.Provider
      value={{
        settings,
        projects,
        homeSettings,
        mainProjects,
        services,
        testimonials,
        faqs,
        isLoading,
        connectionStatus,
        lastSynced,
        errorMessage,
        updateSettings,
        createProject,
        updateProject,
        deleteProject,
        reorderProjects,
        updateHomeSettings,
        createMainProject,
        updateMainProject,
        deleteMainProject,
        createService,
        updateService,
        deleteService,
        createTestimonial,
        updateTestimonial,
        deleteTestimonial,
        createFaq,
        updateFaq,
        deleteFaq,
        uploadAsset,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContent(): PortfolioContextType {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioContent must be used within a PortfolioProvider');
  }
  return context;
}
