import { SITE } from '../../data/dkPortfolio';

const ghUser = import.meta.env.VITE_GITHUB_USERNAME || '';
const githubProfileUrl = ghUser ? `https://github.com/${ghUser}` : null;

export default function DkFooter() {
  return (
    <footer>
      <div className="footer-left">{SITE.footerLeft}</div>
      <div className="footer-logo">
        {SITE.navLogo}
        <span>{SITE.navLogoAccent}</span>
      </div>
      <div className="footer-right">
        <span>{SITE.footerRight}</span>
        {githubProfileUrl && (
          <>
            <span className="footer-dot" aria-hidden>
              {' '}
              ·{' '}
            </span>
            <a href={githubProfileUrl} className="footer-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </>
        )}
      </div>
    </footer>
  );
}
