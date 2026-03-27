import { SITE } from '../../data/dkPortfolio';

export default function DkWhyMe() {
  return (
    <section id="why-me">
      <div className="section-label reveal">Why work with me</div>

      <div className="exp-grid">
        <div className="exp-timeline reveal">
          {SITE.whyMe.map((w) => (
            <div key={w.role} className="exp-item">
              <div className="exp-year">{w.year}</div>
              <div className="exp-role">{w.role}</div>
              <div className="exp-company">{w.company}</div>
              <div className="exp-desc">{w.desc}</div>
            </div>
          ))}
        </div>

        <div className="exp-right reveal">
          <div className="exp-big-text">{SITE.whyAside}</div>
          <div className="section-label">At a glance</div>
          <ul className="awards-list">
            <li className="award-item">
              <div>
                <div className="award-name">Conversion-led pages</div>
                <div className="award-org">Clear CTAs, forms, and follow-up</div>
              </div>
              <div className="award-year">01</div>
            </li>
            <li className="award-item">
              <div>
                <div className="award-name">Performance &amp; SEO hygiene</div>
                <div className="award-org">Fast loads, semantic structure</div>
              </div>
              <div className="award-year">02</div>
            </li>
            <li className="award-item">
              <div>
                <div className="award-name">Direct communication</div>
                <div className="award-org">No jargon—just progress you can see</div>
              </div>
              <div className="award-year">03</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
