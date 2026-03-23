import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack/ScrollStack';

const services = [
  {
    title: 'בניית אתרים לעסקים',
    description: 'אתרי תדמית מהירים, ממוקדי המרה ומותאמים למותג — עם חוויית משתמש נקייה ומסר שיווקי חד.',
    icon: (
      <svg className="h-10 w-10 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0015 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: 'דפי נחיתה ממירים',
    description: 'מבנה מוכח, כותרות שמובילות לפעולה, טפסים חכמים ומעקב — כדי להפוך קליקים ללקוחות.',
    icon: (
      <svg className="h-10 w-10 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-16.5 0h12m-12 0a2.25 2.25 0 01-2.25-2.25V6m12.25 3v1.5m0 0V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18v-7.5z" />
      </svg>
    ),
  },
  {
    title: 'אוטומציות ולידים',
    description: 'חיבור לוואטסאפ, מייל ו-CRM — כל ליד נכנס למערכת בלי לרדוף אחרי גיליונות.',
    icon: (
      <svg className="h-10 w-10 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'אסטרטגיה שיווקית',
    description: 'מסר, קהל יעד והצעת ערך — כדי שהאתר לא רק ייראה מצוין, אלא גם ימכור.',
    icon: (
      <svg className="h-10 w-10 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m0 0h3m-3-9h3m-3 9v3m0-3h3m-3 0H9m3 0v3" />
      </svg>
    ),
  },
];

function ServiceCard({ title, description, icon }) {
  return (
    <motion.div
      className="relative h-full text-right"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-neon-purple/30 via-neon-pink/20 to-neon-cyan/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/75">{description}</p>
      </div>
    </motion.div>
  );
}

export default function ServicesStack() {
  return (
    <ScrollStack
      className="scroll-stack-window"
      useWindowScroll
      itemDistance={80}
      itemScale={0.05}
      blurAmount={2}
      rotationAmount={3}
      stackPosition="22%"
      itemStackDistance={28}
    >
      {services.map((s) => (
        <ScrollStackItem key={s.title} itemClassName="group">
          <ServiceCard {...s} />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
