import { SITE } from '../../data/dkPortfolio';

export default function DkAbout() {
  return (
    <section id="about">
      <div>
        <div className="section-label reveal">About</div>
        <h2 className="about-title reveal">{SITE.aboutTitle}</h2>
        <p className="about-text reveal">{SITE.aboutText}</p>
        <div className="about-stats reveal">
          {SITE.stats.map((s) => (
            <div key={s.label} className="stat-box">
              <div
                className="stat-num"
                data-count={s.count}
                data-append-plus={s.suffix === '' ? '0' : '1'}
              >
                0
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-right reveal">
        <div className="skills-group">
          <div className="skills-group-title">{SITE.servicesSectionTitle}</div>
          <div className="service-cards-grid">
            {SITE.services.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-card-inner">
                  <div className="service-card-title">{s.title}</div>
                  <div>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
