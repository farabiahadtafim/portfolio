import { useState } from 'react';
import Navbar from './components/Navbar';
import WorkHeroSection from './components/WorkHeroSection';
import ProjectShowcaseSection from './components/ProjectShowcaseSection';
import MasonryGallerySection from './components/MasonryGallerySection';
import WorkFooter from './components/WorkFooter';
import ContactModal from './components/ContactModal';
import BottomBlurGradient from './components/BottomBlurGradient';
import { PortfolioProvider } from './context/PortfolioContext';
import { useLenis } from './hooks/useLenis';
import { supplementProjects } from './data/supplementProjects';

export default function WorkApp() {
  useLenis();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#141316] text-[#F3F4F6] relative selection:bg-[#bb031c] selection:text-white">
        {/* Floating Glassmorphism Pill Navbar */}
        <Navbar onOpenContact={() => setIsContactOpen(true)} />

        {/* Background Hero Image */}
        <WorkHeroSection />

        {/* Main Content */}
        <main className="relative z-10 w-full pt-[100vh] pointer-events-none">
          <div className="pointer-events-auto pb-24">
            <ProjectShowcaseSection />

            <div className="relative z-20 mt-10">
              {/* Seamless gradient transition from hero image into #141316 */}
              <div
                className="w-full h-32 sm:h-48 pointer-events-none -mb-1"
                style={{
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(20, 19, 22, 0.4) 40%, rgba(20, 19, 22, 0.85) 75%, #141316 100%)',
                }}
              />
              <div id="work-gallery" className="bg-[#141316]">
                <MasonryGallerySection id="gallery-supplement" title="Supplement Label Design" itemCount={51} imageFolder="Supplement Label" projectData={supplementProjects} />
                <MasonryGallerySection id="gallery-box" title="Box Label Design" itemCount={20} />
                <MasonryGallerySection id="gallery-can" title="Can Label Design" itemCount={20} />
                <MasonryGallerySection id="gallery-pouch" title="Pouch Label Design" itemCount={20} />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <WorkFooter onOpenContact={() => setIsContactOpen(true)} />

        {/* Progressive Optical Gradient Backdrop Blur */}
        <BottomBlurGradient />

        {/* Slide-out/Fade-in Contact Modal */}
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </PortfolioProvider>
  );
}
