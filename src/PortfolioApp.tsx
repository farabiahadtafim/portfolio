import { useState } from 'react';
import Navbar from './components/Navbar';
import WorkHeroSection from './components/WorkHeroSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import BottomBlurGradient from './components/BottomBlurGradient';

export default function PortfolioApp() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#141316] text-[#F3F4F6] relative selection:bg-[#ea0044] selection:text-white">
      {/* Floating Glassmorphism Pill Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content */}
      <main>
        {/* Full-width Screen Work Hero Section */}
        <WorkHeroSection />

        {/* Selected Works Showcase Grid */}
        <ProjectsSection />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

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
