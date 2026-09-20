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

    const getBgPos = (i: number) => {
      const rotY = (gsap.getProperty(ring, 'rotationY') as number) || 0;
      return (
        -gsap.utils.wrap(0, 360, rotY - 180 - i * 36) / 360 * 400 + 'px 0px'
      );
    };

    const getCardBgImage = (i: number) => {
      if (activeProjects.length > 0) {
        const proj = activeProjects[i % activeProjects.length];
        if (proj?.image_url) {
          return `url(${getAssetUrl(proj.image_url)})`;
        }
      }
      return `url(https://picsum.photos/id/${i + 32}/700/300/)`;
    };

    let xPos = 0;

    const ctx = gsap.context(() => {
      gsap.timeline()
        .set(dragger, { opacity: 0 })
        .set(ring, { rotationY: 180 })
        .set(imgElements, {
          rotateY: (i: number) => i * -36,
          transformOrigin: '50% 50% 500px',
          z: -500,
          backgroundImage: (i: number) => getCardBgImage(i),
          backgroundPosition: (i: number) => getBgPos(i),
          backfaceVisibility: 'hidden',
        })
        .from(imgElements, {
          duration: 1.5,
          y: 200,
          opacity: 0,
          stagger: 0.1,
          ease: 'expo',
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
            onUpdate: () => {
              gsap.set(imgElements, {
                backgroundPosition: (i: number) => getBgPos(i),
              });
            },
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
    <section className="relative w-full pb-12 sm:pb-20 overflow-hidden bg-transparent">
      {/* Title Header */}
      <div className="site-container relative z-10 pointer-events-none mb-6 text-center pt-8 sm:pt-14">
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
      <div ref={wrapperRef} className="showcase-ring-wrapper">
        <div className="container ring-container">
          <div id="ring" ref={ringRef}>
            <div className="img" />
            <div className="img" />
            <div className="img" />
            <div className="img" />
            <div className="img" />
            <div className="img" />
            <div className="img" />
            <div className="img" />
            <div className="img" />
            <div className="img" />
          </div>
        </div>
        <div className="vignette" />
        <div id="dragger" ref={draggerRef} />
      </div>
    </section>
  );
}
