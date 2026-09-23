import React from 'react';
import './Folder.css';

interface FolderProps {
  className?: string;
  onClick?: () => void;
}

export default function Folder({ className = '', onClick }: FolderProps) {
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
    <div className={`folder-container ${className}`}>
      {/* SVG Definitions for the Single Unified Tabbed Cutout & Specular Highlight */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="single-folder-flap-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.070 0.930 Q 0.070 1, 0.140 1 L 0.860 1 Q 0.930 1, 0.930 0.930 L 0.985 0.280 Q 0.990 0.220, 0.940 0.220 L 0.560 0.220 C 0.510 0.220, 0.490 0, 0.430 0 L 0.070 0 C 0.025 0, 0 0.035, 0.010 0.100 Z" />
          </clipPath>

          <linearGradient id="rim-specular-single" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
            <stop offset="30%" stopColor="rgba(255, 255, 255, 0.75)" />
            <stop offset="55%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="85%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.35)" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="folder"
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
        {/* =========================================
            BACK SHAPE (#fb0000 vivid red back plate)
            ========================================= */}
        <div className="folder__back">
          <div className="folder__back-shadow" />

          {/* =========================================
              PAPERS (Stepped document sheets inside)
              Filled with full text lines like Image 2
              ========================================= */}
          <div className="paper-wrapper">
            {/* Sheet 1 (Left paper, tilted -4deg) */}
            <div className="paper">
              <div className="paper-line header" style={{ width: '48%' }} />
              <div className="flex flex-col gap-2 mb-2">
                <div className="paper-line" style={{ height: '6px', width: '88%' }} />
                <div className="paper-line" style={{ height: '6px', width: '74%' }} />
              </div>
              <div className="paper-content-bottom paper-grid">
                <div className="paper-line" style={{ height: '6px', width: '90%' }} />
                <div className="paper-line" style={{ height: '6px', width: '75%' }} />
                <div className="paper-line" style={{ height: '6px', width: '85%' }} />
                <div className="paper-line" style={{ height: '6px', width: '80%' }} />
                <div className="paper-line" style={{ height: '6px', width: '70%' }} />
                <div className="paper-line" style={{ height: '6px', width: '88%' }} />
                <div className="paper-line" style={{ height: '6px', width: '82%' }} />
                <div className="paper-line" style={{ height: '6px', width: '78%' }} />
              </div>
            </div>

            {/* Sheet 2 (Middle paper, upright) */}
            <div className="paper">
              <div className="paper-line header" style={{ width: '56%' }} />
              <div className="flex flex-col gap-2 mb-2">
                <div className="paper-line" style={{ height: '6px', width: '85%' }} />
                <div className="paper-line" style={{ height: '6px', width: '70%' }} />
              </div>
              <div className="paper-content-bottom flex flex-col gap-2">
                <div className="paper-line" style={{ height: '6px', width: '92%' }} />
                <div className="paper-line" style={{ height: '6px', width: '78%' }} />
                <div className="paper-line" style={{ height: '6px', width: '88%' }} />
                <div className="paper-line" style={{ height: '6px', width: '80%' }} />
                <div className="paper-line" style={{ height: '6px', width: '68%' }} />
                <div className="paper-line" style={{ height: '6px', width: '84%' }} />
              </div>
            </div>

            {/* Sheet 3 (Right paper, tilted +3.5deg) */}
            <div className="paper">
              <div className="paper-line header" style={{ width: '42%' }} />
              <div className="flex flex-col gap-2 mb-2">
                <div className="paper-line" style={{ height: '6px', width: '80%' }} />
              </div>
              <div className="paper-content-bottom flex flex-col gap-2">
                <div className="paper-line" style={{ height: '6px', width: '72%' }} />
                <div className="paper-line" style={{ height: '6px', width: '85%' }} />
                <div className="paper-line" style={{ height: '6px', width: '64%' }} />
                <div className="paper-line" style={{ height: '6px', width: '76%' }} />
              </div>
            </div>
          </div>

          {/* =========================================
              FRONT SHAPE - ONE SINGLE SEAMLESS FLAP
              Clip-path + backdrop-filter directly on self
              ========================================= */}
          <div className="folder__front-single" />

          {/* Specular outline rim along exact perimeter path */}
          <svg
            className="folder__front-rim"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 70 930 Q 70 1000, 140 1000 L 860 1000 Q 930 1000, 930 930 L 985 280 Q 990 220, 940 220 L 560 220 C 510 220, 490 0, 430 0 L 70 0 C 25 0, 0 35, 10 100 Z"
              fill="none"
              stroke="url(#rim-specular-single)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
