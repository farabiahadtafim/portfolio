import React, { useMemo } from 'react';

interface MasonryGallerySectionProps {
  title: string;
  itemCount: number;
}

export default function MasonryGallerySection({ title, itemCount }: MasonryGallerySectionProps) {
  // Generate dummy data with random heights for the masonry effect
  const items = useMemo(() => {
    const heights = [300, 400, 500, 600]; // varied heights for pinterest look
    return Array.from({ length: itemCount }).map((_, i) => {
      // Deterministic random height based on index so it doesn't jump on re-render
      const height = heights[(i * 7 + 13) % heights.length];
      return {
        id: i,
        height,
        // using placehold.co to avoid broken images if picsum is slow
        imageUrl: `https://placehold.co/400x${height}/1a1a1a/FFF?text=Design+${i + 1}`,
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

        {/* CSS Columns Masonry */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-[#1a191e]/80 border border-white/5 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#bb031c]/10"
              style={{
                minHeight: `${item.height}px`,
                contentVisibility: 'auto',
                containIntrinsicSize: '300px 400px',
              }}
            >
              <img
                src={item.imageUrl}
                alt={`${title} - Item ${item.id + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Optional overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium tracking-wide">
                  View Project {item.id + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
