import { usePortfolioContent } from '../context/PortfolioContext';
import portfolioData from '../data/portfolio.json';
import type { Portfolio } from '../types/portfolio';

export function usePortfolio(): Portfolio {
  try {
    const cms = usePortfolioContent();
    return {
      ...portfolioData,
      profile: {
        ...portfolioData.profile,
        tagline: cms.homeSettings.hero_tagline || portfolioData.profile.tagline,
        clientCount: cms.homeSettings.client_count || portfolioData.profile.clientCount,
        heroAvatar: cms.homeSettings.hero_avatar_url || portfolioData.profile.heroAvatar,
        aboutPhoto: cms.homeSettings.about_photo_url || portfolioData.profile.aboutPhoto,
        bioTitle: cms.homeSettings.bio_title || portfolioData.profile.bioTitle,
      },
      projects: cms.mainProjects.length ? cms.mainProjects : (portfolioData.projects as any),
      services: cms.services.length ? (cms.services as any) : (portfolioData.services as any),
      testimonials: cms.testimonials.length ? (cms.testimonials as any) : (portfolioData.testimonials as any),
      faqs: cms.faqs.length ? (cms.faqs as any) : (portfolioData.faqs as any),
    } as Portfolio;
  } catch {
    return portfolioData as Portfolio;
  }
}

