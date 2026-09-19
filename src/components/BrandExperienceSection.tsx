import React from 'react';
import { Instagram, Linkedin, MousePointer2, Sparkles } from 'lucide-react';

const BehanceIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.2 8.4h2.7c1.3 0 2.2.2 2.8.7.6.5.9 1.1.9 1.9 0 .8-.3 1.4-.9 1.9-.6.4-1.3.6-2.3.6H8.2V8.4zm0 6.9h3.1c1.4 0 2.4.3 3 .8.6.6.9 1.4.9 2.2 0 .9-.3 1.7-.9 2.3-.6.6-1.6.8-3 .8H8.2v-6.1zm-4.7 9h8.4c2.5 0 4.4-.6 5.8-1.7 1.4-1.1 2.1-2.7 2.1-4.7 0-1.5-.5-2.8-1.4-3.8-.9-.9-2.1-1.5-3.6-1.7 1.1-.3 2-.9 2.6-1.8.6-.9.9-2 .9-3.2 0-1.7-.6-3.1-1.9-4.1C15 2.6 13.1 2.1 10.7 2.1H3.5v22.2zM16.9 13c1 0 1.9.3 2.5 1 .6.7.9 1.6.9 2.7h-6.8c.1 1.2.4 2.1 1.1 2.6.7.6 1.5.9 2.6.9 1.4 0 2.5-.5 3.3-1.4l2 1.8c-1.2 1.4-3.1 2.1-5.6 2.1-2.4 0-4.2-.7-5.5-2.2-1.3-1.4-1.9-3.3-1.9-5.6 0-2.3.6-4.1 1.9-5.5 1.3-1.4 3-2.1 5.2-2.1 2.2 0 3.8.7 5.1 2 .1.2.2.3.3.4v-.1zm.1-3.6c-1 0-1.7.3-2.2.8-.5.5-.8 1.3-.9 2.2h6.1c0-1-.3-1.8-.8-2.3-.5-.5-1.2-.7-2.2-.7z"/>
    <path d="M14.6 5.8h4.8v1.6h-4.8z"/>
  </svg>
);

const DribbbleIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm8.47 9.87c-.02-.02-2.27-1.46-5.11-1.25.7 1.9 1.15 3.89 1.35 5.8 2.05-1.07 3.51-2.9 3.76-4.55zM12 20.5c-2.03 0-3.9-.71-5.38-1.88.58-1.57 2.76-6.68 7.37-7.79-.18-.46-.39-.92-.61-1.39-4.22 1.25-8.86 1.2-9.08 1.2-.06.58-.1 1.18-.1 1.78 0 4.7 3.8 8.5 8.5 8.5.8 0 1.58-.11 2.32-.31-.4-.95-1.01-2.44-1.68-4.05-1.24.49-2.58.74-3.95.74-.23 0-.46-.01-.69-.03 0 0 .52-1.79 3.3-3.17zM4.61 10.9c.28 0 4.13.06 7.9-1.01-1.47-2.55-3.08-4.73-3.21-4.91A8.476 8.476 0 0 0 4.61 10.9zm7.04-7.25c.16.22 1.78 2.45 3.19 5.06 2.3-.61 4.09-1.92 4.2-2-1.6-1.84-3.91-3.03-6.49-3.03-.3 0-.61.02-.9.04z"/>
  </svg>
);

