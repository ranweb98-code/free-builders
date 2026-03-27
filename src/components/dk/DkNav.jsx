import { useState } from 'react';
import { SITE } from '../../data/dkPortfolio';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#why-me', label: 'Why me' },
  { href: '#contact', label: 'Contact' },
];

export default function DkNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav id="navbar">
        <a href="#hero" className="nav-logo" onClick={() => setOpen(false)}>
          {SITE.navLogo}
          <span>{SITE.navLogoAccent}</span>
        </a>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">
          Start a project
        </a>
        <button
          type="button"
          className="hamburger"
          id="hamburger"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`} id="mobileMenu">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Start a project →
        </a>
      </div>
    </>
  );
}
