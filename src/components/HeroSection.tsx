import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import tafimCartoonHead from '../../image/tafim-cartoon-head.webp';
import farabiAhadTafim from '../../image/Farabi Ahad Tafim Front Facing.webp';
import Magnet from './Magnet';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export default function HeroSection({ onOpenContact }: HeroSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-between pt-[96px] pb-10 sm:pb-12 bg-[#141316] select-none overflow-hidden"
    >
      {/* Subtle radial ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] sm:h-[650px] bg-[#ea0044]/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Centerpiece Container: 1039px x 366px exactly as measured from Framer */}
      <div className="site-container relative h-[366px] flex items-center justify-center my-auto">
        {/* Title Stack: THINK (white) & CREATIVELY (pink) */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
        >
          <h1 className="font-space font-semibold uppercase text-center select-none leading-[115px] sm:leading-[130px] md:leading-[145.5px]">
            <span className="relative -top-2 block text-[clamp(60px,16vw,239px)] tracking-[-0.04em] text-[#f7f7f7]">
              THINK
            </span>
            <span className="relative top-2 block text-[clamp(48px,13vw,190px)] tracking-[-0.02em] text-[#ea0044]">
              CREATIVELY
            </span>
          </h1>
        </motion.div>

        {/* 3D Character Avatar: bottom: -145px, centered, with natural floating animation */}
        <Magnet
          maxOffset={86}
          influenceRadius={520}
          smoothing={0.075}
          strength={7}
          activeTransition="none"
          inactiveTransition="none"
          className="absolute bottom-[-145px] left-1/2 -translate-x-1/2 z-10 w-[270px] sm:w-[350px] md:w-[420px] lg:w-[480px] pointer-events-none flex justify-center items-center"
          style={{
            filter: 'drop-shadow(79px 30px 42px rgba(0,0,0,0.35))',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.86 }}
            animate={{ opacity: 1, y: [70, -6, 0], scale: [0.86, 1.02, 1] }}
            transition={{
              opacity: { duration: 0.45, delay: 0.28 },
              y: { duration: 1.15, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.15, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
            }}
            className="w-full flex justify-center"
          >
            <motion.img
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              src={tafimCartoonHead}
              alt="Character Avatar"
              className="w-[105%] max-w-none h-auto object-contain select-none"
            />
          </motion.div>
        </Magnet>
      </div>

      {/* Lower Row: Tagline on Left, "Book a call with me" Button on Right (.framer-q4zb98) */}
      <div className="site-container relative z-20 flex flex-col sm:flex-row items-center sm:items-start justify-between pt-4 pb-2 gap-6">
        {/* Left Tagline: 305px width, 3 lines, color #b8b8b8 */}
        <motion.div
          initial={{ opacity: 0, x: -42 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative -top-6 w-full sm:w-[305px] text-center sm:text-left"
        >
          <p className="text-[18px] leading-[1.45] text-[#b8b8b8] font-normal font-space tracking-normal">
            I help brands turn<br />
            ideas into structured,<br />
            meaningful experiences
          </p>
        </motion.div>

        {/* Right Button: "Book a call with me" with glossy specular glass finish & avatar reveal on hover */}
        <motion.div
          initial={{ opacity: 0, x: 42 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.18, ease: [0.16, 1, 0.3, 1] }}
          className="relative -top-6 flex-shrink-0"
        >
          <motion.button
            type="button"
            onClick={onOpenContact}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-pointer text-white select-none inline-flex items-center justify-center transition-all duration-300 outline-none"
            style={{
              backgroundColor: 'rgb(234, 0, 68)',
              borderRadius: '24px',
              padding: isHovered ? '8px 20px 8px 12px' : '10px 24px',
              boxShadow: isHovered
                ? 'rgba(234, 0, 68, 0.85) 0px 4px 25px, rgba(255, 255, 255, 0.95) 0px 1px 1px inset, rgba(255, 255, 255, 0.3) 0px 6px 12px inset'
                : '0px 0.48px 0.87px -1.17px rgba(234, 0, 68, 0.68), 0px 1.83px 3.3px -2.33px rgba(234, 0, 68, 0.61), 0px 8px 14.4px -3.5px rgba(234, 0, 68, 0.3), inset 0.32px 0.44px 0.32px -1.19px rgba(255, 255, 255, 0.91), inset 0.97px 1.33px 0.99px -2.38px rgba(255, 255, 255, 0.84), inset 2.55px 3.51px 2.6px -3.56px rgba(255, 255, 255, 0.66), inset 8px 11px 8.16px -4.75px rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Single Avatar Expand on Hover */}
            <AnimatePresence initial={false}>
              {isHovered && (
                <motion.div
                  initial={{ width: 0, opacity: 0, marginRight: 0 }}
                  animate={{ width: 32, opacity: 1, marginRight: 10 }}
                  exit={{ width: 0, opacity: 0, marginRight: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden flex-shrink-0"
                >
                  <img
                    src={farabiAhadTafim}
                    alt="Farabi Ahad Tafim"
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-white/60 shadow-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <span className="text-[15px] font-medium text-white tracking-tight whitespace-nowrap">
              Book a call with me
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