export default function BrandExperienceSection() {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#141316] overflow-hidden flex flex-col font-sans">
      
      {/* 1. Background Atmosphere */}
      {/* Subtle Dark CSS Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />
      
      {/* Ambient Red Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#bb031c] rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#bb031c] rounded-full blur-[180px] opacity-15 pointer-events-none" />
      
      {/* Background Watermark Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[15vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          CREATIVE
        </h1>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col h-full flex-grow">
        
        {/* 2. Top Bar Details */}
        <div className="flex items-center w-full mb-20 sm:mb-32 mt-4">
          {/* Social Pill */}
          <div className="flex items-center gap-4 px-6 py-2.5 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full shadow-lg">
            <a href="#" className="text-white/60 hover:text-white transition-colors"><BehanceIcon size={18} /></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><DribbbleIcon size={18} /></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><Linkedin size={18} strokeWidth={1.5} /></a>
          </div>
          
          {/* Thin Divider & Brand Text */}
          <div className="flex-grow flex items-center ml-6 opacity-60">
            <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
            <span className="ml-4 text-xs font-mono text-white/50 tracking-widest uppercase whitespace-nowrap">
              Farabi Ahad Tafim © 2026
            </span>
          </div>
        </div>

        {/* Main Content Layout (Left side text, Right side floating tags) */}
        <div className="flex flex-col lg:flex-row w-full justify-between items-center relative mt-4">
          
          {/* LEFT SIDE: Typography & Headline */}
          <div className="w-full lg:w-[60%] flex flex-col relative z-20">
            
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 relative">
              Let's turn your <br className="hidden sm:block" />
              
              {/* 3. 3D Glass Badge [BRAND] */}
              <span className="inline-block relative mx-2 -rotate-6 hover:-rotate-2 transition-transform duration-500">
                <span className="absolute inset-0 bg-gradient-to-tr from-[#bb031c] to-[#ff4d4d] blur-xl opacity-40 rounded-full" />
                <span className="relative flex items-center px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-tr from-[#bb031c] to-[#ff4d4d]/90 backdrop-blur-xl border border-white/30 rounded-full shadow-[0_0_30px_rgba(187,3,28,0.5)]">
                  <span className="text-white text-4xl sm:text-5xl md:text-6xl font-black italic tracking-widest drop-shadow-md">
                    BRAND
                  </span>
                  <Sparkles className="absolute -top-3 -right-3 text-white w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                </span>
              </span>
              
              <br className="hidden sm:block" />
              into a{' '}
              <span className="bg-gradient-to-r from-white via-white to-[#bb031c] bg-clip-text text-transparent">
                visual experience.
              </span>
            </h2>

            {/* 4. Supporting Details & Interactive Elements */}
            <div className="relative mt-8 sm:mt-12 flex flex-col items-start">
              
              {/* Curved Arc Line & Hand Pointer */}
              <div className="absolute -top-6 sm:-top-8 right-10 sm:left-[60%] opacity-70 pointer-events-none hidden sm:block">
                <svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 58C30 20 80 5 178 15" stroke="url(#paint0_linear)" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="2" y1="58" x2="178" y2="15" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0"/>
                      <stop offset="0.5" stopColor="#bb031c"/>
                      <stop offset="1" stopColor="#ff4d4d"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-2 text-[#ff4d4d] animate-bounce">
                  <MousePointer2 size={24} fill="#bb031c" strokeWidth={1.5} className="drop-shadow-[0_0_8px_rgba(187,3,28,0.8)]" />
                </div>
              </div>

              {/* Bottom Micro Badge */}
              <div className="inline-flex items-center px-4 py-2 mt-12 sm:mt-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#bb031c] mr-3 animate-pulse" />
                <p className="text-sm sm:text-base text-white/70 font-medium">
                  Helping brands shine through impactful visuals.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: 5. Floating Keywords (Hidden on very small screens, integrated naturally on tablets/desktop) */}
          <div className="hidden md:flex w-full lg:w-[40%] h-[400px] relative mt-16 lg:mt-0 items-center justify-center pointer-events-none select-none">
            
            <div className="absolute top-[10%] right-[10%] rotate-12 opacity-40 blur-[1px]">
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)'}}>
                IDEAS
              </span>
            </div>

            <div className="absolute top-[40%] left-[5%] -rotate-6 opacity-80 z-10">
              <div className="px-6 py-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl">
                <span className="text-3xl font-medium text-white/90 tracking-wide">
                  Visuals
                </span>
              </div>
            </div>

            <div className="absolute bottom-[20%] right-[20%] rotate-3 opacity-60">
              <span className="text-5xl font-serif italic text-white/60 drop-shadow-2xl">
                Impact
              </span>
            </div>
            
            <div className="absolute top-[65%] left-[40%] -rotate-12 opacity-50 blur-[0.5px]">
              <div className="px-5 py-2 border border-[#bb031c]/30 bg-[#bb031c]/10 backdrop-blur-sm rounded-xl">
                <span className="text-2xl font-bold text-[#bb031c] tracking-widest uppercase">
                  Growth
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
