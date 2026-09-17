import { usePortfolio } from '../hooks/usePortfolio';

export default function ExperienceSection() {
  const { workHistory } = usePortfolio();

  return (
    <section id="experience" className="site-container py-20">
      <h2 className="text-3xl sm:text-4xl font-space font-bold text-white mb-10">
        Experience
      </h2>
      <div className="space-y-4">
        {workHistory.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-5 rounded-2xl bg-[#141316] border border-white/5"
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">{item.company}</h3>
              <p className="text-xs sm:text-sm text-neutral-400">{item.role}</p>
            </div>
            <span className="text-xs font-medium text-neutral-400 bg-white/5 px-3 py-1 rounded-full">
              {item.period}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
