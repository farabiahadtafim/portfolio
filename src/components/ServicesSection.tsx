import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import photoshopIcon from '../../image/Adobe Photoshop.svg';
import illustratorIcon from '../../image/Adobe Illustrator.svg';
import premiereIcon from '../../image/Adobe Premiere Pro.svg';
import figmaIcon from '../../image/Figma.svg';
import antigravityIcon from '../../image/Antigravity.svg';
import brandIdentityIcon from '../../image/Brand Identity.svg';
import chatgptIcon from '../../image/ChatGPT.svg';
import claudeIcon from '../../image/Claude.svg';

/* --- SVG Icons --- */
function StrategyIcon({ className = 'h-6 w-6 text-[#ea0044]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 84.36 100" fill="currentColor" className={className}>
      <path d="M76.94,100H7.42c-4.09,0-7.42-3.33-7.42-7.42V7.42C0,3.33,3.33,0,7.42,0h69.51c4.1,0,7.42,3.33,7.42,7.42v85.15c0,4.1-3.33,7.42-7.42,7.42ZM7.42,6.18c-.69,0-1.25.56-1.25,1.25v85.15c0,.69.56,1.25,1.25,1.25h69.51c.69,0,1.25-.56,1.25-1.25V7.42c0-.69-.56-1.25-1.25-1.25H7.42Z" />
      <path d="M63.3,44.68H21.06c-2.41,0-4.37-1.96-4.37-4.37v-20.3c0-2.41,1.96-4.37,4.37-4.37h42.25c2.41,0,4.37,1.96,4.37,4.37v20.3c0,2.41-1.96,4.37-4.37,4.37ZM22.86,38.5h38.63v-16.69H22.86v16.69Z" />
      <g>
        <rect x="57.82" y="54.83" width="9.36" height="9.36" />
        <rect x="37.5" y="54.83" width="9.36" height="9.36" />
        <rect x="17.18" y="54.83" width="9.36" height="9.36" />
        <rect x="57.82" y="74.34" width="9.36" height="9.36" />
        <rect x="37.5" y="74.34" width="9.36" height="9.36" />
        <rect x="17.18" y="74.34" width="9.36" height="9.36" />
      </g>
    </svg>
  );
}

function GeometricShapesIcon({ className = 'h-6 w-6 text-white' }: { className?: string }) {
  return (
    <svg viewBox="0 0 84.36 75.29" fill="currentColor" className={className}>
      <path d="M84.36,75.29h-40.85v-28.54h40.85v28.54ZM48.85,69.95h30.18v-17.88h-30.18v17.88Z" />
      <path d="M55.34,39.18c-10.8,0-19.59-8.79-19.59-19.59S44.54,0,55.34,0s19.59,8.79,19.59,19.59-8.79,19.59-19.59,19.59ZM55.34,5.33c-7.86,0-14.26,6.4-14.26,14.26s6.4,14.26,14.26,14.26,14.26-6.4,14.26-14.26-6.4-14.26-14.26-14.26Z" />
      <path d="M37.34,64.92H0L18.67,9.34l18.67,55.58ZM9.08,58.4h19.19l-9.59-28.56-9.59,28.56Z" />
    </svg>
  );
}

/* Tool list using icons from image folder */
interface ToolItem {
  name: string;
  type: 'image' | 'svg';
  src?: string;
  icon?: () => ReactNode;
}

const toolsList: ToolItem[] = [
  { name: 'Adobe Photoshop', type: 'image', src: photoshopIcon },
  { name: 'Adobe Illustrator', type: 'image', src: illustratorIcon },
  { name: 'Adobe Premiere Pro', type: 'image', src: premiereIcon },
  { name: 'Figma', type: 'image', src: figmaIcon },
  { name: 'Antigravity', type: 'image', src: antigravityIcon },
  { name: 'Brand Identity', type: 'image', src: brandIdentityIcon },
  { name: 'ChatGPT', type: 'image', src: chatgptIcon },
  { name: 'Claude', type: 'image', src: claudeIcon },
];

/* Service card configuration */
interface CardConfig {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  theme: 'dark' | 'accent';
  iconType: 'strategy' | 'geometric';
}

