import { useEffect, useRef, useState, type ReactNode, type HTMLAttributes } from 'react';

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  strength?: number;
  maxOffset?: number;
  influenceRadius?: number;
  smoothing?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  innerClassName?: string;
}

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  strength = 2,
  maxOffset = 24,
  influenceRadius = 640,
  smoothing = 0.09,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  className = '',
  innerClassName = '',
  style,
  ...props
}: MagnetProps) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let animationFrame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const influence = Math.min(1, distance / influenceRadius);
      const easedInfluence = influence * influence * (3 - 2 * influence);
      const directionX = distance > 0 ? deltaX / distance : 0;
      const directionY = distance > 0 ? deltaY / distance : 0;

      target.x = directionX * maxOffset * easedInfluence;
      target.y = directionY * maxOffset * easedInfluence;
      setIsActive(distance > 0);
    };

    const animate = () => {
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;
      setPosition({ x: current.x, y: current.y });
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [disabled, influenceRadius, maxOffset, padding, smoothing, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
