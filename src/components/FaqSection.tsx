import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Calendar } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { getAssetUrl } from '../utils/asset';


interface FaqSectionProps {
  onOpenContact?: () => void;
}

export default function FaqSection({ onOpenContact }: FaqSectionProps) {
  const { faqs } = usePortfolio();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="site-container py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: FAQs Header and Accordion List */}
        <div className="lg:col-span-7">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-space font-bold text-white tracking-tight leading-none mb-8 sm:mb-10"
          >
            FAQs
          </motion.h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={faq.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#17161b] border-white/20'
                      : 'bg-[#141316] border-white/[0.08] hover:border-white/15'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer gap-4"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <span className="text-xs sm:text-sm font-mono font-semibold text-neutral-400 flex-shrink-0">
                        {faq.number}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {faq.question}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white/70">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed pl-10 sm:pl-14 border-t border-white/[0.04]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Solid Red CTA Card matching Reference Site */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[32px] shadow-2xl relative overflow-hidden aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5]"
          >
            {/* Background Image */}
            <img 
              src={getAssetUrl("/image/Book-a-Call.webp")} 
              alt="Book a free discovery call" 
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay for Button Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* CTA Button at bottom left */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-7 z-10 flex items-center">
              <button
                type="button"
                onClick={onOpenContact}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141316] hover:bg-black text-white text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xl active:scale-95 border border-white/10 hover:border-white/20"
              >
                <Calendar className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-colors" />
                <span>Schedule Now</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
