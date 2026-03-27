import { SITE } from '../../data/dkPortfolio';

const arrow = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function DkProjects() {
  const n = SITE.projects.length;
  return (
    <section id="projects">
      <div className="projects-header">
        <div className="reveal">
          <div className="section-label">Selected work</div>
          <div className="projects-title">{SITE.projectsHeader}</div>
        </div>
        <div className="projects-count reveal">
          {String(n).padStart(2, '0')} Projects
        </div>
      </div>

      <div id="project-list">
        {SITE.projects.map((p) => (
          <div
            key={p.url}
            className="project-item reveal"
            data-img={p.img}
          >
            <div className="project-num">{p.num}</div>
            <div>
              <div className="project-name">{p.name}</div>
              <div className="project-desc">{p.desc}</div>
            </div>
            <div className="project-tech">
              {p.tech.map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
            <a
              href={p.url}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View {arrow}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
