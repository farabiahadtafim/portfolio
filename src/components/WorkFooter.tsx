import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

interface WorkFooterProps {
  onOpenContact: () => void;
}

const actionWords = ['create', 'design', 'build'];

function AnimatedFooterName() {
  const [weight, setWeight] = useState(300);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const period = 4500;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = (1 - Math.cos((elapsed / period) * 2 * Math.PI)) / 2;
      const currentWeight = Math.round(300 + progress * 600);
      setWeight(currentWeight);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full overflow-hidden select-none mt-10 sm:mt-14 pb-2 text-center">
      <h1
        style={{
          fontWeight: weight,
          fontVariationSettings: `'wght' ${weight}`,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2.5rem, 9.8vw, 13rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.035em',
        }}
        className="w-full text-[#bb031c] uppercase whitespace-nowrap tracking-tight transition-[font-weight] duration-75"
      >
        Farabi Ahad Tafim
      </h1>
    </div>
  );
}

function InstagramIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function BehanceIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.084 0-5.625-3.301-5.625-6.494 0-4.193 2.502-6.506 5.864-6.506 3.99 0 5.409 3.018 5.097 6.446h-7.986c.037 2.254 1.493 3.554 3.42 3.554 1.83 0 2.748-1.006 3.003-1.892l1.328.892zm-7.697-5.516h4.945c-.066-1.533-.91-2.613-2.387-2.613-1.636 0-2.38 1.139-2.558 2.613zm-11.029-7.484h-5v16h5.814c3.045 0 5.186-1.541 5.186-4.521 0-1.921-1.077-3.238-2.625-3.805 1.272-.676 2.094-1.932 2.094-3.524 0-2.711-2.128-4.15-5.469-4.15zm-2 2.547h2.612c1.691 0 2.784.717 2.784 2.164 0 1.436-1.127 2.23-2.822 2.23h-2.574v-4.394zm0 6.643h2.951c1.884 0 3.049.805 3.049 2.457 0 1.699-1.258 2.557-3.088 2.557h-2.912v-5.014z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsappIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function LinktreeIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.736 5.853l4.005-4.117 2.325 2.38-4.2 4.007h5.908v3.305h-5.937l4.229 4.108-2.325 2.38-4.005-4.117v7.974h-3.472v-7.974l-4.005 4.117-2.325-2.38 4.229-4.108h-5.938v-3.305h5.908l-4.2-4.007 2.325-2.38 4.005 4.117v-5.853h3.472v5.853z" />
    </svg>
  );
}

export default function WorkFooter({ onOpenContact }: WorkFooterProps) {
  const { profile } = usePortfolio();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % actionWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" className="relative w-full pt-16 pb-12 overflow-hidden bg-[#0c0c0e]">
      <div className="site-container relative z-10">
        
        {/* Main Footer Headline */}
        <div className="mb-14 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-space font-bold text-white tracking-tight leading-[1.08]"
          >
            Lets{' '}
            <span className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={actionWords[wordIndex]}
                  initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
                  transition={{ duration: 0.4 }}
                  className="font-microphone font-normal text-[#bb031c] inline-block tracking-normal lowercase"
                  style={{ fontFamily: "'MicrophoneCheck', 'Microphone Check Regular', sans-serif" }}
                >
                  {actionWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            <br />
            incredible work together.
          </motion.h2>
        </div>

        {/* Contact Information 3 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-b border-white/[0.08]">
          {/* Column 1: Email */}
          <div>
            <span className="block text-xs uppercase font-medium tracking-wider text-neutral-400 mb-2">
              Email
            </span>
            <a
              href={`mailto:${profile.social.email}`}
              className="text-base sm:text-lg font-bold text-white hover:text-[#bb031c] transition-colors"
            >
              {profile.social.email}
            </a>
          </div>

          {/* Column 2: Call / WhatsApp */}
          <div>
            <span className="block text-xs uppercase font-medium tracking-wider text-neutral-400 mb-2">
              Call / WhatsApp
            </span>
            <div className="flex flex-col gap-1">
              <a
                href={profile.social.whatsapp || 'https://wa.me/+8801638228009'}
                target="_blank"
                rel="noreferrer"
                className="text-base sm:text-lg font-bold text-white hover:text-[#bb031c] transition-colors"
              >
                {profile.social.phone || '+880 1638 228009'}
              </a>
              <button
                type="button"
                onClick={onOpenContact}
                className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer text-left inline-flex items-center gap-1 mt-0.5"
              >
                <span>Book a Discovery Call</span>
                <span className="text-[#bb031c]">→</span>
              </button>
            </div>
          </div>

          {/* Column 3: Social with Vibrant Red Circular Icon Buttons */}
          <div>
            <span className="block text-xs uppercase font-medium tracking-wider text-neutral-400 mb-2">
              Social Links
            </span>
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              {profile.social.whatsapp && (
                <a
                  href={profile.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="text-neutral-400 hover:text-[#bb031c] transition-all duration-200 hover:scale-110 p-1"
                >
                  <WhatsappIcon className="w-5 h-5" />
                </a>
              )}
              {profile.social.behance && (
                <a
                  href={profile.social.behance}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Behance"
                  title="Behance"
                  className="text-neutral-400 hover:text-[#bb031c] transition-all duration-200 hover:scale-110 p-1"
                >
                  <BehanceIcon className="w-5 h-5" />
                </a>
              )}
              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="text-neutral-400 hover:text-[#bb031c] transition-all duration-200 hover:scale-110 p-1"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {profile.social.instagram && (
                <a
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="text-neutral-400 hover:text-[#bb031c] transition-all duration-200 hover:scale-110 p-1"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
              {profile.social.facebook && (
                <a
                  href={profile.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="text-neutral-400 hover:text-[#bb031c] transition-all duration-200 hover:scale-110 p-1"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
              {profile.social.linktree && (
                <a
                  href={profile.social.linktree}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Linktree"
                  title="Linktree"
                  className="text-neutral-400 hover:text-[#bb031c] transition-all duration-200 hover:scale-110 p-1"
                >
                  <LinktreeIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 text-xs text-neutral-400">
          <div className="flex items-center gap-6">
            <span className="text-neutral-500 font-medium">Menu</span>
            <a href="#work-projects" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>

          <p>© {new Date().getFullYear()} Farabi Ahad Tafim. All rights reserved.</p>
        </div>
      </div>

      {/* Massive Full Width Name with Light->Bold Font Weights and Black Animation */}
      <div className="w-full max-w-[100vw] overflow-hidden px-4 sm:px-6 lg:px-8">
        <AnimatedFooterName />
      </div>
    </footer>
  );
}