const defaultCards: CardConfig[] = [
  {
    id: 'strategy',
    title: 'Design Strategy',
    category: '01 / Strategy',
    description:
      'Understanding the problem clearly before designing the solution. Every decision is based on purpose, not guesswork.',
    tags: ['User Research', 'Information Architecture', 'User Flows', 'Experience Mapping'],
    theme: 'dark',
    iconType: 'strategy',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    category: '02 / Brand Identity',
    description:
      'Creating strong visual systems that communicate clearly and stay consistent across every touchpoint.',
    tags: ['Logo Design', 'Visual Identity Systems', 'Typography', 'Brand Guidelines'],
    theme: 'accent',
    iconType: 'geometric',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    category: '03 / Product Design',
    description:
      'Designing interfaces that are simple, intuitive, and built around real user behavior.',
    tags: ['Wireframing', 'Prototyping', 'Usability Thinking', 'Interaction Design'],
    theme: 'dark',
    iconType: 'geometric',
  },
  {
    id: 'packaging',
    title: 'Packaging Design',
    category: '04 / Packaging Design',
    description:
      'Designing packaging that stands out on shelf and communicates product value instantly.',
    tags: ['Packaging Systems', 'Label Design', 'Visual Hierarchy', 'Print Production'],
    theme: 'accent',
    iconType: 'geometric',
  },
  {
    id: 'digital-design',
    title: 'Digital Design',
    category: '05 / Digital Media',
    description:
      'Creating visuals that grab attention and communicate clearly across digital platforms.',
    tags: ['Social Media Creatives', 'Ad Creatives', 'Content Design', 'Campaign Visuals'],
    theme: 'dark',
    iconType: 'geometric',
  },
];

/* --- Interactive Stacked Service Card Component --- */
interface StackedServiceCardProps {
  card: CardConfig;
  index: number;
  scrollYProgress: MotionValue<number>;
}

