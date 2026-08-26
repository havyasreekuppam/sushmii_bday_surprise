import { motion } from 'framer-motion'
import FloatingElements from '../components/FloatingElements'
import CuteCat from '../components/CuteCat'
import { birthdayData } from '../data/birthdayData'

const CONFETTI_COLORS = ['#f5c6d0', '#e8b4d4', '#d4b8e8', '#fde8d8', '#ffe0cc', '#c77d8a', '#a78bfa', '#fbbf24', '#f9a8d4', '#86efac']

const BALLOON_COLORS = ['#f9a8d4', '#c4b5fd', '#fde68a', '#a5f3fc', '#fca5a5', '#d8b4fe', '#fbcfe8', '#bfdbfe']

// Balloons rising from bottom
const balloons = Array.from({ length: 12 }, (_, i) => ({
  x: 5 + ((i * 73 + 11) % 90),
  delay: ((i * 41 + 7) % 30) / 10,
  duration: 6 + ((i * 29) % 5),
  size: 30 + ((i * 13) % 15),
  color: BALLOON_COLORS[i % BALLOON_COLORS.length],
  sway: 15 + ((i * 19) % 20),
}))

// Generate confetti pieces that burst from top corners
const confettiPieces = Array.from({ length: 40 }, (_, i) => {
  const fromLeft = i % 2 === 0
  const angle = (((i * 37 + 13) % 60) + 15) * (fromLeft ? 1 : -1)
  const distance = 300 + ((i * 53) % 400)
  const rotateEnd = ((i * 71) % 720) - 360
  const size = 6 + ((i * 17) % 8)
  const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
  const delay = ((i * 23) % 30) / 30 * 0.5
  const isRound = i % 3 === 0

  const rad = (angle * Math.PI) / 180
  const xEnd = Math.sin(rad) * distance
  const yEnd = Math.cos(rad) * distance

  return { fromLeft, xEnd, yEnd, rotateEnd, size, color, delay, isRound }
})

