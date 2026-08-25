import { useState } from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import CuteCat from '../components/CuteCat';
import FloatingElements from '../components/FloatingElements';

export default function FinaleScreen() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fffcf5] via-[#fce4ec] to-[#f3eeff] px-6 py-20 relative overflow-hidden">
      <FloatingElements type="mixed" density="medium" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <motion.h2
          className="font-display text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Happy Birthday, Havya ❤️
        </motion.h2>

        <motion.p
          className="font-body text-xl text-gray-600 max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {birthdayData.finale.message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <CuteCat mood="happy" size={150} withCake />
        </motion.div>

        {!showMore ? (
          <motion.button
            className="font-body text-lg text-gray-500 hover:text-gray-700 transition-colors mt-4 cursor-pointer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2 }}
            onClick={() => setShowMore(true)}
          >
            One more thing...
          </motion.button>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="font-body text-xl text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Go enjoy your day now.
            </motion.p>

            <motion.p
              className="font-display text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {birthdayData.finale.closing}
            </motion.p>
          </motion.div>
        )}

        <motion.p
          className="text-sm text-gray-400 opacity-60 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5 }}
        >
          Made with ❤️ by {birthdayData.myName}
        </motion.p>

        <button
          className="text-sm text-gray-400 hover:text-gray-600 mt-8 cursor-pointer transition-colors"
          onClick={() => window.location.reload()}
        >
          Start over 🔄
        </button>
      </div>
    </section>
  );
}
