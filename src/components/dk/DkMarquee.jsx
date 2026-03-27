import { SITE } from '../../data/dkPortfolio';

export default function DkMarquee() {
  const items = SITE.marqueeItems;
  const chunk = (prefix) =>
    items.flatMap((text, i) => [
      <span key={`${prefix}-a-${i}`} className="marquee-item">
        {text}
      </span>,
      <span key={`${prefix}-s-${i}`} className="marquee-item marquee-sep">
        ✦
      </span>,
    ]);

  return (
    <div className="marquee-wrap">
      <div className="marquee-track" id="marqueeTrack">
        {chunk('m1')}
        {chunk('m2')}
      </div>
    </div>
  );
}
