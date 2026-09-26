import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface MasonryGallerySectionProps {
  title: string;
  itemCount: number;
  id?: string;
  imageFolder?: string;
  projectData?: { brand: string; product: string }[];
}

interface RatioConfig {
  ratio: '4:3' | '3:4' | '1:1';
  cssRatio: string;
  width: number;
  height: number;
}

const RATIO_CYCLE: RatioConfig[] = [
  { ratio: '3:4', cssRatio: '3 / 4', width: 450, height: 600 },
  { ratio: '1:1', cssRatio: '1 / 1', width: 500, height: 500 },
  { ratio: '4:3', cssRatio: '4 / 3', width: 600, height: 450 },
  { ratio: '3:4', cssRatio: '3 / 4', width: 450, height: 600 },
  { ratio: '1:1', cssRatio: '1 / 1', width: 500, height: 500 },
  { ratio: '3:4', cssRatio: '3 / 4', width: 450, height: 600 },
  { ratio: '4:3', cssRatio: '4 / 3', width: 600, height: 450 },
];

export default function MasonryGallerySection({ title, itemCount, id, imageFolder, projectData }: MasonryGallerySectionProps) {
  // Generate data with randomized Pinterest-style aspect ratios (4:3, 3:4, 1:1)
  const items = useMemo(() => {
    return Array.from({ length: itemCount }).map((_, i) => {
      // Deterministic ratio assignment so layout remains rock-solid and stable
      const config = RATIO_CYCLE[(i * 3 + (i % 5)) % RATIO_CYCLE.length];
      return {
        id: i,
        ratio: config.ratio,
        cssRatio: config.cssRatio,
        width: config.width,
        height: config.height,
        brand: projectData && projectData[i] ? projectData[i].brand : `View Project ${i + 1}`,
        product: projectData && projectData[i] ? projectData[i].product : `Ratio ${config.ratio}`,
        imageUrl: imageFolder 
          ? `${import.meta.env.BASE_URL}image/projects/${imageFolder}/Portfolio-${String(i + 1).padStart(2, '0')}.webp`
          : `https://placehold.co/${config.width}x${config.height}/1c1b20/FFF?text=Design+${i + 1}`,
      };
    });
  }, [itemCount, imageFolder, projectData]);

  return (
    <section id={id} className="relative w-full py-16 px-4 sm:px-6 lg:px-8 z-20 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12 flex flex-col items-center text-center px-4">

          {/* Top Tagline */}
          <motion.div 
            className="flex items-end gap-1.5 -mb-2 mt-2 relative z-20"
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 2.0, ease: "easeOut" }}
          >
            <span className="text-xl md:text-3xl lg:text-4xl font-bold text-white/90 tracking-tight border-b-[4px] border-white/70 pb-1 leading-tight">
              Precision & Visuals
            </span>
          </motion.div>

          {/* Hero Text with Bounding Box */}
          <div className="relative inline-block mt-5 mb-2">

            {/* Chat bubble SVG (floating over 'u') */}
            <motion.div 
              className="absolute -top-4 left-[8%] md:-top-5 md:left-[9%] z-30 drop-shadow-lg transform origin-bottom-left"
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: [0, 1.15, 1], rotate: [-10, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 2.0, type: "spring" }}
            >
              <svg width="55" height="45" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="60" rx="30" fill="#a8a9ad" />
                <path d="M70 55 L90 75 L80 50 Z" fill="#a8a9ad" />
                <motion.circle cx="30" cy="30" r="7" fill="#1a191e" 
                  animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} 
                />
                <motion.circle cx="50" cy="30" r="7" fill="#1a191e" 
                  animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} 
                />
                <motion.circle cx="70" cy="30" r="7" fill="#1a191e" 
                  animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} 
                />
              </svg>
            </motion.div>

            {/* Center-Split Unmasking Container */}
            <motion.div
              className="relative z-10"
              initial={{ clipPath: "inset(0 50% 0 50%)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* The Bounding Box Background */}
              <div className="absolute inset-0 bg-[#e60000]/15 border-y border-[#e60000]/30" />

              {/* The Text itself */}
              <div className="relative py-2 md:py-3 px-3 md:px-5 flex items-end">
                <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter text-white font-space leading-none">
                  {title}
                </h2>
                
                <div className="relative inline-flex items-center justify-center ml-1">
                  <motion.span 
                    className="text-[#e60000] inline-block text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter font-space leading-none"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.4, 1] }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 10, delay: 2.0 }}
                  >
                    .
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Left Vector Handle */}
            <motion.div 
              className="absolute top-0 bottom-0 w-[3px] bg-[#e60000] flex flex-col justify-end items-center pointer-events-none z-20"
              initial={{ left: "50%" }}
              whileInView={{ left: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-4 h-4 rounded-full bg-[#e60000] -mb-[8px]" />
            </motion.div>

            {/* Right Vector Handle */}
            <motion.div 
              className="absolute top-0 bottom-0 w-[3px] bg-[#e60000] flex flex-col justify-start items-center pointer-events-none z-20"
              initial={{ right: "50%" }}
              whileInView={{ right: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-4 h-4 rounded-full bg-[#e60000] -mt-[8px]" />
            </motion.div>

          </div>

          {/* Bottom Subtitle */}
          <motion.p 
            className="text-xs md:text-sm font-medium text-[#e60000] font-space mt-0.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 2.0 }}
          >
            FDA-registered packaging designs crafted for UK & international brands.
          </motion.p>
        </div>

        {/* Pinterest-style CSS Columns Masonry */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-6 relative group rounded-2xl overflow-hidden bg-[#1a191e]/90 border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#bb031c]/15"
              style={{
                aspectRatio: item.cssRatio,
                contentVisibility: 'auto',
                containIntrinsicSize: `300px ${Math.round(300 / (item.width / item.height))}px`,
              }}
            >
              <img
                src={item.imageUrl}
                alt={`${title} - Item ${item.id + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Optional overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-white font-medium tracking-wide">
                  {item.brand}
                </span>
                <span className="text-[11px] text-white/50 font-mono mt-0.5">
                  {item.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
