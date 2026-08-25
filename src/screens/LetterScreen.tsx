import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import CuteCat from '../components/CuteCat';
import FloatingElements from '../components/FloatingElements';

export default function LetterScreen() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fffcf9] to-[#fff8f3] px-6 py-20 relative overflow-hidden">
      <AnimatePresence>
        {isOpen && <FloatingElements type="sparkles" density="low" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            className="flex flex-col items-center gap-6"
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <p className="font-display italic text-xl md:text-2xl text-center text-gray-700">
              There's something we wanted to tell you...
            </p>

            {/* Envelope */}
            <motion.div
              className="relative w-64 h-44 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              onClick={() => setIsOpen(true)}
            >
              {/* Body */}
              <div className="absolute inset-0 bg-[#f8c8d4] rounded-lg shadow-lg" />
              {/* Flap */}
              <div
                className="absolute top-0 left-0 w-0 h-0 border-l-[128px] border-r-[128px] border-t-[72px] border-l-transparent border-r-transparent border-t-[#e8a0b8] rounded-t-lg"
                style={{ transformOrigin: 'top center' }}
              />
              {/* Heart seal */}
              <div className="absolute top-[60px] left-1/2 -translate-x-1/2 text-2xl">💗</div>
            </motion.div>

            <motion.button
              className="px-6 py-3 bg-pink-100 hover:bg-pink-200 rounded-full font-medium text-pink-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(true)}
            >
              Open the letter 💌
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="flex flex-col items-center gap-6 w-full max-w-lg"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Letter paper */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 md:p-10 w-full"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="font-handwritten text-lg leading-relaxed whitespace-pre-line text-gray-700">
                {birthdayData.letter}
              </div>
              <p className="font-handwritten text-xl mt-8">With loads of love ❤️</p>
              <div className="flex gap-8 mt-4 justify-center">
                <p className="font-handwritten text-xl text-deep-rose/70">Neha</p>
                <p className="font-handwritten text-xl text-deep-rose/70">&</p>
                <p className="font-handwritten text-xl text-deep-rose/70">Vamshi</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <CuteCat mood="idle" size={80} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
