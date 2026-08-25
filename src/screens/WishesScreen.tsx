import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import CuteCat from '../components/CuteCat';

const wishStyles = [
  { bg: 'bg-purple-50/50', icon: '✦' },
  { bg: 'bg-pink-50/50', icon: '♡' },
  { bg: 'bg-blue-50/50', icon: '✿' },
  { bg: 'bg-amber-50/50', icon: '☆' },
];

function Sparkle({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="absolute text-purple-300/60"
      style={style}
      animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" fill="currentColor" />
    </motion.svg>
  );
}

const sparklePositions: React.CSSProperties[] = [
  { top: '10%', left: '8%' },
  { top: '25%', right: '12%' },
  { top: '55%', left: '5%' },
  { top: '70%', right: '8%' },
  { top: '85%', left: '15%' },
];

export default function WishesScreen() {
  const wishes = birthdayData.wishes;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f3eeff] to-[#fffcf5] px-6 py-20 relative overflow-hidden">
      {/* Floating sparkles */}
      {sparklePositions.map((pos, i) => (
        <Sparkle key={i} style={pos} delay={i * 0.8} />
      ))}

      <motion.h2
        className="font-display text-2xl md:text-3xl text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        A few things we wish for you...
      </motion.h2>

      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        {wishes.slice(0, -1).map((wish, i) => {
          const { bg, icon } = wishStyles[i % wishStyles.length];
          return (
            <motion.div
              key={i}
              className={`${bg} rounded-xl px-6 py-4 w-full backdrop-blur-sm`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <p className="font-body text-lg md:text-xl text-center text-gray-700">
                {wish}
              </p>
              <motion.span
                className="block text-center mt-2 text-sm opacity-60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3 }}
              >
                {icon}
              </motion.span>
            </motion.div>
          );
        })}

        <motion.p
          className="font-body text-base text-center text-gray-500 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          And most importantly...
        </motion.p>

        <motion.p
          className="font-display text-3xl md:text-4xl text-center animate-[glow_2s_ease-in-out_infinite]"
          style={{ textShadow: '0 0 20px rgba(200,160,255,0.4)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
        >
          We hope you're genuinely happy.
        </motion.p>
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4 }}
      >
        <CuteCat mood="sleepy" size={120} />
      </motion.div>
    </section>
  );
}
