import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import { getAssetUrl } from '../utils/asset';

export default function TestimonialsSection() {
  const { testimonials } = usePortfolio();

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="py-24 overflow-hidden">
      <div className="site-container mb-12 sm:mb-16">
        {/* Header with Title on Left and Happy Clients Badge on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-space font-bold text-white tracking-tight leading-[1.08]"
            >
              Hear from what <br />
              <span className="text-[#bb031c]">clients have to say.</span>
            </motion.h2>
          </div>

          {/* Social Proof Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3.5 bg-[#17161b] border border-white/[0.08] px-4 py-2.5 rounded-full self-start md:self-auto shadow-lg"
          >
            {/* Overlapping Avatar Circles */}
            <div className="flex -space-x-2 overflow-hidden">
              {testimonials.slice(0, 4).map((item, idx) => (
                <img
                  key={idx}
                  src={getAssetUrl(item.avatar)}
                  alt={item.name}
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#17161b] object-cover"
                />
              ))}
            </div>

            {/* Stars & Count */}
            <div className="flex flex-col">
              <div className="flex text-[#bb031c] text-xs leading-none">
                {'★★★★★'}
              </div>
              <span className="text-[11px] font-semibold text-neutral-300 mt-0.5 whitespace-nowrap">
                99+ Happy clients
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] py-4">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[340px] sm:w-[380px] rounded-[28px] bg-[#141316] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between flex-shrink-0 hover:border-white/20 transition-all duration-300 group shadow-xl"
            >
              <div>
                {/* Double Quote Icon */}
                <div className="text-3xl text-white/20 font-serif leading-none mb-3 group-hover:text-[#bb031c]/40 transition-colors">
                  “
                </div>

                {/* Review Quote */}
                <p className="text-[0.93rem] sm:text-[0.98rem] text-neutral-300 leading-relaxed font-normal min-h-[72px]">
                  {item.quote}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                {/* 5 Red Stars */}
                <div className="flex text-[#bb031c] text-xs mb-3.5 tracking-wider">
                  {'★★★★★'}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  {item.avatar && (
                    <img
                      src={getAssetUrl(item.avatar)}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                    />
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

