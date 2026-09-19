import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useScroll, useVelocity, useSpring } from 'framer-motion';

const CARDS = [
  { id: 1, color: 'bg-[#b8a6c9]', title: 'Lavender Vision' },
  { id: 2, color: 'bg-[#d7a56d]', title: 'Sand Gold Brand' },
  { id: 3, color: 'bg-[#5d8d9a]', title: 'Slate Teal Web' },
  { id: 4, color: 'bg-[#c96b57]', title: 'Terracotta App' },
  { id: 5, color: 'bg-[#8c9b6b]', title: 'Muted Olive UI' },
  { id: 6, color: 'bg-[#e29578]', title: 'Peach Layout' },
];

// 6 total sets for a robust infinite loop (36 cards total)
const TRACK_CARDS = [...CARDS, ...CARDS, ...CARDS, ...CARDS, ...CARDS, ...CARDS].map((c, i) => ({ ...c, uniqueId: `c-${i}` }));

const CARD_WIDTH = 280;
const CARD_HEIGHT = 420;
const CARD_GAP = 24;
const TOTAL_CARD_WIDTH = CARD_WIDTH + CARD_GAP;

// Safe loop boundaries
const SET_WIDTH = CARDS.length * TOTAL_CARD_WIDTH;
const WRAP_POINT_LEFT = -SET_WIDTH * 4; 
const WRAP_POINT_RIGHT = -SET_WIDTH * 2;
const WRAP_DISTANCE = SET_WIDTH * 2;
const INITIAL_X = -SET_WIDTH * 3; // Starts perfectly centered in the 36-card DOM

function MarqueeCard({ card, index, trackX }: { card: any, index: number, trackX: any }) {
  const baseX = index * TOTAL_CARD_WIDTH;
  const [screenWidth, setScreenWidth] = useState(1200);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const absoluteX = useTransform(trackX, (x) => (x as number) + baseX);

  const normalizedX = useTransform(absoluteX, (x) => {
    const center = screenWidth / 2;
    // X center of the card relative to screen center
    const offset = (x as number) + (CARD_WIDTH / 2) - center;
    let normalized = offset / center;
    // Clamp for extreme edges so they don't over-rotate out of bounds
    if (normalized < -2.5) normalized = -2.5;
    if (normalized > 2.5) normalized = 2.5;
    return normalized;
  });

  // Calculate curvature, depth, and scale
  const rotateY = useTransform(normalizedX, (v) => v * -28);
  const z = useTransform(normalizedX, (v) => Math.abs(v) * -180);
  const scale = useTransform(normalizedX, (v) => 1 - Math.abs(v) * 0.12);
  
  // Fade out cards at edges
  const opacity = useTransform(normalizedX, [-2.5, -1.5, -1, 0, 1, 1.5, 2.5], [0, 0.3, 0.65, 1, 0.65, 0.3, 0]);
  const brightness = useTransform(normalizedX, [-2.5, -1.5, -1, 0, 1, 1.5, 2.5], [0.3, 0.5, 0.7, 1, 0.7, 0.5, 0.3]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <motion.div
      className="relative flex-shrink-0"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        rotateY,
        scale,
        z,
        opacity,
        filter,
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
      }}
    >
      <div 
        className={`w-full h-full rounded-[26px] ${card.color} border border-white/10 shadow-2xl overflow-hidden cursor-pointer group flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.03] p-6 text-center`}
      >
        <span className="text-white/80 font-bold tracking-widest uppercase text-sm mix-blend-overlay">
          {card.title}
        </span>
        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/30 text-white font-medium text-sm drop-shadow-md shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            View Project
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectShowcaseSection() {
  const track1X = useMotionValue(INITIAL_X);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [3, 1, 3], { clamp: false });

  useAnimationFrame((t, delta) => {
    let moveBy = (delta / 1000) * 45 * velocityFactor.get();
    
    // Fallback constant speed when not scrolling
    if (Math.abs(velocityFactor.get()) < 1) {
      moveBy = (delta / 1000) * 45;
    }

    let newX1 = track1X.get() - moveBy;
    
    // Infinite loop snap
    if (newX1 <= WRAP_POINT_LEFT) {
      newX1 += WRAP_DISTANCE;
    } else if (newX1 >= WRAP_POINT_RIGHT) {
      newX1 -= WRAP_DISTANCE;
    }
    
    track1X.set(newX1);
  });

  const handlePan = (e: any, info: any) => {
    let newX1 = track1X.get() + info.delta.x;
    track1X.set(newX1);
  };

  return (
    <section className="relative w-full pb-24 sm:pb-32 overflow-hidden bg-transparent">
      <div className="site-container relative z-10 pointer-events-none mb-16 text-center pt-24 sm:pt-32">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/80 drop-shadow-md"
        >
          Selected Works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-space font-bold text-white tracking-tight mt-2 drop-shadow-lg"
        >
          Project Showcase
        </motion.h2>
      </div>

      <div 
        className="relative z-10 w-full cursor-grab active:cursor-grabbing pb-12 overflow-hidden"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
      >
        <motion.div 
          onPan={handlePan}
          className="w-full h-full flex items-center justify-start"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div 
            className="flex gap-[24px] w-max" 
            style={{ x: track1X, transformStyle: 'preserve-3d' }}
          >
            {TRACK_CARDS.map((card, idx) => (
              <MarqueeCard key={card.uniqueId} card={card} index={idx} trackX={track1X} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
