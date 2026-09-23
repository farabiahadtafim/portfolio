import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { usePortfolioContent } from '../context/PortfolioContext';
import { getAssetUrl } from '../utils/asset';
import './ProjectShowcaseSection.css';

gsap.registerPlugin(Draggable);

export default function ProjectShowcaseSection() {
  const { projects } = usePortfolioContent();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const draggerRef = useRef<HTMLDivElement>(null);

  const activeProjects = projects?.filter((p) => p.is_active && p.image_url) || [];

  useEffect(() => {
    if (!wrapperRef.current || !ringRef.current || !draggerRef.current) return;

    const ring = ringRef.current;
    const dragger = draggerRef.current;
    const imgElements = wrapperRef.current.querySelectorAll('.img');

    const carouselImages = [
      '/image/projects/3D Carousel work page images/1. 3D Carousel.webp',
      '/image/projects/3D Carousel work page images/2. 3D Carousel.webp',
      '/image/projects/3D Carousel work page images/3. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/4. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/5. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/6. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/7. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/8. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/9. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/10. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/11. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/12. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/13. 3D Carouse.webp',
      '/image/projects/3D Carousel work page images/14. 3D Carouse.webp',
    ];

    const totalImages = carouselImages.length;
    const radius = Math.round((totalImages * 314) / (2 * Math.PI));
    const anglePerImage = 360 / totalImages;

    const getCardBgImage = (i: number) => {
      const path = carouselImages[i % carouselImages.length];
      return `url("${encodeURI(getAssetUrl(path))}")`;
    };

    let xPos = 0;

    const ctx = gsap.context(() => {
      gsap.timeline()
        .set(dragger, { opacity: 0 })
        .set(ring, { rotationY: 180 })
        .set(imgElements, {
          rotateY: (i: number) => i * -anglePerImage,
          transformOrigin: `50% 50% ${radius}px`,
          z: -radius,
          backgroundImage: (i: number) => getCardBgImage(i),
          backfaceVisibility: 'hidden',
        })
        .from(imgElements, {
          duration: 1.5,
          y: 100,
          opacity: 0,
          stagger: 0.02,
          ease: 'expo.out',
        });

      Draggable.create(dragger, {
        onDragStart: function (e: any) {
          let cx = e?.clientX;
          if (e?.touches && e.touches.length > 0) {
            cx = e.touches[0].clientX;
          } else if (this.pointerEvent?.clientX !== undefined) {
            cx = this.pointerEvent.clientX;
          }
          xPos = Math.round(cx ?? 0);
        },
        onDrag: function (e: any) {
          let cx = e?.clientX;
          if (e?.touches && e.touches.length > 0) {
            cx = e.touches[0].clientX;
          } else if (this.pointerEvent?.clientX !== undefined) {
            cx = this.pointerEvent.clientX;
          }

          const currentX = Math.round(cx ?? (xPos + (this.deltaX || 0)));
          const diff = (currentX - xPos) % 360;

          gsap.to(ring, {
            rotationY: '-=' + diff,
          });

          xPos = currentX;
        },
        onDragEnd: function () {
          gsap.set(dragger, { x: 0, y: 0 });
        },
      });
    }, wrapperRef);

    return () => {
      ctx.revert();
    };
  }, [activeProjects]);

  return (
    <section className="relative w-full pb-12 sm:pb-20 overflow-hidden bg-transparent -mt-[150px] pt-[150px]">
      {/* Title Header */}
      <div className="site-container relative z-10 pointer-events-none mb-6 text-center pt-8 sm:pt-14 mt-[200px]">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/80 drop-shadow-md"
        >
          Selected Works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-space font-bold text-white tracking-tight mt-2 drop-shadow-lg"
        >
          Project Showcase
        </motion.h2>
      </div>

      {/* 3D Cylindrical Ring Gallery */}
      <div ref={wrapperRef} className="showcase-ring-wrapper -mt-[150px]">
        <div className="container ring-container">
          <div id="ring" ref={ringRef}>
            {carouselImages.map((_, i) => (
              <div key={i} className="img" />
            ))}
          </div>
        </div>
        <div id="dragger" ref={draggerRef} />
      </div>
    </section>
  );
}
