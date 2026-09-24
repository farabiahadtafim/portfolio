import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetUrl } from '../utils/asset';
import { usePortfolioContent } from '../context/PortfolioContext';

type TrailNodeType = 'standard' | 'framed' | 'typographyA' | 'typographyB';

type TrailNode = {
  id: number;
  x: number;
  y: number;
  imageIndex: number;
  type: TrailNodeType;
};

const mouseTrackImages = [
  '/image/projects/Mouse Track/Frame 1.webp',
  '/image/projects/Mouse Track/Frame 2.webp',
  '/image/projects/Mouse Track/Frame 3.webp',
  '/image/projects/Mouse Track/Frame 4.webp',
  '/image/projects/Mouse Track/Frame 5.webp',
  '/image/projects/Mouse Track/Frame 6.webp',
];

export default function WorkHeroSection() {
  const { settings } = usePortfolioContent();
  const mainImageUrl = settings.main_image_url?.startsWith('http') || settings.main_image_url?.startsWith('blob:')
    ? settings.main_image_url
    : getAssetUrl(settings.main_image_url || '/image/Portfolio-Page-Main-Image.webp');
  const typographySvgUrl = getAssetUrl('/image/SVG/Portfolio Typography.svg');

  // Trail state and refs
  const [trailNodes, setTrailNodes] = useState<TrailNode[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const spawnCountRef = useRef(0);
  const imageCountRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top; // Relative to the container

    // Check distance from last spawn
    if (lastPos.current) {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 75) return; // 75px threshold
    }

    spawnCountRef.current += 1;
    
    let nodeType: TrailNodeType = 'standard';
    // Every 3rd or 4th card, spawn a special one
    if (spawnCountRef.current % 4 === 0) {
      nodeType = 'typographyA';
    } else if (spawnCountRef.current % 3 === 0) {
      nodeType = 'typographyB';
    } else if (spawnCountRef.current % 5 === 0) {
      nodeType = 'framed';
    }
    
    let imageIndex = 0;
    if (nodeType === 'standard' || nodeType === 'framed') {
      imageIndex = imageCountRef.current % mouseTrackImages.length;
      imageCountRef.current += 1;
    }
    
    const newNode = { id: Date.now() + Math.random(), x, y, imageIndex, type: nodeType };
    lastPos.current = { x, y };

    setTrailNodes((prev) => {
      const updated = [...prev, newNode];
      // Limit to max 8 nodes for performance
      if (updated.length > 8) {
        return updated.slice(updated.length - 8);
      }
      return updated;
    });

    // Automatically remove this node after 800ms
    setTimeout(() => {
      setTrailNodes((prev) => prev.filter((node) => node.id !== newNode.id));
    }, 800);
  };

  const renderTrailCard = (node: TrailNode) => {
    if (node.type === 'typographyA') {
      return (
        <div className="w-[95px] h-[95px] sm:w-[105px] sm:h-[105px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl flex items-center justify-center pointer-events-none">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl sm:text-5xl font-sans font-medium text-white/70 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] blur-[0.5px]">A</span>
            <span className="text-4xl sm:text-5xl font-sans font-medium text-white/70 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] blur-[0.5px] ml-0.5">a</span>
          </div>
        </div>
      );
    }

    if (node.type === 'typographyB') {
      return (
        <div className="w-[95px] h-[95px] sm:w-[105px] sm:h-[105px] bg-gradient-to-tr from-[#ff0000]/30 via-[#ff0000]/10 to-[#141316]/60 backdrop-blur-md border border-[#ff0000]/20 shadow-lg rounded-2xl flex items-center justify-center pointer-events-none">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl sm:text-5xl font-serif italic text-white/90 drop-shadow-md">A</span>
            <span className="text-4xl sm:text-5xl font-serif italic text-white/90 drop-shadow-md ml-0.5">a</span>
          </div>
        </div>
      );
    }

    const imageUrl = getAssetUrl(mouseTrackImages[node.imageIndex]);
    
    if (node.type === 'framed') {
      return (
        <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl pointer-events-none">
          <img 
            src={imageUrl} 
            alt="Mouse Trail" 
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      );
    }

    return (
      <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md pointer-events-none overflow-hidden">
        <img 
          src={imageUrl} 
          alt="Mouse Trail" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  return (
    <div
      id="portfolio-hero-bg"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute top-0 left-0 w-full z-0 bg-[#141316] select-none"
    >
      {/* =========================================================================
          LAYER 1 (Bottom / Background Glow - z-10)
          Soft radial pure red glow centered directly behind the subject's upper body
          ========================================================================= */}
      <div className="absolute top-0 left-0 w-full h-[100vh] flex items-start justify-center pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.95, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[180px] sm:mt-[210px] md:mt-[240px] w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] md:w-[850px] md:h-[850px] lg:w-[1050px] lg:h-[1050px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, #ff0000 0%, rgba(255, 0, 0, 0.6) 38%, rgba(20, 19, 22, 0) 72%)',
            filter: 'blur(90px)',
            WebkitFilter: 'blur(90px)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* =========================================================================
          LAYER 2 (Middle - z-20)
          Typography SVG ("PORTFOLIO") placed over the glow and behind the subject
          Positioned clearly below the navbar so it remains completely readable
          ========================================================================= */}
      <div className="absolute top-0 left-0 w-full h-[100vh] flex items-start justify-center pointer-events-none z-20 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[85px] sm:mt-[95px] md:mt-[105px] w-[94%] sm:w-[90%] md:w-[86%] lg:w-[82%] max-w-[1450px] flex justify-center"
        >
          <div className="relative w-full flex justify-center">
            <img
              src={typographySvgUrl}
              alt="PORTFOLIO"
              className="w-full h-auto object-contain select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              draggable={false}
            />
            {/* Progressive Blur on Bottom 75% of Typography */}
            <div className="absolute bottom-0 left-0 w-full h-[75%] pointer-events-none">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backdropFilter: 'blur(0.5px)',
                  WebkitBackdropFilter: 'blur(0.5px)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backdropFilter: 'blur(1px)',
                  WebkitBackdropFilter: 'blur(1px)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backdropFilter: 'blur(2px)',
                  WebkitBackdropFilter: 'blur(2px)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backdropFilter: 'blur(3px)',
                  WebkitBackdropFilter: 'blur(3px)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          LAYER 2.5 (Trail Nodes - z-25)
          Rendered behind the foreground subject but in front of Typography
          ========================================================================= */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden" 
        style={{ zIndex: 25 }}
      >
        <AnimatePresence>
          {trailNodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
              className="absolute flex items-center justify-center pointer-events-none origin-center"
              style={{
                left: node.x,
                top: node.y,
                x: "-50%",
                y: "-50%",
              }}
            >
              {renderTrailCard(node)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          LAYER 3 (Foreground / Top - z-30)
          Main Visual Image ("Portfolio-Page-Main-Image.webp") FULL WIDTH across the screen,
          with the subject sitting on the hill overlapping the typography.
          Anchor to top with navbar clearance so the cap, glasses, and face are 100% visible.
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 w-full flex justify-center pointer-events-none pt-[70px] sm:pt-[80px]"
      >
        <img
          src={mainImageUrl}
          alt="Farabi Ahad Tafim Portfolio"
          className="w-full h-auto block object-top select-none pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 65%, rgba(0, 0, 0, 0.8) 78%, rgba(0, 0, 0, 0.3) 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, rgba(0, 0, 0, 0.8) 78%, rgba(0, 0, 0, 0.3) 90%, transparent 100%)',
          }}
          draggable={false}
        />

        {/* Smooth bottom gradient overlay blending into #141316 */}
        <div
          className="absolute bottom-0 left-0 w-full h-[250px] sm:h-[400px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(20, 19, 22, 0.2) 30%, rgba(20, 19, 22, 0.7) 70%, #141316 100%)',
          }}
        />
      </motion.div>

    </div>
  );
}
