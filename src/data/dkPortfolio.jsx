export const SITE = {
  navLogo: 'wb',
  navLogoAccent: '.dev',
  heroIndex: ['Web Developer', '& Conversion-focused builds'],
  heroTitle: {
    line1: 'I build',
    line2: 'websites',
    line3: 'that bring clients.',
    line3Class: 'outline-text',
  },
  heroDesc: (
    <>
      Landing pages, brochure sites, and light automations
      <br />
      for businesses that want to <strong style={{ color: 'var(--charcoal)' }}>grow with clarity and conversions.</strong>
    </>
  ),
  availability: 'Open for new projects',
  marqueeItems: [
    'React',
    'Vite',
    'Tailwind',
    'TypeScript',
    'Web performance',
    'Landing pages',
    'Web3Forms',
    'GSAP',
    'Conversion copy',
    'WhatsApp leads',
    'SEO-ready',
    'Responsive UI',
    'Modern design',
    'Semantic HTML',
    'Accessible UI',
  ],
  aboutTitle: (
    <>
      Code with
      <br />
      <em>a sales mindset</em>
    </>
  ),
  aboutText:
    "I'm a web developer who cares as much about outcomes as about pixels. I build fast, credible sites with clear messaging and strong calls to action—so visitors understand what you offer and feel confident reaching out. Day to day I work in React and Vite, Tailwind for styling, and pragmatic integrations (forms, WhatsApp, analytics) so launches stay maintainable—not a pile of plugins nobody understands.",
  stats: [
    { count: 1, label: 'Year building', suffix: '' },
    { count: 16, label: 'Projects shipped', suffix: '' },
    { count: 14, label: 'Happy clients', suffix: '' },
    { count: 28, label: 'Technologies', suffix: '' },
  ],
  /** GitHub figures you want shown on the site (edit anytime). */
  githubStats: {
    repos: 12,
    stars: 28,
    followers: 10,
    contributions: 180,
  },
  servicesSectionTitle: 'Services',
  services: [
    {
      title: 'Business websites',
      body: 'Brochure and brand sites that load fast, read well, and guide visitors toward contact or purchase.',
    },
    {
      title: 'High-converting landing pages',
      body: 'Structure, headlines, and forms tuned for leads—so clicks turn into conversations.',
    },
    {
      title: 'Automations & leads',
      body: 'Connect forms to WhatsApp, email, and your tools so every lead lands where you work.',
    },
    {
      title: 'Marketing alignment',
      body: 'Offer, audience, and on-page story—so the site supports how you actually sell.',
    },
  ],
  projectsHeader: (
    <>
      Projects
      <br />
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--accent)',
        }}
      >
        & live work
      </span>
    </>
  ),
  projects: [
    {
      num: '01',
      name: 'Kube Eliyahu',
      desc: 'Home-kitchen brand site with a dynamic menu, testimonials, and warm storytelling—built to feel as approachable as the food.',
      tech: ['React', 'Vite', 'Tailwind'],
      url: 'https://kube-eliyahu.vercel.app/',
      img: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fkube-eliyahu.vercel.app%2F?w=800',
    },
    {
      num: '02',
      name: 'LIA Estate',
      desc: 'Property showcase with a clean layout, smooth UX, and emphasis on visuals so listings stay readable on every device.',
      tech: ['React', 'Responsive', 'UI'],
      url: 'https://lia-estate.vercel.app/',
      img: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Flia-estate.vercel.app%2F?w=800',
    },
    {
      num: '03',
      name: 'Dream Build Homes',
      desc: 'Construction and investment focused site with clear services, project framing, and CTAs that point visitors to the next step.',
      tech: ['Landing', 'CTA', 'Performance'],
      url: 'https://dream-build-homes.vercel.app/',
      img: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fdream-build-homes.vercel.app%2F?w=800',
    },
  ],
  whyMe: [
    {
      year: '01',
      role: 'Modern design',
      company: 'Visual language',
      desc: 'Contemporary layouts, typography, and spacing that feel current—not generic templates.',
    },
    {
      year: '02',
      role: 'Fast delivery',
      company: 'Ship on schedule',
      desc: 'Clear scope, tight loops, and pragmatic stacks so you launch without endless rounds.',
    },
    {
      year: '03',
      role: 'Marketing mindset',
      company: 'Conversion first',
      desc: 'Headlines, structure, and CTAs aligned with how people actually decide and inquire.',
    },
    {
      year: '04',
      role: 'Personal fit',
      company: 'Your product, your voice',
      desc: 'Adapted to your audience and offer—not one-size-fits-all copy or visuals.',
    },
  ],
  whyAside: (
    <>
      Why work
      <br />
      with <em>me.</em>
    </>
  ),
  githubTitle: (
    <>
      Code I&apos;ve
      <br />
      put into <em>the world.</em>
    </>
  ),
  githubDesc: (
    <>
      Repositories are a mix of client-adjacent experiments, small utilities I reuse on builds, and learning spikes around performance and UI.
      <br />
      <br />
      The numbers on the right are the ones I keep aligned with my public profile—so what you see here matches what is actually out there.
    </>
  ),
  githubStatsFootnote:
    'The four stats match what I publish publicly. The heatmap-style grid below is a visual accent—not live GitHub data.',
  contactBig: (
    <>
      Let&apos;s
      <br />
      <em>build</em>
      <br />
      together.
    </>
  ),
  contactSub:
    'Share your business, audience, and what “success” looks like for you—timeline, budget ballpark, and links help. I usually reply within 24 hours, often faster on WhatsApp.',
  contactLinks: [
    ...(typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_EMAIL
      ? [
          {
            name: 'Email',
            handle: import.meta.env.VITE_CONTACT_EMAIL,
            href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`,
          },
        ]
      : []),
    { name: 'WhatsApp', handle: 'Message me', href: 'https://wa.me/972503610061' },
  ],
  /** Public Instagram — Norris-style links in Contact */
  socialInstagram: 'https://www.instagram.com/ranelgabsi_/',
  footerLeft: `© ${new Date().getFullYear()} — Web builds & landing pages.`,
  footerRight: 'Built with care — performance, clarity, and shipping on time.',
  curvedLoopText:
    'Websites that bring clients ✦ Landing pages that convert ✦ Automations that save time ✦ ',
};
