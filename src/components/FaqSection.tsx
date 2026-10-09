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
  const categories = [
    'Process & Collaboration',
    'Services & Capabilities',
    'Pricing & Timeline',
    'Deliverables & Files'
  ];
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setOpenIndex(0);
  };

  const getCategoryForFaq = (question: string) => {
    const tabsMap: Record<string, string[]> = {
      'Services & Capabilities': [
        'What packaging formats do you design?',
        'Do you design the whole packaging or only the front label?',
        'Can you create the packaging concept from scratch?',
        'What if I already have a logo and brand identity?',
        "What if I don't have a brand identity yet?",
        'Do you have experience with international packaging markets?',
        'Do you have experience with supplement and nutrition packaging?',
        'Can you design FDA-compliant packaging?',
        'Can you design multiple flavors/SKUs under the same packaging system?',
        'Can you redesign an existing package instead of starting from scratch?',
        'Can you create packaging for Amazon/FBA products?'
      ],
      'Process & Collaboration': [
        'How do we get started?',
        'What information do you need before starting a packaging project?',
        'Can you create the packaging dieline?',
        'Can you work with an existing printer/manufacturer dieline?',
        'Can you help with the packaging copy and content?',
        'Can you work directly with my printer or manufacturer?',
        'Can you make revisions after I see the first concept?',
        "What happens if I don't have the physical product yet?",
        'Do you provide printing services?',
        'Can you help choose the right packaging material or printing finish?',
        'What if my printer rejects the artwork?',
        'Can you work with international clients remotely?',
        'How do you handle confidential product launches or unreleased brands?'
      ],
      'Deliverables & Files': [
        'Can you make the packaging print-ready?',
        'What files will I receive at the end?',
        'Will I receive the editable/source files?',
        'Do you provide 3D packaging mockups?',
        'Can you create realistic product images before the product is manufactured?'
      ],
      'Pricing & Timeline': [
        'How many packaging concepts will I receive?',
        'How long does a packaging project take?',
        'What do you need from me to give an accurate quote?'
      ]
    };

    const qLower = question.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    for (const [cat, qs] of Object.entries(tabsMap)) {
      if (qs.some(q => q.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === qLower)) {
        return cat;
      }
    }
    return 'Services & Capabilities'; // Fallback
  };

  const filteredFaqs = faqs.filter(faq => getCategoryForFaq(faq.question) === activeTab);

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

          {/* Tab Menu - 2x2 Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`w-full whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-center sm:text-left ${
                  activeTab === tab
                    ? 'bg-[#bb031c] text-white shadow-[0_0_15px_rgba(187,3,28,0.4)]'
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={faq.number}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
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
