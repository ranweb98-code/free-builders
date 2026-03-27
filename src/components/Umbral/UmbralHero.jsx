import { useCallback, useEffect, useRef, useState } from 'react';
import Umbral from './Umbral';

/**
 * Full-viewport UMBRAL at top; on scroll past one viewport height it becomes
 * a fixed z-index:-1 background with OrbitControls disabled.
 */
export default function UmbralHero() {
  const [pinned, setPinned] = useState(false);
  const heroHeightRef = useRef(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  const updatePinned = useCallback(() => {
    const h = heroHeightRef.current;
    const y = window.scrollY || document.documentElement.scrollTop;
    setPinned(y > h - 2);
  }, []);

  useEffect(() => {
    const onResize = () => {
      heroHeightRef.current = window.innerHeight;
      updatePinned();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', updatePinned, { passive: true });
    updatePinned();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', updatePinned);
    };
  }, [updatePinned]);

  return (
    <div className="relative z-0 h-[100vh] min-h-[100dvh] w-full shrink-0">
      <div
        className={
          pinned
            ? 'pointer-events-none fixed inset-0 z-[-1] h-[100vh] min-h-[100dvh] w-full'
            : 'absolute inset-0 h-full w-full'
        }
      >
        <Umbral controlsEnabled={!pinned} />
      </div>
    </div>
  );
}
