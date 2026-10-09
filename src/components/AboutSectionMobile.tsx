import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import { getAssetUrl } from '../utils/asset';

function AnimatedCounter({ 
  value, 
  prefix = "", 
  suffix = "", 
  decimals = 0, 
  padZero = false 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  decimals?: number;
  padZero?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  
  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) {
            let formatted = v.toFixed(decimals);
            if (padZero && parseFloat(formatted) < 10) {
              formatted = formatted.padStart(2, '0');
            }
            ref.current.textContent = `${prefix}${formatted}${suffix}`;
          }
        }
      });
    }
  }, [isInView, value, prefix, suffix, decimals, padZero]);

  return <span ref={ref}>{prefix}{padZero ? "00" : "0"}{suffix}</span>;
}

function renderBold(text: string) {
  if (!text) return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-medium">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function AnimatedNameUnderPhoto({ name }: { name: string }) {
  const [weight, setWeight] = useState(300);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const period = 4500; // 4.5 seconds for complete smooth breathing cycle

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
    <div className="w-full mt-3 overflow-hidden select-none flex justify-center">
      <svg className="w-full h-auto" viewBox="0 0 1000 120" preserveAspectRatio="xMidYMid meet">
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="#bb031c"
          textLength="1000"
          lengthAdjust="spacing"
          style={{
            fontWeight: weight,
            fontVariationSettings: `'wght' ${weight}`,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '105px',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}
        >
          {name}
        </text>
      </svg>
    </div>
  );
}

/* Clean Social Icons for the Photo Pill Overlay */
function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function BehanceIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.084 0-5.625-3.301-5.625-6.494 0-4.193 2.502-6.506 5.864-6.506 3.99 0 5.409 3.018 5.097 6.446h-7.986c.037 2.254 1.493 3.554 3.42 3.554 1.83 0 2.748-1.006 3.003-1.892l1.328.892zm-7.697-5.516h4.945c-.066-1.533-.91-2.613-2.387-2.613-1.636 0-2.38 1.139-2.558 2.613zm-11.029-7.484h-5v16h5.814c3.045 0 5.186-1.541 5.186-4.521 0-1.921-1.077-3.238-2.625-3.805 1.272-.676 2.094-1.932 2.094-3.524 0-2.711-2.128-4.15-5.469-4.15zm-2 2.547h2.612c1.691 0 2.784.717 2.784 2.164 0 1.436-1.127 2.23-2.822 2.23h-2.574v-4.394zm0 6.643h2.951c1.884 0 3.049.805 3.049 2.457 0 1.699-1.258 2.557-3.088 2.557h-2.912v-5.014z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsappIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function LinktreeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.736 5.853l4.005-4.117 2.325 2.38-4.2 4.007h5.908v3.305h-5.937l4.229 4.108-2.325 2.38-4.005-4.117v7.974h-3.472v-7.974l-4.005 4.117-2.325-2.38 4.229-4.108h-5.938v-3.305h5.908l-4.2-4.007 2.325-2.38 4.005 4.117v-5.853h3.472v5.853z" />
    </svg>
  );
}

