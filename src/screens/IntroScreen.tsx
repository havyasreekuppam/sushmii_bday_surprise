import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingElements from '../components/FloatingElements'
import CuteCat from '../components/CuteCat'
import { birthdayData } from '../data/birthdayData'

function Butterfly({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 36 28">
      <motion.ellipse cx="12" cy="12" rx="10" ry="9" fill="#e8b4d4" opacity="0.75"
        animate={{ ry: [9, 6, 9] }} transition={{ duration: 0.5, repeat: Infinity }} />
      <ellipse cx="11" cy="12" rx="5" ry="4.5" fill="#f5c6d0" opacity="0.5" />
      <motion.ellipse cx="24" cy="12" rx="10" ry="9" fill="#d4b8e8" opacity="0.75"
        animate={{ ry: [9, 6, 9] }} transition={{ duration: 0.5, repeat: Infinity }} />
      <ellipse cx="25" cy="12" rx="5" ry="4.5" fill="#e8e0f0" opacity="0.5" />
      <ellipse cx="18" cy="14" rx="2" ry="6" fill="#4a3f4a" opacity="0.6" />
      <line x1="17" y1="8" x2="14" y2="3" stroke="#4a3f4a" strokeWidth="0.6" opacity="0.5" />
      <line x1="19" y1="8" x2="22" y2="3" stroke="#4a3f4a" strokeWidth="0.6" opacity="0.5" />
      <circle cx="14" cy="3" r="1" fill="#e8b4b8" />
      <circle cx="22" cy="3" r="1" fill="#e8b4b8" />
    </svg>
  )
}

function Flower({ size = 50, colors = ['#f5c6d0', '#e8b4d4', '#e8b4b8'] }: { size?: number, colors?: string[] }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="6" r="4" fill={colors[0]} />
      <circle cx="6" cy="12" r="4" fill={colors[1]} />
      <circle cx="18" cy="12" r="4" fill={colors[1]} />
      <circle cx="12" cy="18" r="4" fill={colors[0]} />
      <circle cx="8" cy="8" r="3.5" fill={colors[0]} opacity="0.7" />
      <circle cx="16" cy="8" r="3.5" fill={colors[0]} opacity="0.7" />
      <circle cx="12" cy="12" r="3" fill={colors[2]} />
    </svg>
  )
}

