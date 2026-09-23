import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { usePortfolio } from '../hooks/usePortfolio';
import { usePortfolioContent, DEFAULT_HOME_SETTINGS } from '../context/PortfolioContext';
import { getAssetUrl } from '../utils/asset';

const defaultFallbackBlocks = [
  'bg-[#d7a56d]',
  'bg-[#5d8d9a]',
  'bg-[#c96b57]',
  'bg-[#8c9b6b]',
  'bg-[#b8a6c9]',
];

export default function ProjectsSection() {
  const { projects } = usePortfolio();
  const { homeSettings } = usePortfolioContent();
  const sectionRef = useRef<HTMLElement>(null);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const showcaseProjects = projects;

  // Limit carousel images to 40, fallback to DEFAULT_HOME_SETTINGS images
  const userImages =
    homeSettings?.carousel_images && homeSettings.carousel_images.length > 0
      ? homeSettings.carousel_images.slice(0, 40)
      : (DEFAULT_HOME_SETTINGS.carousel_images || []);
  const carouselItems = userImages.length > 0
    ? userImages
    : defaultFallbackBlocks;

  // Split into two halves: 1-20 on top, 21-40 on bottom
  let topHalf = carouselItems.slice(0, 20);
  let bottomHalf = carouselItems.slice(20, 40);

  // Fallback if there are no images for the bottom half
  if (bottomHalf.length === 0 && topHalf.length > 0) {
    bottomHalf = [...topHalf];
  }

  // Ensure each half has enough items to span a large monitor (approx minimum 8 items)
  const MIN_ITEMS = 8;
  if (topHalf.length > 0 && topHalf.length < MIN_ITEMS) {
    const repeats = Math.ceil(MIN_ITEMS / topHalf.length);
    topHalf = Array(repeats).fill(topHalf).flat();
  }
  if (bottomHalf.length > 0 && bottomHalf.length < MIN_ITEMS) {
    const repeats = Math.ceil(MIN_ITEMS / bottomHalf.length);
    bottomHalf = Array(repeats).fill(bottomHalf).flat();
  }

  // Duplicate for the infinite CSS marquee trick (-50% translation)
  const topBlocks = [...topHalf, ...topHalf];
  const bottomBlocks = [...bottomHalf, ...bottomHalf];

  // Dynamic animation duration based on item count to maintain constant speed (4s per item)
  const topDuration = topHalf.length * 4;
  const bottomDuration = bottomHalf.length * 4;

  const renderCarouselBlock = (item: string, key: string) => {
    const isImage = item.startsWith('/') || item.startsWith('http') || item.startsWith('blob:') || item.startsWith('data:');
    if (isImage) {
      return (
        <div
          key={key}
          className="projects-carousel-block relative overflow-hidden bg-neutral-900 border border-white/10 shadow-lg cursor-pointer"
        >
          <img
            src={getAssetUrl(item)}
            alt="Portfolio showcase preview"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
        </div>
      );
    }
    return (
      <div
        key={key}
        className={`projects-carousel-block ${item}`}
        aria-hidden="true"
      />
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-24 overflow-hidden"
      onMouseEnter={() => setIsCursorVisible(true)}
      onMouseMove={(event) => {
        const bounds = sectionRef.current?.getBoundingClientRect();
        if (!bounds) return;
        setCursorPosition({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
      }}
      onMouseLeave={() => setIsCursorVisible(false)}
    >
      <div
        className={`projects-pointer-button glossy-pink-button ${
          isCursorVisible ? 'is-visible' : ''
        }`}
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
        aria-hidden="true"
      >
        View Project
      </div>

      {/* Full-width image placeholders marquee carousel */}
      <div className="relative mb-20 w-full overflow-hidden">
        <div 
          className="projects-carousel-track projects-carousel-left flex w-max gap-5 pb-5"
          style={{ animationDuration: `${topDuration}s` }}
        >
          {topBlocks.map((item, index) => renderCarouselBlock(item, `top-${index}`))}
        </div>

        <div 
          className="projects-carousel-track projects-carousel-right flex w-max gap-5"
          style={{ animationDuration: `${bottomDuration}s` }}
        >
          {bottomBlocks.map((item, index) => renderCarouselBlock(item, `bottom-${index}`))}
        </div>
      </div>

      {/* Section Content inside site-container */}
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#bb031c]"
            >
              Selected Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-space font-bold text-white tracking-tight mt-2"
            >
              Latest Projects
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-400 max-w-md mt-4 md:mt-0"
          >
            Carefully crafted brand identities, high-impact packaging, and modern digital interfaces.
          </motion.p>
        </div>

        {/* 3-column showcase grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {showcaseProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} index={index} />
          ))}
        </div>

        {/* View all projects CTA */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#141316] hover:bg-[#1a191e] border border-white/10 hover:border-white/20 text-white text-sm font-semibold transition-all duration-200"
          >
            <span>View all my projects</span>
            <ArrowUpRight className="w-4 h-4 text-[#bb031c] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
