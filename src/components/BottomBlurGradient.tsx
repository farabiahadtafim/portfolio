/**
 * Progressive Gradient Backdrop Blur Overlay
 * Fixed at the bottom of the viewport (identical to Framer / ruchitdesigns.framer.website).
 * Uses multi-layered backdrop filters with linear gradient masks to smoothly blur
 * content as it enters or leaves the bottom of the screen.
 * Hardware-accelerated on GPU compositor layer.
 */
export default function BottomBlurGradient() {
  const gpuLayerStyle: React.CSSProperties = {
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    willChange: 'transform',
  };

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-0 w-full h-[16vh] sm:h-[19vh] max-h-[195px] pointer-events-none z-30 overflow-hidden"
      style={gpuLayerStyle}
    >
      {/* 8-stage progressive optical blur stack with GPU compositing */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={gpuLayerStyle}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...gpuLayerStyle,
            zIndex: 1,
            backdropFilter: 'blur(0.1px)',
            WebkitBackdropFilter: 'blur(0.1px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...gpuLayerStyle,
            zIndex: 2,
            backdropFilter: 'blur(0.25px)',
            WebkitBackdropFilter: 'blur(0.25px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...gpuLayerStyle,
            zIndex: 3,
            backdropFilter: 'blur(0.5px)',
            WebkitBackdropFilter: 'blur(0.5px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...gpuLayerStyle,
            zIndex: 4,
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...gpuLayerStyle,
            zIndex: 5,
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...gpuLayerStyle,
            zIndex: 6,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 1) 75%, rgba(0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 1) 75%, rgba(0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...gpuLayerStyle,
            zIndex: 7,
            backdropFilter: 'blur(7px)',
            WebkitBackdropFilter: 'blur(7px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...gpuLayerStyle,
            zIndex: 8,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 1) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 1) 100%)',
          }}
        />
      </div>

      {/* Subtle bottom tone blending layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          ...gpuLayerStyle,
          zIndex: 9,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(12, 12, 14, 0.15) 60%, rgba(12, 12, 14, 0.5) 100%)',
        }}
      />
    </div>
  );
}
