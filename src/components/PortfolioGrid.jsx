import { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'kube',
    title: 'קובה אליהו',
    description:
      'אתר תדמית למטבח ביתי עם תפריט דינמי, המלצות לקוחות וסיפור מותג. עיצוב חם ומזמין.',
    url: 'https://kube-eliyahu.vercel.app/',
    emoji: '🍲',
    gradient: 'from-amber-900/60 via-orange-900/40 to-rose-900/50',
  },
  {
    id: 'lia',
    title: 'LIA Estate',
    description:
      'פלטפורמה להצגת נכסים עם ממשק נקי, חוויית משתמש חלקה והתמקדות בוויזואליה.',
    url: 'https://lia-estate.vercel.app/',
    emoji: '🏛️',
    gradient: 'from-slate-900/70 via-indigo-900/50 to-purple-900/50',
  },
  {
    id: 'dream',
    title: 'Dream Build Homes',
    description:
      'אתר תדמית המתמקד בפרויקטים, שירותי בנייה והשקעה, עם קריאות לפעולה ברורות.',
    url: 'https://dream-build-homes.vercel.app/',
    emoji: '🏗️',
    gradient: 'from-zinc-900/70 via-purple-900/45 to-fuchsia-900/40',
  },
];

function PreviewThumb({ url, emoji, gradient }) {
  const [failed, setFailed] = useState(false);
  const thumbSrc = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800`;

  if (failed) {
    return (
      <div
        className={`flex h-48 w-full items-center justify-center bg-gradient-to-br ${gradient} text-5xl`}
        aria-hidden
      >
        {emoji}
      </div>
    );
  }

  return (
    <div className="relative h-48 w-full overflow-hidden bg-black/40">
      <img
        src={thumbSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
        onError={() => setFailed(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050510]/80 via-transparent to-transparent" />
    </div>
  );
}

export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="mb-4 text-right text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          פרויקטים נבחרים
        </motion.h2>
        <motion.p
          className="mb-12 text-right text-white/65"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          פרויקטים אמיתיים — לחצו לצפייה באתר המלא
        </motion.p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/80 hover:shadow-[0_20px_50px_-12px_rgba(168,85,247,0.35)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <PreviewThumb url={project.url} emoji={project.emoji} gradient={project.gradient} />
              <div className="p-6 text-right">
                <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/70 md:text-base">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  צפה בפרויקט ←
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
