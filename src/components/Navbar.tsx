import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetUrl } from '../utils/asset';
import { Menu, Briefcase, Layers, Mail } from 'lucide-react';


interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isPortfolioPage =
    typeof window !== 'undefined' &&
    (window.location.pathname.includes('/work/') ||
      window.location.pathname.endsWith('/work') ||
      window.location.pathname.endsWith('/portfolio/work'));

  const homeHref = isPortfolioPage ? getAssetUrl('/') : '#home';
  const workHref = isPortfolioPage ? '#portfolio-hero' : getAssetUrl('/work/');
  const servicesHref = isPortfolioPage ? `${getAssetUrl('/')}#services` : '#services';

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      // Auto-collapse mobile menu on scroll
      if (Math.abs(window.scrollY - lastScrollY) > 10) {
        setIsMobileMenuOpen(false);
        lastScrollY = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCollapsed = isMobile ? !isMobileMenuOpen : (isScrolled && !isHovered);

  return (
    <header className="fixed top-6 inset-x-0 w-full z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          width: isMobile ? (isMobileMenuOpen ? 'min(310px, calc(100vw - 32px))' : 245) : (isCollapsed ? 245 : 578),
          height: 56,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        className={`pointer-events-auto !mx-auto flex justify-between overflow-hidden rounded-[32px] p-2 sm:p-2.5 max-w-[calc(100vw-32px)] items-center`}
        style={{
          backgroundColor: 'rgba(130, 130, 130, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(184, 184, 184, 0.12)',
          clipPath: 'inset(0 round 32px)',
          contain: 'paint',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform, width',
        }}
      >
        {/* Left: Avatar (real photo) + Name or Status */}
        <div className={`flex items-center gap-2.5 flex-shrink-0 pl-1`}>
          <div className="flex items-center gap-2.5">
            <a
            href={homeHref}
            onClick={() => {
              if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
              }
            }}
            className="flex items-center group cursor-pointer transition-opacity hover:opacity-90 flex-shrink-0"
            aria-label="Home"
          >
            <div className="h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
              <img
                src={getAssetUrl("/image/Farabi Ahad Tafim Circle facing.webp")}
                alt="Farabi Ahad Tafim"
                className="w-full h-full object-cover scale-105"
              />
            </div>
          </a>

          <AnimatePresence mode="wait" initial={false}>
            {isCollapsed ? (
              <motion.span
                key="available-text"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap text-[14px] font-medium tracking-tight text-[#f3f4f6] font-space select-none"
              >
                Available for work
              </motion.span>
            ) : (
              <motion.a
                key="name-text"
                href={homeHref}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className={`whitespace-nowrap text-[14px] font-semibold tracking-tight text-[#f7f7f7] font-space cursor-pointer transition-opacity hover:opacity-90 ${isMobile ? 'hidden' : 'block'}`}
              >
                Farabi Ahad Tafim
              </motion.a>
            )}
          </AnimatePresence>
          </div>
        </div>

        {/* Right side: Glowing Green Beacon when collapsed vs Full Menu */}
        <AnimatePresence mode="wait" initial={false}>
          {isCollapsed ? (
            <motion.div
              key="collapsed-beacon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center justify-center pr-2.5 pl-1 py-1 ${isMobile ? 'cursor-pointer' : ''}`}
              onClick={isMobile ? () => setIsMobileMenuOpen(true) : undefined}
              title={isMobile ? "Menu" : "Available for work"}
              aria-label={isMobile ? "Menu" : "Available for work"}
            >
              <div className="flex items-center gap-1.5">
                <div className="relative flex items-center justify-center w-6 h-6">
                  {/* Crisp circular spread disk exactly matching reference screenshot */}
                  <motion.span
                    className="absolute w-2 h-2 rounded-full pointer-events-none"
                    style={{
                      backgroundColor: 'rgba(0, 255, 42, 0.22)',
                    }}
                    animate={{
                      scale: [1, 1.2, 3.8, 4.2, 4.2],
                      opacity: [0, 0.85, 0.35, 0, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeOut',
                      times: [0, 0.05, 0.45, 0.58, 1],
                    }}
                  />
                  {/* Single crisp #00ff2a point light dot */}
                  <span
                    className="relative w-2 h-2 rounded-full bg-[#00ff2a]"
                    style={{
                      boxShadow: '0 0 5px rgba(0, 255, 42, 0.8)',
                    }}
                  />
                </div>
                {isMobile && (
                  <Menu className="w-5 h-5 text-white/80" />
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="full-menu"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className={`flex flex-shrink-0 items-center gap-1 sm:gap-1.5 mr-1`}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {[
                {
                  id: 'work',
                  label: 'Work',
                  href: workHref,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-3.5 sm:h-3.5">
                      <path d="M10 2h4c1.1 0 2 .9 2 2v2h4c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2zm0 4h4V4h-4v2z" />
                    </svg>
                  ),
                },
                {
                  id: 'services',
                  label: 'Services',
                  href: servicesHref,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-3.5 sm:h-3.5">
                      <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
                    </svg>
                  ),
                },
                {
                  id: 'contact',
                  label: 'Contact',
                  action: () => {
                    setIsMobileMenuOpen(false);
                    onOpenContact();
                  },
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-3.5 sm:h-3.5">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  ),
                },
              ].map((item) => {
                const isActive = (hoveredTab || 'contact') === item.id;
                
                const content = (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="glossy-red-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: 'rgb(187, 3, 28)',
                          boxShadow:
                            '0px 0.48px 0.87px -1.17px rgba(187, 3, 28, 0.68), 0px 1.83px 3.3px -2.33px rgba(187, 3, 28, 0.61), 0px 8px 14.4px -3.5px rgba(187, 3, 28, 0.3), inset 0.32px 0.44px 0.32px -1.19px rgba(255, 255, 255, 0.91), inset 0.97px 1.33px 0.99px -2.38px rgba(255, 255, 255, 0.84), inset 2.55px 3.51px 2.6px -3.56px rgba(255, 255, 255, 0.66), inset 8px 11px 8.16px -4.75px rgba(255, 255, 255, 0.05)',
                        }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                      {item.icon}
                      {item.label}
                    </span>
                  </>
                );

                const commonClasses = `relative flex items-center justify-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[11px] sm:text-[12px] font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`;

                if (item.href) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={() => setHoveredTab(item.id)}
                      className={commonClasses}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.action}
                    onMouseEnter={() => setHoveredTab(item.id)}
                    className={commonClasses}
                  >
                    {content}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
