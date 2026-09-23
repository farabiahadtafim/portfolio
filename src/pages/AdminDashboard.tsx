import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCropperModal from '../components/ImageCropperModal';
import { 
  Lock, 
  ShieldCheck, 
  LogOut, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Upload, 
  RefreshCw, 
  ExternalLink,
  Copy,
  Sliders,
  Radio,
  Image as ImageIcon,
  Home,
  Briefcase,
  MessageSquare,
  HelpCircle,
  Edit3,
  X,
  Save
} from 'lucide-react';
import { usePortfolioContent } from '../context/PortfolioContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { CMSProject, MainProject, ServiceItem, TestimonialItem, FaqItem } from '../types/cms';
import { getAssetUrl } from '../utils/asset';

const PRESET_COLORS = [
  { name: 'Lavender', value: '#b8a6c9' },
  { name: 'Sand Gold', value: '#d7a56d' },
  { name: 'Slate Teal', value: '#5d8d9a' },
  { name: 'Terracotta', value: '#c96b57' },
  { name: 'Muted Olive', value: '#8c9b6b' },
  { name: 'Peach', value: '#e29578' },
  { name: 'Cinematic Red', value: '#ff0000' },
  { name: 'Deep Crimson', value: '#ea0044' },
];

export default function AdminDashboard() {
  const {
    settings,
    projects,
    homeSettings,
    mainProjects,
    services,
    testimonials,
    faqs,
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
  } = usePortfolioContent();

  // Auth state
  const [session, setSession] = useState<any>(null);
  const [isDemoBypass, setIsDemoBypass] = useState(!isSupabaseConfigured);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Tab
  type TabType = 'home-hero' | 'home-projects' | 'home-services' | 'home-faqs' | 'work-hero' | 'work-showcase' | 'status';
  const [activeTab, setActiveTab] = useState<TabType>('home-hero');

  // Work Hero form state
  const [heroTitle, setHeroTitle] = useState(settings.hero_title);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.hero_subtitle);
  const [heroImage, setHeroImage] = useState(settings.main_image_url);
  const [isSavingHero, setIsSavingHero] = useState(false);
  const [heroUploadLoading, setHeroUploadLoading] = useState(false);

  // Home Hero form state
  const [homeHeadlineTop, setHomeHeadlineTop] = useState(homeSettings.hero_headline_top || 'THINK');
  const [homeHeadlineBottom, setHomeHeadlineBottom] = useState(homeSettings.hero_headline_bottom || 'CREATIVELY');
  const [homeTagline, setHomeTagline] = useState(homeSettings.hero_tagline || '');
  const [homeAvatarUrl, setHomeAvatarUrl] = useState(homeSettings.hero_avatar_url || '');
  const [homeCtaText, setHomeCtaText] = useState(homeSettings.hero_cta_text || 'Book a call with me');
  const [homeClientCount, setHomeClientCount] = useState(homeSettings.client_count || '99+ Happy clients');
  const [homeBioTitle, setHomeBioTitle] = useState(homeSettings.bio_title || '');
  const [isSavingHomeHero, setIsSavingHomeHero] = useState(false);
  const [homeAvatarUploadLoading, setHomeAvatarUploadLoading] = useState(false);

  // Sync inputs with context
  useEffect(() => {
    setHeroTitle(settings.hero_title);
    setHeroSubtitle(settings.hero_subtitle);
    setHeroImage(settings.main_image_url);
  }, [settings]);

  useEffect(() => {
    setHomeHeadlineTop(homeSettings.hero_headline_top || 'THINK');
    setHomeHeadlineBottom(homeSettings.hero_headline_bottom || 'CREATIVELY');
    setHomeTagline(homeSettings.hero_tagline || '');
    setHomeAvatarUrl(homeSettings.hero_avatar_url || '');
    setHomeCtaText(homeSettings.hero_cta_text || 'Book a call with me');
    setHomeClientCount(homeSettings.client_count || '99+ Happy clients');
    setHomeBioTitle(homeSettings.bio_title || '');
  }, [homeSettings]);

  // Home Carousel images state
  const [carouselImages, setCarouselImages] = useState<string[]>(homeSettings.carousel_images || []);
  const [carouselUploadLoading, setCarouselUploadLoading] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [cropReplaceIndex, setCropReplaceIndex] = useState<number | null>(null);

  useEffect(() => {
    if (homeSettings.carousel_images && homeSettings.carousel_images.length > 0) {
      setCarouselImages(homeSettings.carousel_images);
    }
  }, [homeSettings.carousel_images]);

  // Work Showcase images state
  const [showcaseImages, setShowcaseImages] = useState<string[]>(settings.showcase_images || []);
  const [showcaseUploadLoading, setShowcaseUploadLoading] = useState(false);
  const [isShowcaseCropperOpen, setIsShowcaseCropperOpen] = useState(false);
  const [showcaseCropImageSrc, setShowcaseCropImageSrc] = useState<string | null>(null);
  const [showcaseCropReplaceIndex, setShowcaseCropReplaceIndex] = useState<number | null>(null);

  useEffect(() => {
    if (settings.showcase_images && settings.showcase_images.length > 0) {
      setShowcaseImages(settings.showcase_images);
    }
  }, [settings.showcase_images]);

  // Main Project Add / Edit Modal state
  const [isAddMainProjectOpen, setIsAddMainProjectOpen] = useState(false);
  const [editingMainProject, setEditingMainProject] = useState<MainProject | null>(null);
  const [mainProjTitle, setMainProjTitle] = useState('');
  const [mainProjCategory, setMainProjCategory] = useState('');
  const [mainProjTags, setMainProjTags] = useState('');
  const [mainProjImage, setMainProjImage] = useState('');
  const [mainProjLink, setMainProjLink] = useState('#');
  const [isSavingMainProj, setIsSavingMainProj] = useState(false);
  const [mainProjUploadLoading, setMainProjUploadLoading] = useState(false);

  // Showcase form modal state (Work page)
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardCategory, setNewCardCategory] = useState('Packaging Design');
  const [newCardColor, setNewCardColor] = useState('#b8a6c9');
  const [newCardImage, setNewCardImage] = useState<string | null>(null);
  const [isCreatingCard, setIsCreatingCard] = useState(false);

  // Service Modal state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceTags, setServiceTags] = useState('');

  // Testimonial Modal state
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testQuote, setTestQuote] = useState('');
  const [testAvatar, setTestAvatar] = useState('');

  // FAQ Modal state
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [faqNumber, setFaqNumber] = useState('');
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth check
  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setAuthLoading(false);
      setIsDemoBypass(true);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!supabase || !isSupabaseConfigured) {
      setIsDemoBypass(true);
      showToast('Entered Demo Mode (Offline)');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      });

      if (error) {
        setAuthError(error.message);
      } else if (data.session) {
        setSession(data.session);
        showToast('Successfully authenticated!');
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setIsDemoBypass(false);
    showToast('Signed out of admin dashboard');
  };

  const isAuthenticated = Boolean(session || isDemoBypass);

  // --- WORK HERO SAVE ---
  const handleSaveWorkHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHero(true);
    const result = await updateSettings({
      hero_title: heroTitle,
      hero_subtitle: heroSubtitle,
      main_image_url: heroImage,
    });
    setIsSavingHero(false);
    if (result.success) {
      showToast('Work Hero section updated live!');
    } else {
      showToast(`Error: ${result.error}`);
    }
  };

  // --- HOME HERO SAVE ---
  const handleSaveHomeHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHomeHero(true);
    const result = await updateHomeSettings({
      hero_headline_top: homeHeadlineTop,
      hero_headline_bottom: homeHeadlineBottom,
      hero_tagline: homeTagline,
      hero_avatar_url: homeAvatarUrl,
      hero_cta_text: homeCtaText,
      client_count: homeClientCount,
      bio_title: homeBioTitle,
    });
    setIsSavingHomeHero(false);
    if (result.success) {
      showToast('Main Page Hero updated live!');
    } else {
      showToast(`Error: ${result.error}`);
    }
  };

  // --- FILE UPLOAD HELPERS ---
  const handleWorkHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroUploadLoading(true);
    const res = await uploadAsset(file, 'hero-assets');
    setHeroUploadLoading(false);
    if (res.success && res.publicUrl) {
      setHeroImage(res.publicUrl);
      showToast('Work image uploaded!');
    } else {
      showToast(res.error || 'Upload failed');
    }
  };

  const handleHomeAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHomeAvatarUploadLoading(true);
    const res = await uploadAsset(file, 'avatar-assets');
    setHomeAvatarUploadLoading(false);
    if (res.success && res.publicUrl) {
      setHomeAvatarUrl(res.publicUrl);
      showToast('Avatar image uploaded!');
    } else {
      showToast(res.error || 'Upload failed');
    }
  };

  const handleMainProjImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainProjUploadLoading(true);
    const res = await uploadAsset(file, 'project-assets');
    setMainProjUploadLoading(false);
    if (res.success && res.publicUrl) {
      setMainProjImage(res.publicUrl);
      showToast('Project image uploaded!');
    } else {
      showToast(res.error || 'Upload failed');
    }
  };

  // --- HOME CAROUSEL (MARQUEE) HANDLERS ---
  const handleSaveCarouselImages = async (newImages?: string[]) => {
    const imagesToSave = newImages || carouselImages;
    const res = await updateHomeSettings({ carousel_images: imagesToSave });
    if (res.success) {
      showToast('Home page carousel images updated live!');
    } else {
      showToast(res.error || 'Failed to update carousel images');
    }
  };

  const handleAddCarouselImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setCropImageSrc(reader.result?.toString() || null);
      setCropReplaceIndex(null); // null means adding a new one
      setIsCropperOpen(true);
    });
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input so same file can be selected again
  };

  const handleReplaceCarouselImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setCropImageSrc(reader.result?.toString() || null);
      setCropReplaceIndex(index);
      setIsCropperOpen(true);
    });
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const handleCropComplete = async (croppedFile: File) => {
    setIsCropperOpen(false);
    setCropImageSrc(null);
    setCarouselUploadLoading(true);
    
    // If replacing, grab the old URL so the backend can delete it
    const oldUrl = cropReplaceIndex !== null ? carouselImages[cropReplaceIndex] : undefined;
    const res = await uploadAsset(croppedFile, 'carousel-assets', oldUrl);
    setCarouselUploadLoading(false);
    
    if (res.success && res.publicUrl) {
      if (cropReplaceIndex !== null) {
        // Replacing
        const updated = [...carouselImages];
        updated[cropReplaceIndex] = res.publicUrl;
        setCarouselImages(updated);
        await handleSaveCarouselImages(updated);
        showToast('Carousel image replaced and saved!');
      } else {
        // Adding
        const updated = [...carouselImages, res.publicUrl];
        setCarouselImages(updated);
        await handleSaveCarouselImages(updated);
        showToast('Carousel image uploaded and saved!');
      }
    } else {
      showToast(res.error || 'Upload failed');
    }
  };

  const handleRemoveCarouselImage = async (index: number) => {
    const updated = carouselImages.filter((_, i) => i !== index);
    setCarouselImages(updated);
    await handleSaveCarouselImages(updated);
    showToast('Carousel image removed!');
  };

  // --- WORK SHOWCASE CAROUSEL HANDLERS ---
  const handleSaveShowcaseImages = async (newImages?: string[]) => {
    const imagesToSave = newImages || showcaseImages;
    const res = await updateSettings({ showcase_images: imagesToSave });
    if (res.success) {
      showToast('Work page showcase images updated live!');
    } else {
      showToast(res.error || 'Failed to update showcase images');
    }
  };

  const handleAddShowcaseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setShowcaseCropImageSrc(reader.result?.toString() || null);
      setShowcaseCropReplaceIndex(null); 
      setIsShowcaseCropperOpen(true);
    });
    reader.readAsDataURL(file);
    e.target.value = ''; 
  };

  const handleReplaceShowcaseImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setShowcaseCropImageSrc(reader.result?.toString() || null);
      setShowcaseCropReplaceIndex(index);
      setIsShowcaseCropperOpen(true);
    });
    reader.readAsDataURL(file);
    e.target.value = ''; 
  };

  const handleShowcaseCropComplete = async (croppedFile: File) => {
    setIsShowcaseCropperOpen(false);
    setShowcaseCropImageSrc(null);
    setShowcaseUploadLoading(true);
    
    const oldUrl = showcaseCropReplaceIndex !== null ? showcaseImages[showcaseCropReplaceIndex] : undefined;
    const res = await uploadAsset(croppedFile, 'showcase-assets', oldUrl);
    setShowcaseUploadLoading(false);
    
    if (res.success && res.publicUrl) {
      if (showcaseCropReplaceIndex !== null) {
        const updated = [...showcaseImages];
        updated[showcaseCropReplaceIndex] = res.publicUrl;
        setShowcaseImages(updated);
        await handleSaveShowcaseImages(updated);
        showToast('Showcase image replaced and saved!');
      } else {
        const updated = [...showcaseImages, res.publicUrl];
        setShowcaseImages(updated);
        await handleSaveShowcaseImages(updated);
        showToast('Showcase image uploaded and saved!');
      }
    } else {
      showToast(res.error || 'Upload failed');
    }
  };

  const handleRemoveShowcaseImage = async (index: number) => {
    const updated = showcaseImages.filter((_, i) => i !== index);
    setShowcaseImages(updated);
    await handleSaveShowcaseImages(updated);
    showToast('Showcase image removed!');
  };

  // --- MAIN PROJECT MODAL HANDLERS ---
  const openAddMainProjectModal = () => {
    setEditingMainProject(null);
    setMainProjTitle('');
    setMainProjCategory('');
    setMainProjTags('');
    setMainProjImage('/image/projects/tea-sense.webp');
    setMainProjLink('#');
    setIsAddMainProjectOpen(true);
  };

  const openEditMainProjectModal = (proj: MainProject) => {
    setEditingMainProject(proj);
    setMainProjTitle(proj.title);
    setMainProjCategory(proj.category);
    setMainProjTags(proj.tags ? proj.tags.join(', ') : '');
    setMainProjImage(proj.image);
    setMainProjLink(proj.link || '#');
    setIsAddMainProjectOpen(true);
  };

  const handleSaveMainProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingMainProj(true);
    const tagsArray = mainProjTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingMainProject) {
      const res = await updateMainProject(editingMainProject.id, {
        title: mainProjTitle,
        category: mainProjCategory,
        tags: tagsArray,
        image: mainProjImage,
        link: mainProjLink,
      });
      setIsSavingMainProj(false);
      if (res.success) {
        setIsAddMainProjectOpen(false);
        showToast('Project updated successfully!');
      } else {
        showToast(res.error || 'Failed to update project');
      }
    } else {
      const res = await createMainProject({
        title: mainProjTitle,
        category: mainProjCategory,
        tags: tagsArray,
        image: mainProjImage,
        link: mainProjLink,
      });
      setIsSavingMainProj(false);
      if (res.success) {
        setIsAddMainProjectOpen(false);
        showToast('New project created!');
      } else {
        showToast(res.error || 'Failed to create project');
      }
    }
  };

  // --- SHOWCASE (WORK PAGE) CARD HANDLERS ---
  const handleCreateShowcaseCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardTitle.trim()) return;
    setIsCreatingCard(true);
    const res = await createProject({
      title: newCardTitle,
      category: newCardCategory,
      accent_color: newCardColor,
      image_url: newCardImage,
      is_active: true,
    });
    setIsCreatingCard(false);
    if (res.success) {
      setIsAddCardOpen(false);
      setNewCardTitle('');
      showToast(`Added "${newCardTitle}" to 3D Showcase!`);
    } else {
      showToast(`Error: ${res.error}`);
    }
  };

  // --- SERVICE SAVE HANDLER ---
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = serviceTags.split(',').map((t) => t.trim()).filter(Boolean);
    if (editingService) {
      await updateService(editingService.id, {
        title: serviceTitle,
        description: serviceDesc,
        tags: tagsArray,
      });
      showToast('Service updated!');
    } else {
      await createService({
        title: serviceTitle,
        description: serviceDesc,
        tags: tagsArray,
      });
      showToast('New service added!');
    }
    setIsServiceModalOpen(false);
  };

  // --- TESTIMONIAL SAVE HANDLER ---
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      await updateTestimonial(editingTestimonial.id, {
        name: testName,
        role: testRole,
        quote: testQuote,
        avatar: testAvatar,
      });
      showToast('Testimonial updated!');
    } else {
      await createTestimonial({
        name: testName,
        role: testRole,
        quote: testQuote,
        avatar: testAvatar,
      });
      showToast('New testimonial added!');
    }
    setIsTestimonialModalOpen(false);
  };

  // --- FAQ SAVE HANDLER ---
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      await updateFaq(editingFaq.number, {
        question: faqQuestion,
        answer: faqAnswer,
      });
      showToast('FAQ updated!');
    } else {
      const num = faqNumber.trim() || `0${faqs.length + 1}`;
      await createFaq({
        number: num,
        question: faqQuestion,
        answer: faqAnswer,
      });
      showToast('New FAQ created!');
    }
    setIsFaqModalOpen(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#141316] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-[#ea0044]" />
          <span>Verifying credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#141316] flex items-center justify-center px-4">
        {/* Glow backdrop */}
        <div className="absolute w-[500px] h-[500px] bg-[#ea0044]/15 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md p-8 rounded-3xl bg-[#1a191e]/90 border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#ea0044]/10 border border-[#ea0044]/30 flex items-center justify-center mb-4 text-[#ea0044]">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-space font-bold text-white tracking-tight">Portfolio Admin CMS</h1>
            <p className="text-sm text-neutral-400 mt-1">Live headless management portal</p>
          </div>

          {authError && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@farabitafim.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044] focus:ring-1 focus:ring-[#ea0044] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044] focus:ring-1 focus:ring-[#ea0044] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white font-medium text-sm transition-all shadow-lg shadow-[#ea0044]/25 hover:shadow-[#ea0044]/40 cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={() => setIsDemoBypass(true)}
              className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
            >
              Explore in Demo Mode (Offline / Local CMS)
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-[#141316] text-[#F3F4F6] pb-24">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 px-5 py-3 rounded-full bg-[#ea0044] text-white text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2 border border-white/25"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#141316]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ea0044] flex items-center justify-center font-bold text-white shadow-lg shadow-[#ea0044]/30">
              FT
            </div>
            <div>
              <div className="text-sm font-space font-bold text-white flex items-center gap-2">
                Portfolio CMS Management Portal
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  connectionStatus === 'connected'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : connectionStatus === 'demo_mode'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : connectionStatus === 'demo_mode' ? 'bg-amber-400' : 'bg-red-400'
                  }`} />
                  {connectionStatus === 'connected' ? 'Live Real-time' : connectionStatus === 'demo_mode' ? 'Demo Mode' : 'Offline'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                {session?.user?.email || 'Admin Mode (Active)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <a
              href={getAssetUrl('/')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#ea0044]" />
              <span>Main Page (Home)</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
            <a
              href={getAssetUrl('/work.html')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#ea0044]" />
              <span>Work Page</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
          {/* Main Page Tabs */}
          <button
            onClick={() => setActiveTab('home-hero')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'home-hero'
                ? 'bg-[#ea0044] text-white shadow-lg shadow-[#ea0044]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Home Hero & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('home-projects')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'home-projects'
                ? 'bg-[#ea0044] text-white shadow-lg shadow-[#ea0044]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Home Projects ({mainProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('home-services')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'home-services'
                ? 'bg-[#ea0044] text-white shadow-lg shadow-[#ea0044]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Services & Reviews</span>
          </button>

          <button
            onClick={() => setActiveTab('home-faqs')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'home-faqs'
                ? 'bg-[#ea0044] text-white shadow-lg shadow-[#ea0044]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQs ({faqs.length})</span>
          </button>

          <div className="h-6 w-px bg-white/10 mx-1 shrink-0" />

          {/* Work Page Tabs */}
          <button
            onClick={() => setActiveTab('work-hero')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'work-hero'
                ? 'bg-[#ea0044] text-white shadow-lg shadow-[#ea0044]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Work Page Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('work-showcase')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'work-showcase'
                ? 'bg-[#ea0044] text-white shadow-lg shadow-[#ea0044]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Work 3D Showcase ({projects.length})</span>
          </button>

          <div className="h-6 w-px bg-white/10 mx-1 shrink-0" />

          {/* Status Tab */}
          <button
            onClick={() => setActiveTab('status')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'status'
                ? 'bg-[#ea0044] text-white shadow-lg shadow-[#ea0044]/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>System & SQL</span>
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: HOME HERO & BIO */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'home-hero' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#19181d] border border-white/10 shadow-xl">
                <div className="mb-6">
                  <h2 className="text-xl font-space font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#ea0044]" />
                    Main Page Hero Section Copy & Visuals
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Edit the large animated headline, 3D floating avatar, tagline, and call-to-action on the home page.
                  </p>
                </div>

                <form onSubmit={handleSaveHomeHero} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Headline Top (White)
                      </label>
                      <input
                        type="text"
                        value={homeHeadlineTop}
                        onChange={(e) => setHomeHeadlineTop(e.target.value)}
                        placeholder="THINK"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Headline Bottom (Red)
                      </label>
                      <input
                        type="text"
                        value={homeHeadlineBottom}
                        onChange={(e) => setHomeHeadlineBottom(e.target.value)}
                        placeholder="CREATIVELY"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Hero Tagline (Multi-line)
                    </label>
                    <textarea
                      rows={3}
                      value={homeTagline}
                      onChange={(e) => setHomeTagline(e.target.value)}
                      placeholder="I help brands turn ideas into structured, meaningful experiences"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={homeCtaText}
                        onChange={(e) => setHomeCtaText(e.target.value)}
                        placeholder="Book a call with me"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Client Proof Text
                      </label>
                      <input
                        type="text"
                        value={homeClientCount}
                        onChange={(e) => setHomeClientCount(e.target.value)}
                        placeholder="99+ Happy clients"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044]"
                      />
                    </div>
                  </div>

                  {/* Character Avatar Upload */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                      3D Character Avatar Image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={homeAvatarUrl}
                        onChange={(e) => setHomeAvatarUrl(e.target.value)}
                        placeholder="/image/tafim-cartoon-head.webp"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044]"
                      />
                      <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer border border-white/10 transition-colors shrink-0">
                        <Upload className="w-4 h-4" />
                        <span>{homeAvatarUploadLoading ? 'Uploading...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleHomeAvatarUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingHomeHero}
                    className="w-full py-3 px-4 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white font-medium text-sm transition-all shadow-lg shadow-[#ea0044]/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSavingHomeHero ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Save Home Hero Changes</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Home Hero Preview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-[#19181d] border border-white/10 shadow-xl">
                <h3 className="text-sm font-space font-bold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#ea0044]" />
                  Live Hero Composition Preview
                </h3>

                <div className="relative w-full h-[380px] rounded-2xl bg-[#141316] border border-white/10 overflow-hidden flex flex-col items-center justify-between p-6 select-none">
                  {/* Red Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-[#bb031c]/25 blur-[60px] rounded-full pointer-events-none" />

                  {/* Headline Stack */}
                  <div className="text-center z-10 pt-4">
                    <span className="block text-3xl font-space font-bold tracking-tight text-[#f7f7f7]">
                      {homeHeadlineTop || 'THINK'}
                    </span>
                    <span className="block text-2xl font-space font-bold tracking-tight text-[#bb031c]">
                      {homeHeadlineBottom || 'CREATIVELY'}
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className="relative z-20 w-32 h-32 flex items-center justify-center">
                    <img
                      src={getAssetUrl(homeAvatarUrl || '/image/tafim-cartoon-head.webp')}
                      alt="Avatar"
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Bottom bar preview */}
                  <div className="w-full z-10 flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                    <span className="text-neutral-400 truncate max-w-[150px]">
                      {homeTagline || 'I help brands turn ideas into...'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#bb031c] text-white font-medium text-[10px]">
                      {homeCtaText || 'Book a call'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: HOME PROJECTS & MARQUEE CAROUSEL */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'home-projects' && (
          <div className="space-y-8">
            {/* ---------------------------------------------------------------- */}
            {/* CAROUSEL IMAGES (HOME PAGE SLIDING MARQUEE) */}
            {/* ---------------------------------------------------------------- */}
            <div className="p-6 rounded-3xl bg-[#19181d] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-space font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#ea0044]" />
                    Home Page Marquee Carousel Images
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Upload and manage the sliding visual cards displayed at the top of the Projects Section on the Home Page.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white text-xs font-semibold shadow-lg shadow-[#ea0044]/30 cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    <span>{carouselUploadLoading ? 'Uploading...' : 'Upload Carousel Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAddCarouselImageUpload}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      handleSaveCarouselImages();
                      showToast('Carousel changes saved to main page!');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white border border-white/10 rounded-lg hover:bg-neutral-700 transition-colors text-sm font-medium"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              {/* Carousel grid items */}
              {carouselImages.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl">
                  <p className="text-sm text-neutral-400">No carousel images yet. Upload an image to replace the fallback blocks.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
                  {carouselImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden flex flex-col hover:border-white/20 transition-all"
                    >
                      <div className="relative aspect-[16/11] bg-neutral-950 overflow-hidden">
                        {imgUrl.startsWith('/') || imgUrl.startsWith('http') || imgUrl.startsWith('data:') || imgUrl.startsWith('blob:') ? (
                          <img
                            src={getAssetUrl(imgUrl)}
                            alt={`Carousel slot ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className={`w-full h-full ${imgUrl} flex items-center justify-center text-xs text-white/70 font-mono`}>
                            Color Block
                          </div>
                        )}

                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-white">
                          #{idx + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveCarouselImage(idx)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-500/80 text-white/80 hover:text-white transition-colors cursor-pointer"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-3 bg-[#19181d] flex flex-col gap-2">
                        <label className="w-full py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium flex items-center justify-center gap-1.5 cursor-pointer border border-white/10 transition-colors text-center">
                          <Upload className="w-3 h-3" />
                          <span>Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleReplaceCarouselImageUpload(idx, e)}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#19181d] border border-white/10">
              <div>
                <h2 className="text-xl font-space font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#ea0044]" />
                  Main Page Projects Grid
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Add, update, delete, or replace images for the project cards shown on the home page.
                </p>
              </div>

              <button
                onClick={openAddMainProjectModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white text-xs font-semibold shadow-lg shadow-[#ea0044]/30 cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="group rounded-2xl bg-[#19181d] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div className="relative aspect-[16/11] bg-neutral-900 overflow-hidden">
                    <img
                      src={getAssetUrl(proj.image)}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {(proj.tags || []).slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[11px] text-neutral-400 block truncate mb-1">
                        {proj.category}
                      </span>
                      <h4 className="text-base font-space font-bold text-white truncate">
                        {proj.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <button
                        onClick={() => openEditMainProjectModal(proj)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-200 text-xs font-medium cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => deleteMainProject(proj.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: SERVICES & TESTIMONIALS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'home-services' && (
          <div className="space-y-8">
            {/* Services Section */}
            <div className="p-6 rounded-3xl bg-[#19181d] border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-space font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#ea0044]" />
                    Services Offerings
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">Manage the services listed on the home page.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingService(null);
                    setServiceTitle('');
                    setServiceDesc('');
                    setServiceTags('');
                    setIsServiceModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                    <div>
                      <h4 className="font-space font-bold text-white text-sm">{s.title}</h4>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{s.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {s.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-neutral-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-4 pt-2 border-t border-white/5">
                      <button
                        onClick={() => {
                          setEditingService(s);
                          setServiceTitle(s.title);
                          setServiceDesc(s.description);
                          setServiceTags(s.tags.join(', '));
                          setIsServiceModalOpen(true);
                        }}
                        className="text-xs text-neutral-300 hover:text-white px-2 py-1 rounded bg-white/5"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteService(s.id)}
                        className="text-xs text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="p-6 rounded-3xl bg-[#19181d] border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-space font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#ea0044]" />
                    Client Testimonials
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">Manage quotes, client names, roles, and avatar images.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingTestimonial(null);
                    setTestName('');
                    setTestRole('');
                    setTestQuote('');
                    setTestAvatar('');
                    setIsTestimonialModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                    <p className="text-xs text-neutral-300 italic line-clamp-3 mb-3">"{t.quote}"</p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        {t.avatar && (
                          <img src={getAssetUrl(t.avatar)} alt={t.name} className="w-7 h-7 rounded-full object-cover" />
                        )}
                        <div>
                          <h5 className="text-xs font-bold text-white">{t.name}</h5>
                          <span className="text-[10px] text-neutral-400 block">{t.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingTestimonial(t);
                            setTestName(t.name);
                            setTestRole(t.role);
                            setTestQuote(t.quote);
                            setTestAvatar(t.avatar || '');
                            setIsTestimonialModalOpen(true);
                          }}
                          className="text-xs text-neutral-300 hover:text-white px-2 py-1 rounded bg-white/5"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTestimonial(t.id)}
                          className="text-xs text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: FAQS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'home-faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-3xl bg-[#19181d] border border-white/10">
              <div>
                <h2 className="text-xl font-space font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#ea0044]" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-neutral-400 mt-1">Manage FAQs on the main page.</p>
              </div>

              <button
                onClick={() => {
                  setEditingFaq(null);
                  setFaqNumber(`0${faqs.length + 1}`);
                  setFaqQuestion('');
                  setFaqAnswer('');
                  setIsFaqModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((f) => (
                <div key={f.number} className="p-4 rounded-xl bg-[#19181d] border border-white/10 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-[#ea0044] px-2 py-1 rounded bg-white/5">
                      {f.number}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{f.question}</h4>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{f.answer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditingFaq(f);
                        setFaqNumber(f.number);
                        setFaqQuestion(f.question);
                        setFaqAnswer(f.answer);
                        setIsFaqModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteFaq(f.number)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 5: WORK HERO SECTION MANAGER */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'work-hero' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#19181d] border border-white/10 shadow-xl">
                <div className="mb-6">
                  <h2 className="text-xl font-space font-bold text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#ea0044]" />
                    Work Page Hero Section Settings
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Control typography title, subtitle, and main background visual on `/work.html`.
                  </p>
                </div>

                <form onSubmit={handleSaveWorkHero} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Hero Typography Title
                    </label>
                    <input
                      type="text"
                      required
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      placeholder="PORTFOLIO"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044] focus:ring-1 focus:ring-[#ea0044] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Role & Subtitle
                    </label>
                    <input
                      type="text"
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      placeholder="Packaging & Brand Identity Designer"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044] focus:ring-1 focus:ring-[#ea0044] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Main Visual Image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={heroImage}
                        onChange={(e) => setHeroImage(e.target.value)}
                        placeholder="/image/Portfolio-Page-Main-Image.webp"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ea0044]"
                      />
                      <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer border border-white/10 transition-colors shrink-0">
                        <Upload className="w-4 h-4" />
                        <span>{heroUploadLoading ? 'Uploading...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleWorkHeroImageUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingHero}
                    className="w-full py-3 px-4 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white font-medium text-sm transition-all shadow-lg shadow-[#ea0044]/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSavingHero ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Save Work Hero Changes</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Work Hero Preview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-[#19181d] border border-white/10 shadow-xl">
                <h3 className="text-sm font-space font-bold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#ea0044]" />
                  Live Work Hero Preview
                </h3>

                <div className="relative w-full h-[360px] rounded-2xl bg-[#141316] border border-white/10 overflow-hidden flex flex-col items-center justify-end select-none">
                  {/* Red Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#ff0000]/30 blur-[70px] rounded-full pointer-events-none" />

                  {/* Typography SVG */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] text-center z-10 pointer-events-none">
                    <span className="font-space font-bold text-3xl tracking-wider text-white/20 uppercase">
                      {heroTitle || 'PORTFOLIO'}
                    </span>
                  </div>

                  {/* Subject Image */}
                  <div className="relative z-20 w-full flex items-end justify-center">
                    <img
                      src={getAssetUrl(heroImage || '/image/Portfolio-Page-Main-Image.webp')}
                      alt="Hero Subject"
                      className="w-full max-h-[260px] object-cover object-bottom pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 6: WORK 3D SHOWCASE */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'work-showcase' && (
          <div className="space-y-6">
            {/* ---------------------------------------------------------------- */}
            {/* CAROUSEL IMAGES (WORK PAGE 3D CAROUSEL) */}
            {/* ---------------------------------------------------------------- */}
            <div className="p-6 rounded-3xl bg-[#19181d] border border-white/10 space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-space font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#ea0044]" />
                    Work Page 3D Carousel Images
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Upload and manage the images displayed in the 3D rotating cylinder.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white text-xs font-semibold shadow-lg shadow-[#ea0044]/30 cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    <span>{showcaseUploadLoading ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAddShowcaseImageUpload}
                    />
                  </label>
                  <button
                    onClick={() => {
                      handleSaveShowcaseImages();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold shadow-lg cursor-pointer transition-all border border-white/10"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Order</span>
                  </button>
                </div>
              </div>

              {/* Showcase grid items */}
              {showcaseImages.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center">
                  <p className="text-sm text-neutral-400">No showcase images yet. Upload an image to start.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                  {showcaseImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#141316] border border-white/10 flex items-center justify-center"
                    >
                      <img
                        src={getAssetUrl(imgUrl)}
                        alt={`Showcase slot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <label className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors" title="Replace image">
                          <Upload className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleReplaceShowcaseImageUpload(idx, e)}
                          />
                        </label>
                        <button
                          onClick={() => handleRemoveShowcaseImage(idx)}
                          className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 cursor-pointer transition-colors"
                          title="Remove image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white/70">
                        #{idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#19181d] border border-white/10">
              <div>
                <h2 className="text-xl font-space font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#ea0044]" />
                  3D Curved Showcase Card Manager
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Control all 3D marquee cards, customize accent colors, and reorder on `/work.html`.
                </p>
              </div>

              <button
                onClick={() => setIsAddCardOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white text-xs font-semibold shadow-lg shadow-[#ea0044]/30 cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Showcase Card</span>
              </button>
            </div>

            {/* Showcase cards list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((card, index) => (
                <div
                  key={card.id}
                  className="p-5 rounded-2xl bg-[#19181d] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: card.accent_color }}
                        />
                        <span className="text-[11px] font-mono text-neutral-400">#{index + 1}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateProject(card.id, { is_active: !card.is_active })}
                          className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                            card.is_active
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : 'bg-neutral-800 border-neutral-700 text-neutral-500'
                          }`}
                          title={card.is_active ? 'Active' : 'Hidden'}
                        >
                          {card.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => deleteProject(card.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
                          title="Delete card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card Preview (Image or Accent Color) */}
                    <div
                      className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-white/10 flex items-center justify-center group"
                      style={{ backgroundColor: card.accent_color }}
                    >
                      {card.image_url ? (
                        <>
                          <img
                            src={getAssetUrl(card.image_url)}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
                          <div className="absolute inset-0 p-3 flex flex-col justify-end text-white pointer-events-none">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">{card.category}</span>
                            <h4 className="text-xs font-space font-bold uppercase truncate">{card.title}</h4>
                          </div>
                        </>
                      ) : (
                        <div className="p-3 text-center text-white">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/70 block">{card.category}</span>
                          <h4 className="text-xs font-space font-bold uppercase truncate">{card.title}</h4>
                          <span className="text-[9px] text-white/50 mt-1 block">(Solid Color)</span>
                        </div>
                      )}
                    </div>

                    <h4 className="text-base font-space font-bold text-white truncate">{card.title}</h4>
                    <span className="text-xs text-neutral-400 block mt-0.5">{card.category}</span>

                    {/* Image Upload & URL input */}
                    <div className="space-y-1.5 mt-3 pt-3 border-t border-white/5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-neutral-400 uppercase tracking-wider">Card Visual Image</span>
                        {card.image_url && (
                          <button
                            type="button"
                            onClick={() => {
                              updateProject(card.id, { image_url: null });
                              showToast(`Reset "${card.title}" to color card`);
                            }}
                            className="text-[10px] text-red-400 hover:text-red-300 cursor-pointer"
                          >
                            Remove Image
                          </button>
                        )}
                      </div>

                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={card.image_url || ''}
                          onChange={(e) => updateProject(card.id, { image_url: e.target.value || null })}
                          placeholder="Image URL or upload"
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#ea0044]"
                        />
                        <label className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1 cursor-pointer border border-white/10 transition-colors shrink-0">
                          <Upload className="w-3 h-3" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const res = await uploadAsset(file, 'showcase-assets');
                              if (res.success && res.publicUrl) {
                                await updateProject(card.id, { image_url: res.publicUrl });
                                showToast(`Image uploaded for "${card.title}"!`);
                              } else {
                                showToast(res.error || 'Upload failed');
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {PRESET_COLORS.slice(0, 5).map((color) => (
                        <button
                          key={color.value}
                          onClick={() => updateProject(card.id, { accent_color: color.value })}
                          className="w-4 h-4 rounded-full border border-white/20 transition-transform hover:scale-125"
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        disabled={index === 0}
                        onClick={() => {
                          const items = [...projects];
                          const temp = items[index];
                          items[index] = items[index - 1];
                          items[index - 1] = temp;
                          reorderProjects(items);
                        }}
                        className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={index === projects.length - 1}
                        onClick={() => {
                          const items = [...projects];
                          const temp = items[index];
                          items[index] = items[index + 1];
                          items[index + 1] = temp;
                          reorderProjects(items);
                        }}
                        className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 7: CONNECTION & SYSTEM STATUS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1a191e]/80 border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-space font-bold text-white mb-2">Real-Time Connection & Live Status</h2>
              <p className="text-xs text-neutral-400 mb-6">
                Monitor database subscriptions, real-time sync latency, and storage bucket health.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Status</span>
                  <div className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : connectionStatus === 'demo_mode' ? 'bg-amber-400' : 'bg-red-400'
                    }`} />
                    {connectionStatus === 'connected' ? 'Connected (Realtime Live)' : connectionStatus === 'demo_mode' ? 'Demo Mode (Offline Cache)' : 'Disconnected'}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Last Live Sync</span>
                  <div className="text-lg font-bold text-white mt-1">
                    {lastSynced ? lastSynced.toLocaleTimeString() : 'Never'}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Active Projects</span>
                  <div className="text-lg font-bold text-white mt-1">
                    {projects.filter(p => p.is_active).length} of {projects.length} Visible
                  </div>
                </div>
              </div>
            </div>

            {/* Quick SQL Setup Guide */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1a191e]/80 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-space font-bold text-white">Supabase Setup Instructions</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    To link a live cloud database, run <code className="text-[#ea0044]">supabase_schema.sql</code> in your Supabase SQL Editor and add keys to <code className="text-[#ea0044]">.env</code>:
                  </p>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key`);
                    showToast('Copied env template to clipboard!');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Env Template</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-neutral-300 overflow-x-auto space-y-1">
                <div className="text-emerald-400"># .env (Create in project root)</div>
                <div>VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co</div>
                <div>VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- ADD / EDIT MAIN PROJECT MODAL --- */}
      <AnimatePresence>
        {isAddMainProjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#1a191e] border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-space font-bold text-white">
                  {editingMainProject ? 'Edit Home Project' : 'Add New Home Project'}
                </h3>
                <button
                  onClick={() => setIsAddMainProjectOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMainProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={mainProjTitle}
                    onChange={(e) => setMainProjTitle(e.target.value)}
                    placeholder="Tea Sense - A Premium Tea"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ea0044]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={mainProjCategory}
                    onChange={(e) => setMainProjCategory(e.target.value)}
                    placeholder="Packaging Design, Brand Identity"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ea0044]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={mainProjTags}
                    onChange={(e) => setMainProjTags(e.target.value)}
                    placeholder="Packaging, Brand Identity, Print"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ea0044]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Project Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={mainProjImage}
                      onChange={(e) => setMainProjImage(e.target.value)}
                      placeholder="/image/projects/tea-sense.webp"
                      className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ea0044]"
                    />
                    <label className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{mainProjUploadLoading ? '...' : 'Upload'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleMainProjImageUpload} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Link URL</label>
                  <input
                    type="text"
                    value={mainProjLink}
                    onChange={(e) => setMainProjLink(e.target.value)}
                    placeholder="#"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ea0044]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddMainProjectOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingMainProj}
                    className="flex-1 py-2.5 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white text-xs font-semibold cursor-pointer"
                  >
                    {isSavingMainProj ? 'Saving...' : editingMainProject ? 'Save Changes' : 'Create Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD 3D SHOWCASE CARD MODAL (WORK PAGE) --- */}
      <AnimatePresence>
        {isAddCardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#1a191e] border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-space font-bold text-white">Add 3D Showcase Card</h3>
                <button
                  onClick={() => setIsAddCardOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateShowcaseCard} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Card Title</label>
                  <input
                    type="text"
                    required
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    placeholder="Nordic Concept"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ea0044]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={newCardCategory}
                    onChange={(e) => setNewCardCategory(e.target.value)}
                    placeholder="Brand Identity"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ea0044]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Accent Color</label>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: newCardColor }} />
                    <input
                      type="text"
                      value={newCardColor}
                      onChange={(e) => setNewCardColor(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setNewCardColor(c.value)}
                        className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Card Image (Optional)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCardImage || ''}
                      onChange={(e) => setNewCardImage(e.target.value || null)}
                      placeholder="Paste image URL or upload"
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ea0044]"
                    />
                    <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer border border-white/10 transition-colors shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const res = await uploadAsset(file, 'showcase-assets');
                          if (res.success && res.publicUrl) {
                            setNewCardImage(res.publicUrl);
                            showToast('Image uploaded for new card!');
                          } else {
                            showToast(res.error || 'Upload failed');
                          }
                        }}
                      />
                    </label>
                  </div>
                  {newCardImage && (
                    <div className="mt-2 relative w-full h-24 rounded-xl overflow-hidden border border-white/10">
                      <img src={getAssetUrl(newCardImage)} alt="Card preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewCardImage(null)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 hover:bg-red-500 text-white cursor-pointer"
                        title="Remove preview"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddCardOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingCard}
                    className="flex-1 py-2.5 rounded-xl bg-[#ea0044] hover:bg-[#d6003d] text-white text-xs font-semibold cursor-pointer"
                  >
                    {isCreatingCard ? 'Adding...' : 'Add Card'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SERVICE MODAL --- */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-[#1a191e] border border-white/10 shadow-2xl"
            >
              <h3 className="text-lg font-space font-bold text-white mb-4">
                {editingService ? 'Edit Service' : 'Add Service'}
              </h3>
              <form onSubmit={handleSaveService} className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={serviceTitle}
                    onChange={(e) => setServiceTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={serviceDesc}
                    onChange={(e) => setServiceDesc(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={serviceTags}
                    onChange={(e) => setServiceTags(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsServiceModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-white/5 text-xs text-neutral-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2 rounded-xl bg-[#ea0044] text-white text-xs font-semibold cursor-pointer">
                    Save Service
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- TESTIMONIAL MODAL --- */}
      <AnimatePresence>
        {isTestimonialModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-[#1a191e] border border-white/10 shadow-2xl"
            >
              <h3 className="text-lg font-space font-bold text-white mb-4">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <form onSubmit={handleSaveTestimonial} className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Role & Company</label>
                  <input
                    type="text"
                    required
                    value={testRole}
                    onChange={(e) => setTestRole(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Client Quote</label>
                  <textarea
                    rows={3}
                    required
                    value={testQuote}
                    onChange={(e) => setTestQuote(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Avatar Image URL</label>
                  <input
                    type="text"
                    value={testAvatar}
                    onChange={(e) => setTestAvatar(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsTestimonialModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-white/5 text-xs text-neutral-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2 rounded-xl bg-[#ea0044] text-white text-xs font-semibold cursor-pointer">
                    Save Testimonial
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FAQ MODAL --- */}
      <AnimatePresence>
        {isFaqModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-[#1a191e] border border-white/10 shadow-2xl"
            >
              <h3 className="text-lg font-space font-bold text-white mb-4">
                {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
              </h3>
              <form onSubmit={handleSaveFaq} className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Number (e.g. 01)</label>
                  <input
                    type="text"
                    required
                    value={faqNumber}
                    onChange={(e) => setFaqNumber(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Question</label>
                  <input
                    type="text"
                    required
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Answer</label>
                  <textarea
                    rows={3}
                    required
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsFaqModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-white/5 text-xs text-neutral-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2 rounded-xl bg-[#ea0044] text-white text-xs font-semibold cursor-pointer">
                    Save FAQ
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- IMAGE CROPPER MODAL (HOME CAROUSEL) --- */}
      {cropImageSrc && (
        <ImageCropperModal
          isOpen={isCropperOpen}
          imageSrc={cropImageSrc}
          onClose={() => {
            setIsCropperOpen(false);
            setCropImageSrc(null);
          }}
          onCropComplete={handleCropComplete}
          aspectRatio={4 / 3}
        />
      )}

      {/* --- IMAGE CROPPER MODAL (WORK SHOWCASE CAROUSEL) --- */}
      {showcaseCropImageSrc && (
        <ImageCropperModal
          isOpen={isShowcaseCropperOpen}
          imageSrc={showcaseCropImageSrc}
          onClose={() => {
            setIsShowcaseCropperOpen(false);
            setShowcaseCropImageSrc(null);
          }}
          onCropComplete={handleShowcaseCropComplete}
          aspectRatio={3 / 4}
        />
      )}
    </div>
  );
}

