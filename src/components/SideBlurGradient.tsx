/**
 * Progressive Gradient Backdrop Blur Overlay for Left and Right sides.
 * Creates a smooth optical depth-of-field effect at the edges of the 3D carousel.
 */
export default function SideBlurGradient() {
  return (
    <>
      {/* Left Blur */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-[25vw] max-w-[400px] pointer-events-none z-30 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 2,
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 3,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 4,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 5,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%)',
            }}
          />
        </div>
        {/* Subtle left tone blending layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 9,
            background: 'linear-gradient(to right, rgba(12, 12, 14, 0.2) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Right Blur */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-full w-[25vw] max-w-[400px] pointer-events-none z-30 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 2,
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 3,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 4,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 5,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%)',
            }}
          />
        </div>
        {/* Subtle right tone blending layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 9,
            background: 'linear-gradient(to left, rgba(12, 12, 14, 0.2) 0%, transparent 100%)',
          }}
        />
      </div>
    </>
  );
}
