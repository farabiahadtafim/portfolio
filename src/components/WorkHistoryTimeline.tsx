import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

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

const LeftFootprint = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 320 512" fill="currentColor">
    <path d="M128 0C92.6 0 64 28.6 64 64c0 32.3 24 59.8 55.4 63.6 22 2.7 40.6-14.7 40.6-36.4C160 38.8 141.2 0 128 0zM172.9 203.4c-16.1-5.1-33.8-3.3-48.4 4.8l-52.7 29.3c-23.5 13.1-39.8 36.4-43.8 63.5-6.9 46.1 23.3 88.5 69.1 97.4 30.6 6 62.3-5 82-29.2l40.1-49.3c16.3-20.1 21.6-47.5 13.7-71.9-4.8-14.9-15.4-27.4-29.4-35.1l-30.6-17.5z"/>
  </svg>
);
const RightFootprint = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 320 512" fill="currentColor">
    <path d="M192 0c35.4 0 64 28.6 64 64 0 32.3-24 59.8-55.4 63.6-22 2.7-40.6-14.7-40.6-36.4C160 38.8 178.8 0 192 0zM147.1 203.4c16.1-5.1 33.8-3.3 48.4 4.8l52.7 29.3c23.5 13.1 39.8 36.4 43.8 63.5 6.9 46.1-23.3 88.5-69.1 97.4-30.6 6-62.3-5-82-29.2l-40.1-49.3C84.5 299.8 79.2 272.4 87.1 248c4.8-14.9 15.4-27.4 29.4-35.1l30.6-17.5z"/>
  </svg>
);

export default function WorkHistoryTimeline() {
  const { workHistory } = usePortfolio();

  return (
    <div className="w-full max-w-5xl mx-auto mt-28 px-4 sm:px-0">
      <div className="text-center mb-16">
         <motion.h3 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-3xl sm:text-4xl font-space font-bold text-white mb-2"
         >
           My Work Journey
         </motion.h3>
         <motion.p
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="text-neutral-400 font-mono text-sm"
         >
           5+ Years Experience
         </motion.p>
      </div>

      <div className="relative flex flex-col items-center">
        {workHistory.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isLast = index === workHistory.length - 1;

          return (
            <div key={index} className="relative w-full flex justify-center mb-32 sm:mb-40">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className={`w-full sm:w-[45%] flex flex-col ${isLeft ? 'sm:mr-auto' : 'sm:ml-auto'}`}
              >
                <div className="rounded-2xl bg-[#141316] border border-white/[0.08] p-6 sm:p-8 hover:border-white/20 transition-all relative z-10 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <h5 className="text-xl sm:text-2xl font-bold font-space text-white tracking-tight group-hover:text-[#bb031c] transition-colors">
                        {item.company}
                      </h5>
                      <p className="text-sm text-neutral-300 font-medium mt-1">
                        {item.role} {item.location && <span className="text-neutral-500 font-normal">· {item.location}</span>}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 shrink-0">
                      {item.period}
                    </span>
                  </div>
                  
                  {item.description && (
                    <div className="mt-4 text-sm text-neutral-400 leading-relaxed border-t border-white/[0.05] pt-4 whitespace-pre-wrap">
                      {renderBold(item.description)}
                    </div>
                  )}
                  {item.proofLine && (
                    <div className="mt-5 text-xs text-[#bb031c] font-mono tracking-wide font-medium bg-[#bb031c]/10 px-3 py-2 rounded-lg">
                      {item.proofLine}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Connecting Path (Only show on sm+ screens) */}
              {!isLast && (
                <div className="hidden sm:block absolute top-[100%] left-0 w-full h-40 z-0 pointer-events-none">
                  {/* The Dashed Path */}
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      d={isLeft 
                        ? "M 22.5 0 C 22.5 60, 77.5 40, 77.5 100" 
                        : "M 77.5 0 C 77.5 60, 22.5 40, 22.5 100"}
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  </svg>

                  {/* Footprints (HTML overlaid) */}
                  <div className="absolute inset-0">
                     {/* Step 1 */}
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.5 }} 
                       whileInView={{ opacity: 1, scale: 1 }} 
                       transition={{ delay: 0.6 }} 
                       viewport={{ once: true, margin: "-100px" }}
                       className="absolute w-5 h-5 text-[#bb031c]"
                       style={{ 
                         left: isLeft ? '35%' : '65%', 
                         top: '25%', 
                         transform: `translate(-50%, -50%) rotate(${isLeft ? 60 : -60}deg)` 
                       }}
                     >
                       {isLeft ? <RightFootprint /> : <LeftFootprint />}
                     </motion.div>
                     
                     {/* Step 2 */}
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.5 }} 
                       whileInView={{ opacity: 1, scale: 1 }} 
                       transition={{ delay: 0.9 }} 
                       viewport={{ once: true, margin: "-100px" }}
                       className="absolute w-5 h-5 text-[#bb031c]"
                       style={{ 
                         left: '50%', 
                         top: '50%', 
                         transform: `translate(-50%, -50%) rotate(${isLeft ? 80 : -80}deg)` 
                       }}
                     >
                       {isLeft ? <LeftFootprint /> : <RightFootprint />}
                     </motion.div>

                     {/* Step 3 */}
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.5 }} 
                       whileInView={{ opacity: 1, scale: 1 }} 
                       transition={{ delay: 1.2 }} 
                       viewport={{ once: true, margin: "-100px" }}
                       className="absolute w-5 h-5 text-[#bb031c]"
                       style={{ 
                         left: isLeft ? '65%' : '35%', 
                         top: '75%', 
                         transform: `translate(-50%, -50%) rotate(${isLeft ? 45 : -45}deg)` 
                       }}
                     >
                       {isLeft ? <RightFootprint /> : <LeftFootprint />}
                     </motion.div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
