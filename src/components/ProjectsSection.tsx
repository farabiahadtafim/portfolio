import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { usePortfolio } from '../hooks/usePortfolio';

const demoCarouselBlocks = [
  'bg-[#d7a56d]',
  'bg-[#5d8d9a]',
  'bg-[#c96b57]',
  'bg-[#8c9b6b]',
  'bg-[#b8a6c9]',
];

export default function ProjectsSection() {
  const { projects } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const showcaseProjects = projects.length
    ? Array.from({ length: 9 }, (_, index) => projects[index % projects.length])
    : [];

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
        <div className="projects-carousel-track projects-carousel-left flex w-max gap-5 pb-5">
          {[...demoCarouselBlocks, ...demoCarouselBlocks].map((color, index) => (
            <div
              key={`top-${index}`}
              className={`projects-carousel-block ${color}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="projects-carousel-track projects-carousel-right flex w-max gap-5">
          {[...demoCarouselBlocks.slice().reverse(), ...demoCarouselBlocks.slice().reverse()].map((color, index) => (
            <div
              key={`bottom-${index}`}
              className={`projects-carousel-block ${color}`}
              aria-hidden="true"
            />
          ))}
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
              className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FF1E56]"
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
            <ArrowUpRight className="w-4 h-4 text-[#FF1E56] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