export default function AboutSection() {
  const { profile, workHistory } = usePortfolio();

  return (
    <section id="about" className="site-container py-24">
      {/* Section Title: Exactly matching reference */}
      <div className="mb-14 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-space font-bold text-white tracking-tight leading-[1.08]"
        >
          Designing experiences <br className="hidden sm:block" />
          <span className="text-[#bb031c]">that make sense.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Portrait Photo with bottom-right social pill & name/subtitle */}
        <div className="lg:col-span-5 flex flex-col relative">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative w-full aspect-[4/4.5] sm:aspect-[4/4.2] rounded-[32px] overflow-hidden bg-[#161519] border border-white/[0.08] shadow-2xl"
          >
            {/* Subtle ambient glow behind head */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#bb031c]/20 blur-[60px] rounded-full pointer-events-none" />

            {/* Side-Facing High-Res Portrait Photo */}
            <img
              src={getAssetUrl("/image/Farabi Ahad Tafim Side Facing.webp")}
              alt="Farabi Ahad Tafim"
              className="w-full h-full object-cover object-top relative z-10"
            />

            {/* Social Icons Overlay Pill (Bottom-Right) */}
            <div
              className="absolute bottom-4 right-4 z-20 flex flex-col items-center gap-3 px-2.5 py-4 rounded-full shadow-lg"
              style={{
                backgroundColor: 'rgba(130, 130, 130, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(184, 184, 184, 0.12)',
              }}
            >
              {profile.social.instagram && (
                <a
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-[#bb031c] hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              )}
              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-[#bb031c] hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              )}
              {profile.social.behance && (
                <a
                  href={profile.social.behance}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Behance"
                  className="text-[#bb031c] hover:text-white transition-colors"
                >
                  <BehanceIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              )}
              {profile.social.facebook && (
                <a
                  href={profile.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-[#bb031c] hover:text-white transition-colors"
                >
                  <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              )}
              {profile.social.whatsapp && (
                <a
                  href={profile.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="text-[#bb031c] hover:text-white transition-colors"
                >
                  <WhatsappIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              )}
              {profile.social.linktree && (
                <a
                  href={profile.social.linktree}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Linktree"
                  className="text-[#bb031c] hover:text-white transition-colors"
                >
                  <LinktreeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Animated Name Under Photo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <AnimatedNameUnderPhoto name={profile.name} />
          </motion.div>

          {/* Name & Subtitle below photo with Formal Name badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2"
          >
            <div className="flex justify-center w-full mb-3">
              {profile.formalName && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wide bg-white/[0.06] border border-white/10 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bb031c]" />
                  Formal Name: {profile.formalName}
                </span>
              )}
            </div>
            <div className="mt-1 flex flex-col gap-1.5">
              <p className="text-base sm:text-lg font-bold font-space text-white tracking-tight">
                Packaging & Brand Identity Designer
              </p>
              <p className="text-xs sm:text-[13px] font-normal text-neutral-400">
                Product Visualizer <span className="text-[#bb031c] font-bold mx-1.5">·</span> Commercial Packaging <span className="text-[#bb031c] font-bold mx-1.5">·</span> 3D Visualization
              </p>
              <div className="mt-0.5 text-[11px] lg:text-xs whitespace-nowrap text-neutral-400 font-mono leading-relaxed">
                <span>🌍 NY · UK · USA · CAN & International Markets</span>
              </div>
            </div>
          </motion.div>

          {/* Proof of Experience Block (Moved to Left Column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 py-6 border-y border-white/[0.08]"
          >
            <div>
              <h4 className="text-2xl sm:text-3xl font-space font-bold text-[#bb031c]">
                <AnimatedCounter value={5} padZero={true} suffix="+" />
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-300 font-medium mt-1 uppercase tracking-wider">Years Experience</p>
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-space font-bold text-[#bb031c]">
                <AnimatedCounter value={450} suffix="+" />
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-300 font-medium mt-1 uppercase tracking-wider">Global Clients</p>
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-space font-bold text-[#bb031c]">
                <AnimatedCounter value={37} prefix="$" suffix="K+" />
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-300 font-medium mt-1 uppercase tracking-wider">Project Value Delivered</p>
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-space font-bold text-[#bb031c]">
                <AnimatedCounter value={99.1} decimals={1} />
                <span className="text-lg sm:text-xl">%</span>
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-300 font-medium mt-1 uppercase tracking-wider">Project Success Rate</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-2xl sm:text-3xl font-space font-bold text-[#bb031c]">
                <AnimatedCounter value={4} padZero={true} suffix="+" />
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-300 font-medium mt-1 uppercase tracking-wider">Key Markets</p>
              <p className="text-[10px] text-neutral-500 mt-0.5 font-mono tracking-wide">UK · USA · Canada · International</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: 4 Bio Paragraphs + Red Handwritten Signature + My work history accordion */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Bio Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 text-[0.95rem] sm:text-[1.02rem] leading-[1.65] text-neutral-300 font-normal"
          >
            {profile.bioParagraphs?.map((paragraph, idx) => (
              <p key={idx}>{renderBold(paragraph)}</p>
            )) || (
                <>
                  <p>
                    I started my journey with visual and graphic design, exploring typography, layouts, and print production. Over the past 5+ years, I have specialized in commercial product packaging, beverage labels, cans, boxes, pouches, and comprehensive brand identities.
                  </p>
                  <p>
                    With time, my focus shifted from just making designs to communicating product value clearly and creating undeniable shelf impact. Every creative decision is grounded in visual hierarchy, market positioning, and print execution.
                  </p>
                  <p>
                    Experienced in taking projects from initial conceptualization through polished 3D mockups and commercially ready print artwork for international clients and consumer brands.
                  </p>
                  <p>
                    My goal is to continue delivering packaging and brand identity systems that are visually compelling, production-aware, and built for lasting commercial success.
                  </p>
                </>
              )}
          </motion.div>



          {/* Red Handwritten Signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-6 mb-8 select-none"
          >
            <img
              src={getAssetUrl("/image/SVG/Tafim Signature.svg")}
              alt="Farabi Ahad Signature"
              className="h-10 sm:h-12 -rotate-3 opacity-90 object-contain"
            />
          </motion.div>

          {/* My work history Sub-section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-2"
          >
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-2xl sm:text-3xl font-bold font-space text-white tracking-tight">
                My work history
              </h4>
              <span className="text-xs font-mono text-neutral-400">
                5+ Years Experience
              </span>
            </div>

            <div className="space-y-3 relative z-10">
              {workHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#141316] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all group relative"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h5 className="text-base sm:text-lg font-bold font-space text-white tracking-tight group-hover:text-[#bb031c] transition-colors">
                        {item.company}
                      </h5>
                      <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-0.5">
                        {item.role} {item.location && <span className="text-neutral-500 font-normal">· {item.location}</span>}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 shrink-0">
                      {item.period}
                    </span>
                  </div>
                  {item.description && (
                    <div className="mt-3 text-xs sm:text-[13px] text-neutral-400 leading-relaxed border-t border-white/[0.05] pt-3 whitespace-pre-wrap">
                      {renderBold(item.description)}
                    </div>
                  )}
                  {item.proofLine && (
                    <div className="mt-2.5 text-[11px] sm:text-xs text-[#bb031c] font-mono tracking-wide font-medium">
                      {item.proofLine}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
