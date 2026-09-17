import { motion } from 'framer-motion';
import type { Project } from '../types/portfolio';
import { getAssetUrl } from '../utils/asset';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden"
    >
      {/* Image Container with cursor-following project action */}
      <div
        className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-900"
      >
        <img
          src={getAssetUrl(project.image)}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />

        {/* Category tag pill on top left */}
        <div className="absolute top-4 left-4 flex max-w-[calc(100%-32px)] gap-1.5 overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-medium tracking-wide text-neutral-200 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
          <span className="sr-only">
            {project.category}
          </span>
        </div>

      </div>

      {/* Info footer */}
      <div className="pt-4 px-1 transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-0">
        <h3 className="truncate text-base sm:text-lg font-bold font-space text-white tracking-tight">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}
