import React from 'react';
import './Folder.css';

export type FolderVariant = 'mint' | 'lavender' | 'peach' | 'rose' | 'default';

interface FolderProps {
  className?: string;
  onClick?: () => void;
  title?: string;
  variant?: FolderVariant;
}

const renderTopRightBadge = (variant: string) => {
  const commonClasses = "w-[26px] h-[26px] opacity-90 drop-shadow-sm";
  const getMaskStyle = (url: string, color: string) => ({
    backgroundColor: color,
    WebkitMaskImage: `url(${url})`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskImage: `url(${url})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
  });

  switch (variant) {
    case 'mint':
      return <div className={commonClasses} style={getMaskStyle('/portfolio/image/SVG/Supplement.svg', '#2ba593')} />;
    case 'lavender':
      return <div className={commonClasses} style={getMaskStyle('/portfolio/image/SVG/box.svg', '#7c3aed')} />;
    case 'peach':
      return <div className={commonClasses} style={getMaskStyle('/portfolio/image/SVG/Can.svg', '#ea580c')} />;
    case 'rose':
      return <div className={commonClasses} style={getMaskStyle('/portfolio/image/SVG/pouch.svg', '#db2777')} />;
    default:
      return null;
  }
};

export default function Folder({ className = '', onClick, title = 'Supplement Label Design', variant = 'default' }: FolderProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const gallery =
        document.getElementById('work-gallery') ||
        document.querySelector('.masonry-gallery-container');
      if (gallery) {
        gallery.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`folder-container ${className}`} data-variant={variant}>
      {/* SVG Definitions for the Single Unified Tabbed Cutout & Specular Highlight */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="single-folder-flap-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.0462 0.8709 Q 0.0462 1, 0.1122 1 L 0.8877 1 Q 0.9538 1, 0.9538 0.8709 L 0.988 0.280 Q 0.990 0.220, 0.940 0.220 L 0.560 0.220 C 0.510 0.220, 0.490 0, 0.430 0 L 0.070 0 C 0.025 0, 0 0.035, 0.011 0.100 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className="folder-trigger"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Open portfolio project folder"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <div className="folder">
          {/* =========================================
            BACK SHAPE
            ========================================= */}
        <div className="folder__back">
          <div className="folder__back-shadow" />

          {/* =========================================
              PAPERS (Stepped document sheets inside)
              ========================================= */}
          <div className="paper-wrapper">
            <div className="paper paper--left">
              <img src="/portfolio/image/projects/Supplement%20Label/Title/1.%20Supplement%20Label.webp" alt="Work 1" />
            </div>
            <div className="paper paper--center">
              <img src="/portfolio/image/projects/Supplement%20Label/Title/2.%20Supplement%20Label.webp" alt="Work 2" />
            </div>
            <div className="paper paper--right">
              <img src="/portfolio/image/projects/Supplement%20Label/Title/3.%20Supplement%20Label.webp" alt="Work 3" />
            </div>
          </div>

          {/* =========================================
              FRONT SHAPE - ONE SINGLE SEAMLESS FLAP
              ========================================= */}
          <div className="folder__front-single">
            {/* SVG Specular Rim Highlight */}
            <svg 
              className="absolute bottom-0 z-30 pointer-events-none" 
              style={{ left: '0', width: '100%', height: '100%' }} 
              viewBox="0 0 1 1" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="glass-rim-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.75)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.35)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>
              </defs>
              <path 
                d="M 0.0462 0.8709 Q 0.0462 1, 0.1122 1 L 0.8877 1 Q 0.9538 1, 0.9538 0.8709 L 0.988 0.280 Q 0.990 0.220, 0.940 0.220 L 0.560 0.220 C 0.510 0.220, 0.490 0, 0.430 0 L 0.070 0 C 0.025 0, 0 0.035, 0.011 0.100 Z" 
                fill="none" 
                stroke="url(#glass-rim-gradient)" 
                strokeWidth="1.5" 
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            
            {/* Badge Icon */}
            <div className="absolute top-4 left-6 z-40 pointer-events-none">
              {renderTopRightBadge(variant)}
            </div>

            <div className="absolute bottom-5 left-6 flex flex-col text-left font-space z-40">
              <span className="font-bold text-white text-[13px] tracking-wide">{title}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="10 8 14 12 10 16"></polyline>
                </svg>
                <span className="text-[11px] font-medium text-white/80 tracking-wider">Farabi Ahad Tafim</span>
              </div>
            </div>
            
            {/* Pill Button */}
            <div className="folder__pill absolute bottom-5 right-6 flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md border border-white/20 text-white shadow-inner pointer-events-auto z-40 transition-colors duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </div>
          </div>


        </div>
        </div>
      </div>
    </div>
  );
}
