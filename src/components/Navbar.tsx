import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetUrl } from '../utils/asset';


interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isPortfolioPage =
    typeof window !== 'undefined' &&
    (window.location.pathname.includes('work.html') ||
      window.location.pathname.endsWith('/work') ||
      window.location.pathname.endsWith('/portfolio/work.html'));

  const homeHref = isPortfolioPage ? getAssetUrl('/') : '#home';
  const workHref = isPortfolioPage ? '#portfolio-hero' : getAssetUrl('/work.html');
  const servicesHref = isPortfolioPage ? `${getAssetUrl('/')}#services` : '#services';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCollapsed = isScrolled && !isHovered;

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          width: isCollapsed ? 245 : 578,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pointer-events-auto flex items-center justify-between overflow-hidden rounded-[32px] p-2 sm:p-2.5 max-w-[calc(100vw-32px)]"
        style={{
          backgroundColor: 'rgba(130, 130, 130, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(184, 184, 184, 0.12)',
          clipPath: 'inset(0 round 32px)',
          contain: 'paint',
        }}
      >
        {/* Left: Avatar (real photo) + Name or Status */}
        <div className="flex items-center gap-2.5 flex-shrink-0 pl-1">
          <a
            href={homeHref}
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
                className="whitespace-nowrap text-[14px] font-medium tracking-tight text-[#f3f4f6] font-space cursor-pointer select-none"
                onClick={onOpenContact}
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
                className="whitespace-nowrap text-[14px] font-semibold tracking-tight text-[#f7f7f7] font-space cursor-pointer transition-opacity hover:opacity-90"
              >
                Farabi Ahad Tafim
              </motion.a>
            )}
          </AnimatePresence>
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
              className="flex items-center justify-center pr-2.5 pl-1 cursor-pointer py-1"
              onClick={onOpenContact}
              title="Available for work - Click to contact"
              aria-label="Available for work"
            >
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
            </motion.div>
          ) : (
            <motion.div
              key="full-menu"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-4 sm:gap-5 flex-shrink-0"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 text-[14px] font-normal text-[#b8b8b8]">
                <a
                  href={workHref}
                  className={`transition-colors duration-200 hover:text-white ${
                    isPortfolioPage ? 'text-white font-medium' : ''
                  }`}
                >
                  Work
                </a>
                <a
                  href={servicesHref}
                  className="transition-colors duration-200 hover:text-white"
                >
                  Services
                </a>
              </div>

              {/* Contact Button */}
              <button
                type="button"
                onClick={onOpenContact}
                className="h-[34px] min-w-[96px] cursor-pointer flex-shrink-0 whitespace-nowrap rounded-full px-6 text-[13px] sm:text-[14px] font-medium text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center"
                style={{
                  backgroundColor: 'rgb(187, 3, 28)',
                  boxShadow:
                    '0px 0.48px 0.87px -1.17px rgba(187, 3, 28, 0.68), 0px 1.83px 3.3px -2.33px rgba(187, 3, 28, 0.61), 0px 8px 14.4px -3.5px rgba(187, 3, 28, 0.3), inset 0.32px 0.44px 0.32px -1.19px rgba(255, 255, 255, 0.91), inset 0.97px 1.33px 0.99px -2.38px rgba(255, 255, 255, 0.84), inset 2.55px 3.51px 2.6px -3.56px rgba(255, 255, 255, 0.66), inset 8px 11px 8.16px -4.75px rgba(255, 255, 255, 0.05)',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                Contact
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
