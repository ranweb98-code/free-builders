import { useRef, useEffect, useLayoutEffect, useState, useMemo } from 'react';
import './CurvedLoop.css';

const PATH_ID = 'curved-loop-path';

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const offsetRef = useRef(0);
  const [spacing, setSpacing] = useState(0);
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;
  const ready = spacing > 0;

  const viewBoxRect = useMemo(() => {
    const maxY = 40 + curveAmount / 2;
    const h = Math.ceil(maxY + 40);
    const w = 1680;
    return { x: -120, y: -20, w, h };
  }, [curveAmount]);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;

  const measureSpacing = () => {
    const el = measureRef.current;
    if (!el || !text.trim()) return;
    let len = 0;
    try {
      len = el.getComputedTextLength();
    } catch {
      len = 0;
    }
    if (len > 0) {
      setSpacing(len);
      return;
    }
    setSpacing(Math.max(120, text.length * 14));
  };

  useLayoutEffect(() => {
    measureSpacing();
  }, [text, className]);

  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) measureSpacing();
    });
    return () => {
      cancelled = true;
    };
  }, [text, className]);

  useEffect(() => {
    const onResize = () => measureSpacing();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [text, className]);

  useLayoutEffect(() => {
    if (!spacing) return;
    const tp = textPathRef.current;
    if (!tp) return;
    const initial = -spacing;
    offsetRef.current = initial;
    tp.setAttribute('startOffset', `${initial}px`);
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      const tp = textPathRef.current;
      if (!tp) {
        frame = requestAnimationFrame(step);
        return;
      }
      if (!dragRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        let newOffset = offsetRef.current + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        offsetRef.current = newOffset;
        tp.setAttribute('startOffset', `${newOffset}px`);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const tp = textPathRef.current;
    let newOffset = offsetRef.current + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    offsetRef.current = newOffset;
    tp.setAttribute('startOffset', `${newOffset}px`);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  const vb = `${viewBoxRect.x} ${viewBoxRect.y} ${viewBoxRect.w} ${viewBoxRect.h}`;

  return (
    <div
      className="curved-loop-jacket"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <span className="curved-loop-font-preload" aria-hidden="true">
        {marqueeText}
      </span>
      <svg
        className="curved-loop-svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={vb}
        preserveAspectRatio="xMidYMid meet"
        style={{
          aspectRatio: `${viewBoxRect.w} / ${viewBoxRect.h}`,
        }}
        aria-hidden="true"
      >
        <text
          ref={measureRef}
          direction="rtl"
          x="0"
          y="60"
          fill="white"
          xmlSpace="preserve"
          className={className}
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={PATH_ID} d={pathD} fill="none" />
        </defs>
        {ready && (
          <text
            direction="rtl"
            fill="white"
            fontWeight="bold"
            xmlSpace="preserve"
            className={className}
          >
            <textPath ref={textPathRef} href={`#${PATH_ID}`} xlinkHref={`#${PATH_ID}`}>
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
