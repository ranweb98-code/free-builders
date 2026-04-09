import { Fragment, useEffect } from 'react';
import CurvedLoop from './components/CurvedLoop/CurvedLoop';
import ContactStepper from './components/ContactStepper';
import { useBrutalEffects } from './hooks/useBrutalEffects';
import {
  TAPE_TEXT,
  CURVED_LOOP_TEXT,
  HERO_LINE1,
  HERO_LINE2,
  HERO_WORK,
  SECTION_INTRO,
  SECTION_SERVICES_INTRO,
  ABOUT,
  SERVICES,
  PROJECTS,
  WHY_POINTS,
  WHATSAPP_HREF,
} from './data/pitiContent';

export default function App() {
  const { cursorRef, scrollContentRef, navRef } = useBrutalEffects();

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.removeAttribute('dir');
    document.body.classList.add('brutal-body');
    return () => {
      document.body.classList.remove('brutal-body');
    };
  }, []);

  return (
    <div className="brutal-app">
      <div className="noise" aria-hidden />
      <div id="cursor" ref={cursorRef} aria-hidden />
      <nav ref={navRef} className="brutal-nav" aria-label="Primary">
        <a href="#top" className="nav-logo magnetic" style={{ textDecoration: 'none' }}>
          PITI
        </a>
        <ul className="nav-menu">
          <li>
            <a href="#work" className="nav-link magnetic" data-text="WORK">
              WORK
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link magnetic" data-text="ABOUT">
              ABOUT
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link magnetic" data-text="CONTACT">
              CONTACT
            </a>
          </li>
        </ul>
        <a href="#contact" className="cta-btn magnetic">
          <span>START A PROJECT</span>
        </a>
      </nav>

      <div id="scroll-content" ref={scrollContentRef}>
        <section className="hero" id="top">
          <div className="hero-title-container">
            <h1>
              <div className="word">{HERO_LINE1}</div>
              <br />
              <div className="word">{HERO_LINE2}</div>
              <br />
              {HERO_WORK.map((part, i) => (
                <Fragment key={part}>
                  {i > 0 ? <br /> : null}
                  <div className="word">{part}</div>
                </Fragment>
              ))}
            </h1>
          </div>

          <div className="tape-wrapper" aria-hidden>
            <div className="tape-track">
              <span className="tape-segment">{TAPE_TEXT}</span>
              <span className="tape-segment">{TAPE_TEXT}</span>
            </div>
          </div>
        </section>

        <section className="section-dark" id="intro">
          <p className="big-text">
            {SECTION_INTRO.lead}
            <span>{SECTION_INTRO.rest}</span>
          </p>
        </section>

        <section className="section-dark section-right">
          <p className="big-text-stack">
            {SECTION_SERVICES_INTRO.line1}
            <br />
            <span>{SECTION_SERVICES_INTRO.line2}</span>
            <br />
            {SECTION_SERVICES_INTRO.line3}
          </p>
        </section>

        <div className="brutal-curved-strip">
          <CurvedLoop
            marqueeText={CURVED_LOOP_TEXT}
            speed={2}
            curveAmount={220}
            direction="left"
            interactive
            textDirection="ltr"
            className="curved-loop-brutal"
          />
        </div>

        <section className="section-dark" id="about">
          <div>
            <p className="section-label">About</p>
            <p className="brutal-about-text">{ABOUT}</p>
          </div>
        </section>

        <section className="section-dark">
          <div style={{ width: '100%' }}>
            <p className="section-label">Services</p>
            <div className="services-grid">
              {SERVICES.map((s) => (
                <article key={s.title} className="service-card">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-dark" id="work">
          <div style={{ width: '100%' }}>
            <p className="section-label">Selected work</p>
            <div className="projects-grid">
              {PROJECTS.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  className="project-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{p.title}</h3>
                  <span className="project-url">{p.url.replace(/^https:\/\//, '')}</span>
                  <p>{p.desc}</p>
                  <span className="project-arrow">OPEN SITE →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-dark">
          <div>
            <p className="section-label">Why PITI</p>
            <ul className="why-list">
              {WHY_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-dark" id="contact">
          <div className="contact-inner">
            <p className="section-label">Contact</p>
            <p className="contact-lead">
              Tell us what you&apos;re building. We&apos;ll reply with next steps—usually within one business day.
            </p>
            <ContactStepper theme="brutal" />
          </div>
        </section>

        <footer className="brutal-footer">
          <h2>
            <a href="#top">PITI</a>
          </h2>
          <p>© {new Date().getFullYear()} PITI · פיטי · Websites that work</p>
        </footer>
      </div>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-brutal"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
