import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CuteCat from '../components/CuteCat';
import FloatingElements from '../components/FloatingElements';

export default function GiftScreen() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff5ee] to-[#fffaf5] px-6 py-20 relative overflow-hidden">
      <motion.h2
        className="font-display text-2xl md:text-3xl text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Wait... we're not done yet.
      </motion.h2>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="gift-box"
            className="flex flex-col items-center gap-6"
            exit={{ opacity: 0 }}
          >
            {/* Gift box */}
            <motion.div
              className="relative w-48 h-52 flex flex-col items-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Bow */}
              <div className="relative z-10 mb-[-8px]">
                <div className="w-6 h-6 rounded-full bg-[#c97080] mx-auto" />
                <div className="flex -mt-4">
                  <div className="w-8 h-5 bg-[#c97080] rounded-full -rotate-30" />
                  <div className="w-8 h-5 bg-[#c97080] rounded-full rotate-30 -ml-2" />
                </div>
              </div>

              {/* Lid */}
              <div className="w-44 h-10 bg-gradient-to-r from-[#e8a0b0] to-[#d4808f] rounded-lg relative z-10 shadow-md">
                <div className="absolute inset-x-[45%] top-0 bottom-0 w-[10%] bg-[#c97080]" />
              </div>

              {/* Box body */}
              <div className="w-40 h-32 bg-gradient-to-b from-[#f5c6d0] to-[#e8a0b8] rounded-lg -mt-1 relative shadow-lg">
                <div className="absolute inset-x-[44%] top-0 bottom-0 w-[12%] bg-[#c97080]" />
                <div className="absolute inset-y-[42%] left-0 right-0 h-[12%] bg-[#c97080]" />
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <CuteCat mood="excited" size={100} />
            </div>

            <motion.button
              className="px-7 py-3 bg-pink-100 hover:bg-pink-200 rounded-full font-medium text-pink-700 text-lg transition-colors group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpened(true)}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Open it 🎁</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="contract"
            className="flex flex-col items-center gap-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Glow burst */}
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-gradient-radial from-amber-200/60 to-transparent"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 3, opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.5 }}
            />

            <FloatingElements type="confetti" density="high" />

            {/* Friendship Contract */}
            <motion.div
              className="relative w-full max-w-sm rounded-xl shadow-xl bg-[#fffef9] border-2 border-[#e8d4b8] p-7 md:p-9"
              initial={{ y: 30, opacity: 0, scale: 0.9, rotate: -1 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* Decorative seal */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#c97080] to-[#a05060] flex items-center justify-center shadow-lg">
                <span className="text-white text-xs font-bold text-center leading-tight">OFFICIAL<br/>SEAL</span>
              </div>

              {/* Header */}
              <div className="text-center mb-5 border-b border-dashed border-[#e8d4b8] pb-4">
                <p className="text-[10px] uppercase tracking-[3px] text-gray-400 mb-1">Document No. HBD-2026</p>
                <h3 className="font-display text-lg md:text-xl text-gray-800">Friendship Contract</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Legally Binding Forever</p>
              </div>

              {/* Body */}
              <div className="text-sm leading-relaxed text-gray-700 space-y-3">
                <p>
                  This document hereby certifies that <strong className="text-deep-rose">Havya</strong> is officially and irrevocably stuck with us forever.
                </p>
                <p className="text-xs text-gray-500 italic">
                  The aforementioned party has no right to exit this friendship under any circumstances including but not limited to: moving cities, getting busy, finding "cooler friends", or pretending to not see our messages.
                </p>

                <div className="border-t border-dashed border-[#e8d4b8] pt-3 mt-4">
                  <p className="text-xs text-gray-500 font-medium mb-2">Terms & Conditions:</p>
                  <ul className="text-xs text-gray-600 space-y-1.5 list-none">
                    <li>✦ Must reply to group chat within 24 hours (minimum)</li>
                    <li>✦ Must attend all spontaneous plans (no excuses)</li>
                    <li>✦ Must accept all birthday surprises gracefully</li>
                    <li>✦ Must remain this awesome (non-negotiable)</li>
                  </ul>
                </div>

                {/* Signatures */}
                <div className="border-t border-dashed border-[#e8d4b8] pt-4 mt-4 flex justify-between items-end">
                  <div className="text-center">
                    <p className="font-handwritten text-lg text-deep-rose/80">Vamshi</p>
                    <div className="w-20 border-t border-gray-300 mt-1" />
                    <p className="text-[9px] text-gray-400 mt-0.5">Party A</p>
                  </div>
                  <div className="text-center">
                    <p className="font-handwritten text-lg text-deep-rose/80">Neha</p>
                    <div className="w-20 border-t border-gray-300 mt-1" />
                    <p className="text-[9px] text-gray-400 mt-0.5">Party B</p>
                  </div>
                </div>

                <div className="text-center mt-3">
                  <p className="text-[9px] text-gray-400">Witness: 🐱 (The Cat)</p>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="text-xs text-gray-400 mt-3 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              psst... screenshot this 📸
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <CuteCat mood="happy" size={100} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
