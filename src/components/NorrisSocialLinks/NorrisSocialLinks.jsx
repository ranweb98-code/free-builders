import { useMemo } from 'react';
import './NorrisSocialLinks.css';

function NorrisLink({ href, label, pending, onClick }) {
  const chars = useMemo(() => {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(label), (s) => s.segment);
  }, [label]);

  return (
    <a
      href={href}
      className={`norris${pending ? ' norris--pending' : ''}`}
      target={pending ? undefined : '_blank'}
      rel={pending ? undefined : 'noopener noreferrer'}
      onClick={onClick}
      title={pending ? 'Add VITE_FACEBOOK_URL in .env when your page is ready' : undefined}
      aria-disabled={pending || undefined}
    >
      {chars.map((char, i) => (
        <span
          key={`${i}-${char}`}
          data-char={char}
          style={{ '--index': i }}
        >
          {char}
        </span>
      ))}
    </a>
  );
}

export default function NorrisSocialLinks({ instagramUrl, facebookUrl }) {
  const hasFacebook = Boolean(facebookUrl?.trim());

  return (
    <div className="norris-social-wrap reveal">
      <div className="section-label norris-social-label">Social</div>
      <div className="norris-social-inner">
        <NorrisLink href={instagramUrl} label="Instagram" />
        <NorrisLink
          href={hasFacebook ? facebookUrl : '#'}
          label="Facebook"
          pending={!hasFacebook}
          onClick={!hasFacebook ? (e) => e.preventDefault() : undefined}
        />
      </div>
    </div>
  );
}