function StackedServiceCard({ card, index, scrollYProgress }: StackedServiceCardProps) {
  const isAccent = card.theme === 'accent';

  // Alternating initial rotation & offset angles:
  // Odd cards (Card 1, Card 3, Card 5 -> index 0, 2, 4): counter-clockwise (-3.5deg) and x: -15px
  // Even cards (Card 2, Card 4 -> index 1, 3): clockwise (+3.5deg) and x: +15px
  const isEven = (index + 1) % 2 === 0;
  const initialRotate = isEven ? 3.5 : -3.5;
  const initialX = isEven ? 15 : -15;

  let y: MotionValue<number> | number = 0;
  let rotate: MotionValue<number> | number = 0;
  let x: MotionValue<number> | number = 0;
  let opacity: MotionValue<any> | number = 1;

  if (index === 0) {
    y = 0;
    rotate = 0;
    x = 0;
    opacity = 1;
  } else if (index === 1) {
    opacity = useTransform(scrollYProgress, [0.04, 0.12], [0, 1]);
    y = useTransform(scrollYProgress, [0.05, 0.26], [750, 0]);
    rotate = useTransform(scrollYProgress, [0.05, 0.18, 0.26], [initialRotate * 1.3, initialRotate, 0]);
    x = useTransform(scrollYProgress, [0.05, 0.18, 0.26], [initialX * 1.3, initialX, 0]);
  } else if (index === 2) {
    opacity = useTransform(scrollYProgress, [0.27, 0.35], [0, 1]);
    y = useTransform(scrollYProgress, [0.28, 0.49], [750, 0]);
    rotate = useTransform(scrollYProgress, [0.28, 0.41, 0.49], [initialRotate * 1.3, initialRotate, 0]);
    x = useTransform(scrollYProgress, [0.28, 0.41, 0.49], [initialX * 1.3, initialX, 0]);
  } else if (index === 3) {
    opacity = useTransform(scrollYProgress, [0.50, 0.58], [0, 1]);
    y = useTransform(scrollYProgress, [0.51, 0.72], [750, 0]);
    rotate = useTransform(scrollYProgress, [0.51, 0.64, 0.72], [initialRotate * 1.3, initialRotate, 0]);
    x = useTransform(scrollYProgress, [0.51, 0.64, 0.72], [initialX * 1.3, initialX, 0]);
  } else if (index === 4) {
    opacity = useTransform(scrollYProgress, [0.73, 0.81], [0, 1]);
    y = useTransform(scrollYProgress, [0.74, 0.95], [750, 0]);
    rotate = useTransform(scrollYProgress, [0.74, 0.87, 0.95], [initialRotate * 1.3, initialRotate, 0]);
    x = useTransform(scrollYProgress, [0.74, 0.87, 0.95], [initialX * 1.3, initialX, 0]);
  }

  return (
    <motion.article
      style={{
        y,
        rotate,
        x,
        opacity,
        zIndex: (index + 1) * 10,
        transformOrigin: 'center center',
      }}
      className={`absolute inset-0 w-full h-full flex flex-col justify-between rounded-3xl p-6 sm:p-7 will-change-transform transition-colors duration-200 ${
        isAccent
          ? 'bg-[#ea0044] border border-white/20'
          : 'bg-[#111111] border border-white/10 hover:border-white/20'
      }`}
    >
      {/* Top Banner / Pill Accent indicating service category */}
      <div
        className={`flex items-center justify-between gap-4 border-b pb-3.5 sm:pb-4 ${
          isAccent ? 'border-white/20' : 'border-white/[0.07]'
        }`}
      >
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[12px] font-semibold tracking-wider uppercase ${
            isAccent
              ? 'border border-white/40 bg-white/15 text-white'
              : 'border border-[#ea0044]/30 bg-[#ea0044]/10 text-[#ea0044]'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isAccent ? 'bg-white' : 'bg-[#ea0044]'
            }`}
          />
          <span>{card.category}</span>
        </div>

        <div className="flex items-center gap-2.5">
          {card.iconType === 'strategy' ? (
            <StrategyIcon
              className={`h-5 w-5 sm:h-6 sm:w-6 ${isAccent ? 'text-white' : 'text-[#ea0044]'}`}
            />
          ) : (
            <GeometricShapesIcon
              className={`h-5 w-5 sm:h-6 sm:w-6 ${isAccent ? 'text-white' : 'text-white/70'}`}
            />
          )}
          <span
            className={`text-[13px] font-mono font-bold ${
              isAccent ? 'text-white/80' : 'text-neutral-500'
            }`}
          >
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="my-auto py-2">
        <h3 className="font-space text-[1.6rem] sm:text-[1.95rem] font-bold tracking-tight text-white leading-tight">
          {card.title}
        </h3>
        <p
          className={`mt-2.5 text-[0.98rem] sm:text-[1.05rem] leading-[1.6] font-normal max-w-xl ${
            isAccent ? 'text-white/95' : 'text-neutral-400'
          }`}
        >
          {card.description}
        </p>
      </div>

      {/* Bottom Pill Tags */}
      <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 pt-1">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
              isAccent
                ? 'border border-white/40 bg-[#ba0036] text-white hover:border-white/60 hover:bg-[#a50030]'
                : 'border border-white/10 bg-white/5 text-neutral-300 hover:border-white/25 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* --- Main Services Section --- */
export default function ServicesSection() {
  const { services } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);

  // Link scroll progress of the entire section track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out discrete scroll wheel notches into fluid cinematic motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // Merge portfolio.json services with default card configs
  const cards: CardConfig[] = defaultCards.map((defaultCard, idx) => {
    const matchedService = services[idx];
    if (matchedService) {
      return {
        ...defaultCard,
        title: matchedService.title || defaultCard.title,
        description: matchedService.description || defaultCard.description,
        tags: matchedService.tags?.length ? matchedService.tags : defaultCard.tags,
      };
    }
    return defaultCard;
  });

  return (
    <section id="services" ref={containerRef} className="relative w-full text-white min-h-[290vh]">
      {/* Sticky Viewport Container */}
      <div className="site-container sticky top-28 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky heading & tools (scaled by 20%) */}
          <div className="lg:col-span-5 self-start">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-space text-[2.2rem] sm:text-[2.85rem] lg:text-[3.25rem] xl:text-[3.45rem] leading-[1.08] font-bold tracking-[-0.04em] text-white"
            >
              What I help
              <span className="mt-1.5 sm:mt-2 block whitespace-nowrap">
                you to <span className="text-[#ea0044]">Shape...</span>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 sm:mt-6 text-[1rem] sm:text-[1.06rem] lg:text-[1.1rem] leading-[1.6] text-neutral-400 max-w-[490px]"
            >
              From discovery and brand architecture to intuitive user interfaces and striking visual assets, I craft comprehensive systems tailored for growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 sm:mt-10"
            >
              <div className="mb-5 text-[1.14rem] sm:text-[1.2rem] font-medium text-neutral-400">
                Tools that I use
              </div>

              {/* Tools Badges Row (scaled by 20%) */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 overflow-visible">
                {toolsList.map((tool, idx) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 14, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.04, ease: 'easeOut' }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="group relative flex h-[48px] w-[48px] sm:h-[53px] sm:w-[53px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#161616] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 hover:border-white/25 hover:bg-[#1f1f1f]"
                  >
                    {/* Tooltip */}
                    <span className="pointer-events-none absolute -top-10 left-1/2 z-30 -translate-x-1/2 rounded-md bg-[#ea0044] px-3 py-1.5 text-[13px] font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 whitespace-nowrap">
                      {tool.name}
                    </span>

                    {tool.type === 'image' && tool.src ? (
                      <img
                        src={tool.src}
                        alt={tool.name}
                        className="h-[26px] w-[26px] sm:h-[29px] sm:w-[29px] object-contain"
                      />
                    ) : tool.icon ? (
                      tool.icon()
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Multi-card stacked deck container (chained aspect-ratio scale) */}
          <div className="lg:col-span-7 relative w-full max-w-[490px] h-[352px] sm:h-[370px] aspect-[490/370] lg:ml-auto">
            {cards.map((card, index) => (
              <StackedServiceCard
                key={card.id}
                card={card}
                index={index}
                scrollYProgress={smoothProgress}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
