import { useEffect, useRef } from 'react';

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function splitHeroWords() {
  document.querySelectorAll('.hero h1 .word').forEach((word) => {
    if (word.querySelector('.char')) return;
    const text = word.textContent;
    word.textContent = '';
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      word.appendChild(span);
    });
  });
}

function setupMagnetic(magneticEls, cursor, cleanupFns) {
  magneticEls.forEach((el) => {
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = 0.5;
      const moveX = (e.clientX - centerX) * dist;
      const moveY = (e.clientY - centerY) * dist;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      cursor.classList.add('magnet');
    };
    const leave = () => {
      el.style.transform = 'translate(0, 0)';
      cursor.classList.remove('magnet');
    };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    cleanupFns.push(() => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    });
  });
}

function setupHackerLinks(links, cleanupFns) {
  links.forEach((link) => {
    const original = link.dataset.text;
    if (!original) return;

    const handleEnter = (event) => {
      const target = event.currentTarget;
      let iter = 0;
      if (target._hackerInterval) clearInterval(target._hackerInterval);
      target._hackerInterval = setInterval(() => {
        target.innerText = original
          .split('')
          .map((l, i) => {
            if (i < iter) return original[i];
            return ALPHA[Math.floor(Math.random() * 26)];
          })
          .join('');
        if (iter >= original.length) {
          clearInterval(target._hackerInterval);
          target._hackerInterval = null;
        }
        iter += 1 / 3;
      }, 30);
    };

    const handleLeave = (e) => {
      const target = e.currentTarget;
      if (target._hackerInterval) clearInterval(target._hackerInterval);
      target._hackerInterval = null;
      target.innerText = original;
    };

    link.addEventListener('mouseenter', handleEnter);
    link.addEventListener('mouseleave', handleLeave);
    cleanupFns.push(() => {
      if (link._hackerInterval) clearInterval(link._hackerInterval);
      link.removeEventListener('mouseenter', handleEnter);
      link.removeEventListener('mouseleave', handleLeave);
    });
  });
}

/**
 * Hyper-Kinetic Brutalism template: cursor lerp, magnetic + magnet state, scroll skew,
 * nav scroll pill + 3D tilt, hacker nav links. Cleans up listeners and RAF on unmount.
 */
export function useBrutalEffects() {
  const cursorRef = useRef(null);
  const scrollContentRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const scrollContent = scrollContentRef.current;
    const nav = navRef.current;
    if (!cursor || !scrollContent || !nav) return undefined;

    const cleanupFns = [];
    splitHeroWords();

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    let lastScrollTop = window.scrollY;
    let skew = 0;

    let isScrolled = false;

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const onScroll = () => {
      const y = window.scrollY;
      if (y > 100) {
        if (!isScrolled) {
          nav.classList.add('scrolled');
          isScrolled = true;
        }
      } else if (isScrolled) {
        nav.classList.remove('scrolled');
        nav.style.transform = '';
        isScrolled = false;
      }
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isScrolled) return;
      const cx = window.innerWidth / 2;
      const cy = 100;
      const rx = (e.clientY - cy) * 0.02;
      const ry = (e.clientX - cx) * 0.02;
      nav.style.transform = `translateX(-50%) perspective(1000px) rotateX(${-clamp(rx, -10, 10)}deg) rotateY(${clamp(ry, -10, 10)}deg)`;
    };

    let rafId = 0;
    const loop = () => {
      cursorX = lerp(cursorX, mouseX, 0.15);
      cursorY = lerp(cursorY, mouseY, 0.15);
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

      const scrollTop = window.scrollY;
      const velocity = scrollTop - lastScrollTop;
      lastScrollTop = scrollTop;
      const maxSkew = 5.0;
      const speed = Math.min(Math.max(velocity * 0.1, -maxSkew), maxSkew);
      skew = lerp(skew, speed, 0.1);
      if (Math.abs(skew) > 0.01) {
        scrollContent.style.transform = `skewY(${skew}deg)`;
      } else {
        scrollContent.style.transform = 'skewY(0deg)';
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanupFns.push(() => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    });

    rafId = requestAnimationFrame(loop);

    onScroll();

    const magneticEls = document.querySelectorAll('.magnetic');
    setupMagnetic(magneticEls, cursor, cleanupFns);

    const hackerLinks = document.querySelectorAll('[data-text]');
    setupHackerLinks(hackerLinks, cleanupFns);

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return { cursorRef, scrollContentRef, navRef };
}
