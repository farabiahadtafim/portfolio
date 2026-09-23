import React, { useMemo } from 'react';

interface MasonryGallerySectionProps {
  title: string;
  itemCount: number;
}

interface RatioConfig {
  ratio: '4:3' | '3:4' | '1:1';
  cssRatio: string;
  width: number;
  height: number;
}

const RATIO_CYCLE: RatioConfig[] = [
  { ratio: '3:4', cssRatio: '3 / 4', width: 450, height: 600 },
  { ratio: '1:1', cssRatio: '1 / 1', width: 500, height: 500 },
  { ratio: '4:3', cssRatio: '4 / 3', width: 600, height: 450 },
  { ratio: '3:4', cssRatio: '3 / 4', width: 450, height: 600 },
  { ratio: '1:1', cssRatio: '1 / 1', width: 500, height: 500 },
  { ratio: '3:4', cssRatio: '3 / 4', width: 450, height: 600 },
  { ratio: '4:3', cssRatio: '4 / 3', width: 600, height: 450 },
];

export default function MasonryGallerySection({ title, itemCount }: MasonryGallerySectionProps) {
  // Generate data with randomized Pinterest-style aspect ratios (4:3, 3:4, 1:1)
  const items = useMemo(() => {
    return Array.from({ length: itemCount }).map((_, i) => {
      // Deterministic ratio assignment so layout remains rock-solid and stable
      const config = RATIO_CYCLE[(i * 3 + (i % 5)) % RATIO_CYCLE.length];
      return {
        id: i,
        ratio: config.ratio,
        cssRatio: config.cssRatio,
        width: config.width,
        height: config.height,
        imageUrl: `https://placehold.co/${config.width}x${config.height}/1c1b20/FFF?text=Design+${i + 1}`,
      };
    });
  }, [itemCount]);

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-[#bb031c] mx-auto rounded-full"></div>
        </div>

        {/* Pinterest-style CSS Columns Masonry */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-6 relative group rounded-2xl overflow-hidden bg-[#1a191e]/90 border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#bb031c]/15"
              style={{
                aspectRatio: item.cssRatio,
                contentVisibility: 'auto',
                containIntrinsicSize: `300px ${Math.round(300 / (item.width / item.height))}px`,
              }}
            >
              <img
                src={item.imageUrl}
                alt={`${title} - Item ${item.id + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Optional overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-white font-medium tracking-wide">
                  View Project {item.id + 1}
                </span>
                <span className="text-[11px] text-white/50 font-mono mt-0.5">
                  Ratio {item.ratio}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
