import { Star } from 'lucide-react';
import { getAssetUrl } from '../utils/asset';

const clientProofAvatars = [
  '/Brand Identity & Packaging Designer Portfolio _ UI_UX Designer_files/ARmQOa71EvidN3oYWq9jWzn9OE.jpg',
  '/Brand Identity & Packaging Designer Portfolio _ UI_UX Designer_files/W7oQ4BScxWhGC5oVOzKGxVGAD4.jpg',
  '/Brand Identity & Packaging Designer Portfolio _ UI_UX Designer_files/UqrSyX3j0KDY0YY2JZCQuc7Wzzg.jpg',
  '/Brand Identity & Packaging Designer Portfolio _ UI_UX Designer_files/wFJgmAuVHn37SCJR5MDBtfbFdY.jpg',
  '/Brand Identity & Packaging Designer Portfolio _ UI_UX Designer_files/K6cUNifhQFa6qEX3kqNwfqMkiY.jpg',
];

// Import all SVGs dynamically
const logoModules = import.meta.glob('../../image/Brands Logo/*.svg', { eager: true });

// Extract, parse numbers from filenames, and sort
const sortedLogos = Object.entries(logoModules)
  .map(([path, mod]: [string, any]) => {
    const filename = path.split('/').pop() || '';
    const match = filename.match(/^(\d+)/);
    const num = match ? parseInt(match[1], 10) : 9999;
    return {
      src: mod.default || mod,
      num,
      name: filename.replace('.svg', ''),
    };
  })
  .sort((a, b) => a.num - b.num)
  .map((item) => item.src);

export default function MarqueeSection() {
  return (
    <div className="relative w-full h-[76px] border-y border-[#2b2b2b] bg-[#141316] flex items-center overflow-hidden select-none">
      <div className="site-container flex h-full min-w-0 items-center">
        {/* Pinned Left: 5 Overlapping Client Avatars + 5 Stars + 99+ Happy clients */}
        <div className="flex-shrink-0 z-20 h-full bg-[#141316] pr-6 sm:pr-10 flex items-center gap-4">
          {/* 5 Stacked Avatars with -8px overlap */}
          <div className="flex -space-x-2 overflow-hidden">
            {clientProofAvatars.map((avatar, idx) => (
              <img
                key={idx}
                src={getAssetUrl(avatar)}
                alt="Client"
                className="inline-block h-[32px] w-[32px] rounded-full ring-2 ring-[#141316] object-cover"
              />
            ))}
          </div>

          {/* 5 Red/Pink Stars + 99+ Happy clients */}
          <div className="flex flex-col justify-center">
            <div className="flex text-[#ea0044] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#ea0044] text-[#ea0044]" />
              ))}
            </div>
            <span className="text-[13px] sm:text-[14px] font-semibold text-white tracking-tight whitespace-nowrap mt-0.5 font-space">
              99+ Happy clients
            </span>
          </div>
        </div>

        {/* Right Side: Continuous Sliding Logo Marquee */}
        <div className="relative flex-1 overflow-hidden h-full flex items-center">
          {/* Subtle edge fades */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#141316] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#141316] to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="flex animate-marquee items-center gap-14 whitespace-nowrap">
            {[0, 1].map((key) => (
              <div key={key} className="flex items-center gap-14 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                {sortedLogos.map((logoUrl, idx) => (
                  <img
                    key={`${key}-${idx}`}
                    src={typeof logoUrl === 'string' ? logoUrl : (logoUrl as any).default || logoUrl}
                    alt={`Brand Logo ${idx + 1}`}
                    className="marquee-logo h-7 sm:h-8 w-auto object-contain"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