export default function RevealScreen({ onNext }: { onNext: () => void }) {
  const { subtitle, buttonText } = birthdayData.reveal

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-soft-pink to-lavender">
      <FloatingElements type="mixed" density="medium" className="absolute inset-0" />

      {/* Balloons rising from bottom continuously */}
      {balloons.map((b, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="absolute pointer-events-none z-[5]"
          style={{ left: `${b.x}%`, bottom: -80 }}
          animate={{
            y: [0, -(typeof window !== 'undefined' ? window.innerHeight : 900) - 150],
            x: [0, b.sway, -b.sway * 0.5, b.sway * 0.7, 0],
          }}
          transition={{
            y: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: b.duration * 0.8, delay: b.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <svg width={b.size} height={b.size * 1.5} viewBox="0 0 40 60">
            {/* Balloon body */}
            <ellipse cx="20" cy="20" rx="15" ry="18" fill={b.color} opacity="0.8" />
            {/* Shine */}
            <ellipse cx="14" cy="14" rx="4" ry="6" fill="white" opacity="0.3" />
            {/* Knot */}
            <polygon points="18,38 22,38 20,41" fill={b.color} opacity="0.9" />
            {/* String */}
            <path d="M 20 41 Q 22 48 19 55 Q 21 58 20 60" fill="none" stroke="#b8a0a8" strokeWidth="0.7" opacity="0.5" />
          </svg>
        </motion.div>
      ))}

      {/* Party popper confetti burst from top corners */}
      {confettiPieces.map((piece, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none z-20"
          style={{
            top: 0,
            left: piece.fromLeft ? '5%' : undefined,
            right: piece.fromLeft ? undefined : '5%',
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: [0, piece.xEnd],
            y: [0, piece.yEnd],
            opacity: [0, 1, 1, 0],
            rotate: [0, piece.rotateEnd],
          }}
          transition={{
            duration: 2.5,
            delay: piece.delay + 0.3,
            ease: [0.2, 0.8, 0.4, 1],
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        >
          {piece.isRound ? (
            <div
              className="rounded-full"
              style={{ width: piece.size, height: piece.size, background: piece.color }}
            />
          ) : (
            <div
              style={{
                width: piece.size * 0.6,
                height: piece.size * 1.4,
                background: piece.color,
                borderRadius: 2,
              }}
            />
          )}
        </motion.div>
      ))}


      {/* Party bunting banner arch — full width corner to corner */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-10 w-full">
        <motion.svg
          width="100%"
          height="140"
          viewBox="0 0 1000 140"
          preserveAspectRatio="none"
          className="w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* String/rope of the bunting */}
          <path
            d="M 0 10 Q 250 110 500 100 Q 750 90 1000 10"
            fill="none"
            stroke="#c77d8a"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Second string */}
          <path
            d="M 0 0 Q 250 80 500 70 Q 750 60 1000 0"
            fill="none"
            stroke="#d4b8e8"
            strokeWidth="1.2"
            opacity="0.5"
          />

          {/* Flags on first string */}
          {Array.from({ length: 18 }, (_, i) => {
            const t = (i + 1) / 19
            const x = t * 1000
            const y = 10 + Math.sin(t * Math.PI) * 90 * (1 - Math.abs(t - 0.5) * 0.3)
            const colors = ['#f5c6d0', '#e8b4d4', '#d4b8e8', '#fde8d8', '#ffe0cc', '#f9a8d4', '#c4b5fd']
            const color = colors[i % colors.length]
            const flagHeight = 22 + (i % 3) * 4
            return (
              <motion.polygon
                key={`flag-${i}`}
                points={`${x - 8},${y} ${x + 8},${y} ${x},${y + flagHeight}`}
                fill={color}
                opacity="0.85"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.85 }}
                transition={{ delay: 0.5 + i * 0.06 }}
              />
            )
          })}

          {/* Smaller flags on second string */}
          {Array.from({ length: 14 }, (_, i) => {
            const t = (i + 1) / 15
            const x = t * 1000
            const y = Math.sin(t * Math.PI) * 70 * (1 - Math.abs(t - 0.5) * 0.3)
            const colors = ['#fde8d8', '#f5c6d0', '#d4b8e8', '#ffe0cc', '#e8b4d4']
            const color = colors[i % colors.length]
            const flagHeight = 16 + (i % 2) * 4
            return (
              <motion.polygon
                key={`flag2-${i}`}
                points={`${x - 6},${y} ${x + 6},${y} ${x},${y + flagHeight}`}
                fill={color}
                opacity="0.7"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 0.7 + i * 0.06 }}
              />
            )
          })}

          {/* Hanging fairy lights along first string */}
          {Array.from({ length: 22 }, (_, i) => {
            const t = (i + 0.5) / 22
            const x = t * 1000
            const stringY = 10 + Math.sin(t * Math.PI) * 90 * (1 - Math.abs(t - 0.5) * 0.3)
            const wireLength = 10 + (i % 3) * 5
            const bulbY = stringY + wireLength
            const glowColors = ['#fff4c8', '#ffe8f0', '#f0e8ff', '#fff0d0', '#ffe0ec']
            const glowColor = glowColors[i % glowColors.length]
            const bulbColor = i % 2 === 0 ? '#fff8e0' : '#ffe8f0'
            return (
              <motion.g key={`light-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.04 }}>
                {/* Wire */}
                <line x1={x} y1={stringY} x2={x} y2={bulbY} stroke="#8b7080" strokeWidth="0.8" opacity="0.4" />
                {/* Glow */}
                <motion.circle
                  cx={x}
                  cy={bulbY + 3}
                  r="6"
                  fill={glowColor}
                  opacity="0.4"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.15 }}
                />
                {/* Bulb */}
                <motion.ellipse
                  cx={x}
                  cy={bulbY + 3}
                  rx="3.5"
                  ry="4.5"
                  fill={bulbColor}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.15 }}
                />
                {/* Bulb cap */}
                <rect x={x - 2} y={bulbY - 1} width="4" height="3" rx="1" fill="#b8a0a8" opacity="0.6" />
              </motion.g>
            )
          })}
        </motion.svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-display tracking-widest text-deep-rose/70 uppercase md:text-base"
        >
          <span className="text-sm md:text-base">HAPPY </span>
          <span className="text-3xl md:text-4xl font-bold text-deep-rose/90">21<sup className="text-lg md:text-xl">st</sup></span>
          <span className="text-sm md:text-base"> BIRTHDAY</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2, type: 'spring', stiffness: 80 }}
          className="font-display text-6xl text-deep-rose drop-shadow-lg md:text-8xl"
        >
          HAVYA
        </motion.h1>

        {/* sparkles around name */}
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, delay: 1.8 + i * 0.2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute text-xl"
            style={{
              top: `${30 + Math.sin(i * 1.2) * 18}%`,
              left: `${35 + Math.cos(i * 1.5) * 28}%`,
            }}
          >
            ✦
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <CuteCat mood="happy" size={150} withCake />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="max-w-md text-deep-rose/80"
        >
          {subtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="group relative mt-2 cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-blush to-soft-pink px-8 py-4 font-display text-deep-rose shadow-lg"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative">{buttonText}</span>
        </motion.button>
      </div>
    </div>
  )
}
