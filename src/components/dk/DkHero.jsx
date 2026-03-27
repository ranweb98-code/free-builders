import { SITE } from '../../data/dkPortfolio';

export default function DkHero() {
  const { heroTitle } = SITE;
  return (
    <section id="hero">
      <div className="hero-bg-grid" aria-hidden />
      <div className="hero-number" aria-hidden>
        01
      </div>

      <div className="hero-index reveal">
        {SITE.heroIndex.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <h1 className="hero-title">
        <div className="overflow-hidden">
          <span className="title-line block">{heroTitle.line1}</span>
        </div>
        <div className="overflow-hidden">
          <span className="title-line block">
            <em className="serif-word">{heroTitle.line2}</em>
          </span>
        </div>
        <div className="overflow-hidden">
          <span className={`title-line block ${heroTitle.line3Class}`}>{heroTitle.line3}</span>
        </div>
      </h1>

      <div className="hero-bottom reveal">
        <div>
          <div className="hero-desc">{SITE.heroDesc}</div>
          <a href="#contact" className="hero-cta">
            Let&apos;s build your site
          </a>
          <div className="hero-availability" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            <div className="hero-dot" />
            {SITE.availability}
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
