import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import BottomBlurGradient from './components/BottomBlurGradient';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#141316] text-[#F3F4F6] relative selection:bg-[#bb031c] selection:text-white">
      {/* Floating Glassmorphism Pill Navbar (Blur is strictly clipped inside this navbar) */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Page Sections */}
      <main>
        <HeroSection onOpenContact={() => setIsContactOpen(true)} />
        <MarqueeSection />
        <ProjectsSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Footer with discovery banner and watermark */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Progressive Optical Gradient Backdrop Blur at the bottom of the screen */}
      <BottomBlurGradient />

      {/* Slide-out/Fade-in Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
