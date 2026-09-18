import { motion } from 'framer-motion';
import { getAssetUrl } from '../utils/asset';

export default function WorkHeroSection() {
  const mainImageUrl = getAssetUrl('/image/Portfolio-Page-Main-Image.webp');
  const typographySvgUrl = getAssetUrl('/image/SVG/Portfolio Typography.svg');

  return (
    <section
      id="portfolio-hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1200px] bg-[#141316] flex flex-col items-center justify-end overflow-hidden select-none"
      style={{
        minHeight: '100vh',
        backgroundColor: '#141316',
      }}
    >
      {/* =========================================================================
          LAYER 1 (Bottom / Background Glow - z-10)
          Soft radial pure red glow centered directly behind the subject's upper body
          ========================================================================= */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.95, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[180px] sm:mt-[210px] md:mt-[240px] w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[680px] md:h-[680px] lg:w-[800px] lg:h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, #ff0000 0%, rgba(255, 0, 0, 0.6) 38%, rgba(20, 19, 22, 0) 72%)',
            filter: 'blur(75px)',
            WebkitFilter: 'blur(75px)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* =========================================================================
          LAYER 2 (Middle - z-20)
          Typography SVG ("PORTFOLIO") placed over the glow and behind the subject
          Positioned clearly below the navbar so it remains completely readable
          ========================================================================= */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-20 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[85px] sm:mt-[95px] md:mt-[105px] w-[94%] sm:w-[90%] md:w-[86%] lg:w-[82%] max-w-[1450px] flex justify-center"
        >
          <img
            src={typographySvgUrl}
            alt="PORTFOLIO"
            className="w-full h-auto object-contain select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </motion.div>
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
        className="relative z-30 w-full h-full flex items-end justify-center pointer-events-none pt-[70px] sm:pt-[80px]"
      >
        <img
          src={mainImageUrl}
          alt="Farabi Ahad Tafim Portfolio"
          className="w-full h-full object-cover object-top select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>

      {/* Seamless bottom transition into the projects section below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 pointer-events-none z-40 bg-gradient-to-t from-[#141316] via-[#141316]/50 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
