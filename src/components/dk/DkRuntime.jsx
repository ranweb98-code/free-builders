import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function bindCursorTargets(cursor) {
  const sel =
    'a, button, .project-item, .skill-tag, .service-card, .hero-cta, .nav-cta, .hamburger';
  const nodes = document.querySelectorAll(sel);
  const onEnter = () => cursor.classList.add('hover');
  const onLeave = () => cursor.classList.remove('hover');
  nodes.forEach((el) => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
  });
  return () => {
    nodes.forEach((el) => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    });
  };
}

export default function DkRuntime({ onLoaderComplete, animationsEnabled }) {
  useEffect(() => {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loader-bar');
    const counter = document.getElementById('loader-counter');
    const nameEl = document.getElementById('loader-name');

    if (!loader || !bar || !counter || !nameEl) {
      onLoaderComplete();
      return () => {};
    }

    let cancelled = false;
    let finishTimeoutId;
    gsap.to(nameEl, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.1,
    });

    let progress = 0;
    const interval = window.setInterval(() => {
      if (cancelled) return;
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        window.clearInterval(interval);
        finishTimeoutId = window.setTimeout(() => {
          if (cancelled) return;
          gsap.to(loader, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            onComplete: () => {
              loader.style.display = 'none';
              onLoaderComplete();
            },
          });
        }, 300);
      }
      bar.style.width = `${progress}%`;
      counter.textContent = String(Math.floor(progress)).padStart(3, '0');
    }, 60);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      if (finishTimeoutId) window.clearTimeout(finishTimeoutId);
    };
  }, [onLoaderComplete]);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return undefined;

    const isMobile = () => window.innerWidth <= 768;
    const move = (e) => {
      if (isMobile()) return;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    const down = () => cursor.classList.add('click');
    const up = () => cursor.classList.remove('click');

    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);

    const unbindTargets = bindCursorTargets(cursor);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      unbindTargets();
    };
  }, []);

  useEffect(() => {
    const hoverImg = document.getElementById('proj-hover-img');
    const hoverSrc = document.getElementById('proj-hover-src');
    if (!hoverImg || !hoverSrc) return undefined;

    const items = document.querySelectorAll('.project-item[data-img]');
    const onEnter = (e) => {
      const item = e.currentTarget;
      hoverSrc.src = item.dataset.img || '';
      hoverImg.classList.add('visible');
    };
    const onLeave = () => hoverImg.classList.remove('visible');
    const onMove = (e) => {
      const x = e.clientX + 24;
      const y = e.clientY - 90;
      hoverImg.style.left = `${x}px`;
      hoverImg.style.top = `${y}px`;
    };

    items.forEach((item) => {
      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);
      item.addEventListener('mousemove', onMove);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
        item.removeEventListener('mousemove', onMove);
      });
    };
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!animationsEnabled) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.title-line', {
        yPercent: 110,
        stagger: 0.12,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        if (Number.isNaN(target)) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: target,
              duration: 1.5,
              ease: 'power2.out',
              onUpdate: () => {
                const noPlus = el.dataset.appendPlus === '0';
                el.textContent = `${Math.floor(counter.val)}${noPlus ? '' : '+'}`;
              },
            });
          },
        });
      });

      ScrollTrigger.create({
        start: 100,
        onUpdate(self) {
          const nav = document.getElementById('navbar');
          if (nav) {
            nav.style.boxShadow =
              self.progress > 0 ? '0 4px 40px rgba(0,0,0,0.06)' : 'none';
          }
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, [animationsEnabled]);

  return null;
}
