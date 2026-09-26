import { useEffect, useState, useRef } from 'react';
import './Loader.css';
import DeadlineUI from './DeadlineUI';

export default function Loader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const isFirstVisitRef = useRef(!sessionStorage.getItem('hasVisitedPortfolio'));

  useEffect(() => {
    if (isFirstVisitRef.current) {
      sessionStorage.setItem('hasVisitedPortfolio', 'true');
    }

    let currentProgress = 0;
    let isReadyToComplete = false;
    const minLoadTime = isFirstVisitRef.current ? 4000 : 1200; // 4s for first visit, 1.2s for others
    const startTime = Date.now();

    const handleWindowLoad = () => {
      isReadyToComplete = true;
    };

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (document.readyState === 'complete') {
      isReadyToComplete = true;
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let timeProgress = (elapsed / minLoadTime) * 100;
      
      if (isReadyToComplete && elapsed >= minLoadTime) {
        currentProgress += (100 - currentProgress) * 0.2; // Smoothly ease to 100
        if (currentProgress > 99.5) currentProgress = 100;
      } else {
        // If not ready or time hasn't passed, slowly approach 90%
        const targetProgress = isReadyToComplete ? 99 : Math.min(90, timeProgress);
        currentProgress += (targetProgress - currentProgress) * 0.1;
      }
      
      setProgress(Math.round(currentProgress));
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        
        // Force the page to start at top 0, ignoring any saved scroll or url hashes
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => setIsLoading(false), 1000);
        }, 300);
      }
    }, 30); // ~30 FPS

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className={`loading-wrapper ${isFadingOut ? 'hidden' : ''}`}>
          {isFirstVisitRef.current ? (
            <DeadlineUI />
          ) : (
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="loading">
                <div className="finger finger-1">
                  <div className="finger-item">
                    <span></span><i></i>
                  </div>
                </div>
              <div className="finger finger-2">
                <div className="finger-item">
                  <span></span><i></i>
                </div>
              </div>
              <div className="finger finger-3">
                <div className="finger-item">
                  <span></span><i></i>
                </div>
              </div>
              <div className="finger finger-4">
                <div className="finger-item">
                  <span></span><i></i>
                </div>
              </div>
              <div className="last-finger">
                <div className="last-finger-item"><i></i></div>
              </div>
            </div>
            
            <div className="w-48 flex flex-col gap-2">
              <div className="w-full h-1.5 bg-[#bb031c]/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-space text-white/50 tracking-widest font-semibold uppercase">
                <span>Loading</span>
                <span>{progress}%</span>
              </div>
            </div>
            </div>
          )}
        </div>
      )}
      {children}
    </>
  );
}
