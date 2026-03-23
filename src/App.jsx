import { useRef } from 'react';
import { motion } from 'framer-motion';
import Aurora from './components/Aurora/Aurora';
import VariableProximity from './components/VariableProximity/VariableProximity';
import ServicesStack from './components/ServicesStack';
import ContactStepper from './components/ContactStepper';
import PortfolioGrid from './components/PortfolioGrid';
import CurvedLoop from './components/CurvedLoop/CurvedLoop';

const whyPoints = [
  { text: 'עיצוב מודרני', icon: 'spark' },
  { text: 'מהירות עבודה', icon: 'bolt' },
  { text: 'חשיבה שיווקית', icon: 'chart' },
  { text: 'התאמה אישית לכל לקוח', icon: 'user' },
];

function WhyIcon({ name }) {
  const common = 'h-6 w-6 shrink-0 text-neon-cyan';
  switch (name) {
    case 'spark':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case 'chart':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v4.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V13.125zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      );
    default:
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      );
  }
}

export default function App() {
  const heroContainerRef = useRef(null);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden" dir="rtl">
      <Aurora
        colorStops={['#5227FF', '#7cff67', '#B19EEF']}
        blend={0.5}
        amplitude={1.0}
        speed={1}
      />

      <div
        ref={heroContainerRef}
        id="home"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        <VariableProximity
          label="אנחנו בונים אתרים שמביאים לקוחות"
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 900"
          containerRef={heroContainerRef}
          radius={200}
          falloff="linear"
          className="mb-6 text-5xl font-bold text-white md:text-7xl"
        />
        <p className="mb-8 max-w-2xl text-xl text-white/80 md:text-2xl">
          אתרי תדמית, דפי נחיתה ואוטומציות לעסקים שרוצים לגדול
        </p>
        <a
          href="#contact"
          className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:from-purple-700 hover:to-pink-700 hover:scale-105"
        >
          בוא נבנה לך אתר
        </a>
      </div>

      <div className="relative z-10">
        <CurvedLoop
          marqueeText="אתרים שמביאים לקוחות ✦ אתרים שמכניסים כסף ✦ אתרים שעובדים בשבילך"
          speed={2}
          curveAmount={400}
          direction="left"
          interactive={true}
          className="curved-loop-text"
        />
      </div>

      <main className="relative z-10">
        <section id="about" className="mx-auto max-w-3xl px-4 py-20 text-right">
          <motion.h2
            className="mb-6 text-3xl font-bold text-white md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            אודות
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            בונה אתרים צעיר עם חשיבה שיווקית. אני מתמחה בבניית אתרים שמוכרים – דפי נחיתה ממירים, אתרי תדמית
            מרשימים ואוטומציות שחוסכות זמן. המיקוד: המרות, מסרים ברורים ועיצוב עכשווי שמייצג את העסק ברמה הבאה.
          </motion.p>
        </section>

        <section id="services" className="py-8">
          <div className="mx-auto mb-10 max-w-5xl px-4 text-right">
            <motion.h2
              className="text-3xl font-bold text-white md:text-4xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              שירותים
            </motion.h2>
            <motion.p
              className="mt-2 text-white/65"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              מה שאני מספק — בגובה העיניים ובדיוק לשוק הישראלי
            </motion.p>
          </div>
          <ServicesStack />
        </section>

        <PortfolioGrid />

        <section id="why" className="mx-auto max-w-4xl px-4 py-24">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold text-white md:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            למה לעבוד איתי?
          </motion.h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {whyPoints.map((item, i) => (
              <motion.li
                key={item.text}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-right shadow-lg backdrop-blur-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <WhyIcon name={item.icon} />
                <span className="text-lg font-medium text-white">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        <section id="contact" className="px-4 py-20">
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              className="mb-2 text-center text-3xl font-bold text-white md:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              שלום מאת האתרים החופשיים
            </motion.h2>
            <motion.p
              className="mb-8 text-center text-white/70"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              מלא את הפרטים ואחזור אליך תוך 24 שעות
            </motion.p>
            <ContactStepper />
          </div>
        </section>
      </main>

      <motion.a
        href="https://wa.me/972503610061"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_rgba(37,211,102,0.45)] ring-2 ring-white/20"
        aria-label="WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
