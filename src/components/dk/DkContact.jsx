import { SITE } from '../../data/dkPortfolio';
import ContactStepper from '../ContactStepper';
import NorrisSocialLinks from '../NorrisSocialLinks/NorrisSocialLinks';

const facebookUrl = import.meta.env.VITE_FACEBOOK_URL || '';

const arrow = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path d="M1 17L17 1M17 1H4M17 1V14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function DkContact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <div>
          <div className="section-label reveal">Get in touch</div>
          <div className="contact-big reveal">{SITE.contactBig}</div>
          <p className="contact-sub reveal">{SITE.contactSub}</p>
          <NorrisSocialLinks
            instagramUrl={SITE.socialInstagram}
            facebookUrl={facebookUrl}
          />

          <div className="contact-links reveal">
            {SITE.contactLinks.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="contact-link"
                target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              >
                <div>
                  <div className="contact-link-name">{c.name}</div>
                  <div className="contact-link-handle">{c.handle}</div>
                </div>
                {arrow}
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form-wrap reveal">
          <div className="section-label">Send a message</div>
          <div style={{ marginTop: '2rem' }}>
            <ContactStepper />
          </div>
        </div>
      </div>
    </section>
  );
}
