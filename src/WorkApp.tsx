import { useState } from 'react';
import Navbar from './components/Navbar';
import WorkHeroSection from './components/WorkHeroSection';
import ProjectShowcaseSection from './components/ProjectShowcaseSection';
import MasonryGallerySection from './components/MasonryGallerySection';
import WorkFooter from './components/WorkFooter';
import ContactModal from './components/ContactModal';
import BottomBlurGradient from './components/BottomBlurGradient';
import { PortfolioProvider } from './context/PortfolioContext';

export default function WorkApp() {
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
          
          <div className="bg-[#141316] relative z-20 mt-10">
            <MasonryGallerySection title="Supplement Label Design" itemCount={50} />
            <MasonryGallerySection title="Box Label Design" itemCount={20} />
            <MasonryGallerySection title="Pouch Label Design" itemCount={20} />
            <MasonryGallerySection title="Can Label Design" itemCount={20} />
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
