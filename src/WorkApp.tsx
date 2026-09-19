import { useState } from 'react';
import Navbar from './components/Navbar';
import WorkHeroSection from './components/WorkHeroSection';
import ProjectShowcaseSection from './components/ProjectShowcaseSection';
import WorkFooter from './components/WorkFooter';
import ContactModal from './components/ContactModal';
import BottomBlurGradient from './components/BottomBlurGradient';

export default function WorkApp() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#141316] text-[#F3F4F6] relative selection:bg-[#bb031c] selection:text-white">
      {/* Floating Glassmorphism Pill Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Background Hero Image */}
      <WorkHeroSection />

      {/* Main Content */}
      <main className="relative z-10 w-full pt-[100vh] pointer-events-none">
        <div className="pointer-events-auto">
          <ProjectShowcaseSection />
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
  );
}
