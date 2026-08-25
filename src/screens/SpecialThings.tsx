import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { birthdayData } from '../data/birthdayData'
import CuteCat from '../components/CuteCat'

const ROTATIONS = [-2, 1.5, -1.5, 2, -1, 1.5, -2, 1]
const DECORATIONS = ['✿', '✦', '♡', '☆', '❀', '♪', '⚡', '🐾']

export default function SpecialThings() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [allRevealed, setAllRevealed] = useState(false)
  const [finalRevealed, setFinalRevealed] = useState(false)
  const [catMood, setCatMood] = useState<'idle' | 'happy' | 'excited' | 'sleepy'>('idle')
  const [catSpeech, setCatSpeech] = useState("I approve of these observations. 🐱")

  const items = birthdayData.specialThings
  const totalCards = items.length

  useEffect(() => {
    if (revealed.size >= totalCards && !allRevealed) {
      setAllRevealed(true)
    }
  }, [revealed, totalCards, allRevealed])

  const toggle = (i: number) => {
    const next = new Set(revealed)
    if (next.has(i)) {
      next.delete(i)
    } else {
      next.add(i)
    }
    setRevealed(next)

    // Cat reactions
    if (next.has(i)) {
      if (i === 6) { // cats card
        setCatMood('excited')
        setCatSpeech("THAT'S ME! I'M THE CAT! 🐱💗")
      } else if (i === 4) { // panic card
        setCatMood('excited')
        setCatSpeech("Not the SIM again... 💀📱")
      } else if (i === 2) { // chaotic
        setCatMood('excited')
        setCatSpeech("Chaos is underrated. 🤪")
      } else if (i === 7) { // laugh
        setCatMood('happy')
        setCatSpeech("That laugh is iconic. 😂")
      } else {
        setCatMood('happy')
        setCatSpeech("I approve of these observations. 🐱")
      }
    } else {
      setCatMood('idle')
      setCatSpeech("I approve of these observations. 🐱")
    }
  }

  return (
    <section id="special-things" className="relative min-h-screen bg-gradient-to-b from-lavender/30 via-cream to-warm-white px-4 md:px-6 py-16 md:py-20 overflow-hidden">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-3 text-center font-display text-2xl text-deep-rose md:text-3xl lg:text-4xl"
      >
        A few things we absolutely love about you 🌷
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mb-10 text-center text-sm text-gray-500 italic md:text-base"
      >
        Some are sweet. Some are... very Havya. 😂
      </motion.p>

      {/* Cards grid — scrapbook style */}
      <div className="mx-auto grid max-w-lg grid-cols-1 gap-4 md:max-w-3xl md:grid-cols-2 md:gap-5">
        {items.map((item, i) => {
          const isOpen = revealed.has(i)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => toggle(i)}
              whileHover={{ scale: 1.02, rotate: 0 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer rounded-2xl p-5 md:p-6 shadow-md transition-all duration-300 border ${
                isOpen
                  ? 'bg-white shadow-lg border-pink-200 z-10'
                  : 'bg-white/70 backdrop-blur-sm border-pink-100/50 hover:shadow-lg hover:border-pink-200'
              }`}
              style={{ rotate: isOpen ? 0 : `${ROTATIONS[i]}deg` }}
            >
              {/* Decorative corner */}
              <span className="absolute top-2.5 right-3 text-xs opacity-30 pointer-events-none">
                {DECORATIONS[i]}
              </span>

              {/* Title */}
              <h3 className="font-display text-base md:text-lg text-deep-rose pr-5">{item.title}</h3>

              {/* Hint or revealed message */}
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 text-xs italic text-gray-400"
                  >
                    {item.hint}
                  </motion.p>
                ) : (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 pt-3 border-t border-pink-100"
                  >
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.message}
                    </p>
                    <motion.span
                      className="inline-block mt-2 text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ delay: 0.3 }}
                    >
                      💖
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cat peeking behind specific cards */}
              {i === 1 && !isOpen && (
                <div className="absolute -top-5 -right-3 pointer-events-none hidden md:block">
                  <CuteCat mood="idle" size={40} />
                </div>
              )}
              {i === 4 && !isOpen && (
                <div className="absolute -bottom-3 -left-2 pointer-events-none hidden md:block">
                  <CuteCat mood="sleepy" size={35} />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Cat companion section */}
      <motion.div
        className="mt-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {/* Speech bubble */}
        <motion.div
          key={catSpeech}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-3 rounded-2xl bg-white/80 backdrop-blur-sm px-4 py-2 shadow-md max-w-[240px]"
        >
          <p className="text-xs text-gray-600 text-center">{catSpeech}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-white/80" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <CuteCat mood={catMood} size={120} />
        </motion.div>
      </motion.div>

      {/* Final hidden card — appears after all cards opened */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            className="mx-auto mt-10 max-w-sm"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <motion.div
              onClick={() => setFinalRevealed(true)}
              className={`cursor-pointer rounded-2xl p-6 md:p-7 shadow-lg border-2 text-center transition-all ${
                finalRevealed ? 'bg-white border-rose-gold' : 'bg-gradient-to-br from-white to-pink-50 border-pink-200 border-dashed'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {!finalRevealed ? (
                <div>
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-lg font-display text-deep-rose"
                  >
                    ✨ And one more thing... ✨
                  </motion.p>
                  <p className="text-xs text-gray-400 mt-2 italic">Tap to reveal</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-base leading-relaxed text-gray-700 mb-4">
                    You don't have to be perfect, Havya. Just keep being you. That's already pretty wonderful. 💗
                  </p>
                  <p className="font-handwritten text-base text-deep-rose/60">
                    — Vamshi & Neha 🌷
                  </p>
                  <motion.div
                    className="mt-3 flex justify-center gap-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {['💗', '✨', '💗'].map((e, i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      >
                        {e}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <motion.p
        className="mt-8 text-center text-xs text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {revealed.size} / {totalCards} discovered {revealed.size === totalCards ? '✨' : ''}
      </motion.p>
    </section>
  )
}