export default function IntroScreen({ onNext }: { onNext: () => void }) {
  const [catClicked, setCatClicked] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [catMood, setCatMood] = useState<'idle' | 'excited' | 'happy'>('idle')
  const { greeting, buttonText } = birthdayData.intro

  const handleCatClick = () => {
    if (catClicked) return
    setCatClicked(true)
    setCatMood('happy')
    setTimeout(() => setShowButton(true), 2000)
  }

  const handleGo = () => {
    setCatMood('excited')
    setTimeout(onNext, 800)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-baby-pink to-lavender">
      <FloatingElements type="petals" density="medium" className="absolute inset-0" />
      <FloatingElements type="sparkles" density="low" className="absolute inset-0" />

      {/* Glowing orbs */}
      <div className="absolute top-[8%] left-[8%] w-48 h-48 rounded-full bg-rose-gold/15 blur-3xl" />
      <div className="absolute bottom-[15%] right-[8%] w-56 h-56 rounded-full bg-lavender/25 blur-3xl" />
      <div className="absolute top-[40%] right-[15%] w-40 h-40 rounded-full bg-soft-pink/20 blur-3xl" />
      <div className="absolute top-[25%] left-[25%] w-64 h-64 rounded-full bg-peach/12 blur-3xl" />
      <div className="absolute bottom-[30%] left-[15%] w-44 h-44 rounded-full bg-baby-pink/20 blur-3xl" />

      {/* Corner flower — top left */}
      <motion.div
        className="absolute top-8 left-6 pointer-events-none"
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <Flower size={65} colors={['#f5c6d0', '#e8b4d4', '#e8b4b8']} />
      </motion.div>

      {/* Corner flower — top right */}
      <motion.div
        className="absolute top-12 right-8 pointer-events-none opacity-70"
        animate={{ rotate: [0, -4, 6, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        <Flower size={50} colors={['#d4b8e8', '#fde8d8', '#c4b5fd']} />
      </motion.div>

      {/* Corner flower — bottom left */}
      <motion.div
        className="absolute bottom-[18%] left-5 pointer-events-none opacity-60"
        animate={{ rotate: [0, 6, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      >
        <Flower size={55} colors={['#fde8d8', '#f5c6d0', '#e8b4b8']} />
      </motion.div>

      {/* Corner flower — bottom right */}
      <motion.div
        className="absolute bottom-[22%] right-6 pointer-events-none opacity-60"
        animate={{ rotate: [0, -5, 3, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
      >
        <Flower size={45} colors={['#e8b4d4', '#d4b8e8', '#c77d8a']} />
      </motion.div>

      {/* Butterfly floating around — larger */}
      <motion.div
        className="absolute top-[20%] right-[20%] z-20 pointer-events-none"
        animate={{
          x: [0, 80, 120, 60, -40, -100, -80, -20, 0],
          y: [0, -20, -50, -80, -60, -30, 10, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Butterfly size={40} />
      </motion.div>

      {/* Ribbon curls on edges */}
      {[
        { top: '15%', left: '75%', color: '#f5c6d0' },
        { top: '55%', left: '88%', color: '#d4b8e8' },
        { top: '70%', left: '8%', color: '#e8b4d4' },
        { top: '10%', left: '88%', color: '#fde8d8' },
      ].map((r, i) => (
        <motion.div
          key={`ribbon-${i}`}
          className="absolute pointer-events-none"
          style={{ top: r.top, left: r.left }}
          animate={{ y: [0, -12, 0], rotate: [0, 12, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.9 }}
        >
          <svg width="24" height="36" viewBox="0 0 20 30" fill="none">
            <path d="M10 0 Q16 8 7 15 Q13 20 10 30" stroke={r.color} strokeWidth="2.5" fill="none" opacity="0.5" />
          </svg>
        </motion.div>
      ))}

      {/* Sparkle dots around edges */}
      {[
        { top: '12%', left: '15%', delay: 0 },
        { top: '18%', right: '14%', delay: 0.5 },
        { top: '60%', left: '6%', delay: 1 },
        { top: '65%', right: '10%', delay: 1.5 },
        { top: '80%', left: '20%', delay: 0.3 },
        { top: '78%', right: '22%', delay: 1.8 },
      ].map((pos, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute pointer-events-none"
          style={pos}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: pos.delay }}
        >
          <svg width="14" height="14" viewBox="0 0 12 12">
            <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="#e8b4b8" opacity="0.7" />
          </svg>
        </motion.div>
      ))}

      {/* === MAIN CENTER CONTENT === */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="font-display text-3xl text-deep-rose md:text-4xl lg:text-5xl"
        >
          {greeting}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg text-deep-rose/70 md:text-xl"
        >
          We made a little something for you...
        </motion.p>

        {/* Signed by */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="font-handwritten text-base text-deep-rose/50 md:text-lg"
        >
          — Vamshi & Neha 🌷
        </motion.p>

        {/* Cat section */}
        <motion.div
          className="relative mt-6 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          {/* Speech bubble — before cat is clicked */}
          <AnimatePresence>
            {!catClicked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative mb-3 rounded-2xl bg-white/80 backdrop-blur-sm px-4 py-2 shadow-md"
              >
                <p className="text-sm text-deep-rose/80 font-medium">Psst... Havya 👀</p>
                {/* Bubble tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/80" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cat message after click */}
          <AnimatePresence>
            {catClicked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative mb-3 rounded-2xl bg-white/85 backdrop-blur-sm px-5 py-3 shadow-lg max-w-[260px]"
              >
                <p className="text-sm text-deep-rose/80 leading-relaxed">
                  We know you like cats... so obviously I had to be here. 🐱
                </p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/85" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Cat — clickable */}
          <motion.div
            onClick={handleCatClick}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ y: { duration: 3, repeat: Infinity } }}
          >
            <CuteCat mood={catMood} size={160} />
          </motion.div>

          {/* Hint to click */}
          {!catClicked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-3 flex flex-col items-center gap-1"
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2 L8 12 M4 8 L8 12 L12 8" stroke="#c77d8a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                </svg>
              </motion.div>
              <p className="text-sm text-deep-rose/60 font-medium">tap the cat!</p>
            </motion.div>
          )}
        </motion.div>

        {/* Button — only shows after cat interaction */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(200,125,138,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGo}
              className="group relative mt-2 overflow-hidden rounded-full bg-gradient-to-r from-blush to-soft-pink px-10 py-4 font-display text-lg text-deep-rose shadow-lg"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{buttonText}</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
