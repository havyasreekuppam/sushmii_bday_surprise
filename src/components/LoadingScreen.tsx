import { useEffect } from 'react'
import { motion } from 'framer-motion'

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-cream via-baby-pink to-lavender"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cat face SVG */}
      <svg width="80" height="80" viewBox="0 0 80 80" className="mb-6">
        {/* Ears */}
        <polygon points="15,30 25,5 35,30" fill="#f9a8d4" />
        <polygon points="45,30 55,5 65,30" fill="#f9a8d4" />
        {/* Head */}
        <ellipse cx="40" cy="48" rx="28" ry="24" fill="#fde68a" />
        {/* Eyes - blink animation via CSS */}
        <ellipse cx="30" cy="44" rx="4" ry="5" fill="#1f2937" className="animate-blink" />
        <ellipse cx="50" cy="44" rx="4" ry="5" fill="#1f2937" className="animate-blink" />
        {/* Nose */}
        <polygon points="38,52 42,52 40,55" fill="#f472b6" />
        {/* Mouth */}
        <path d="M36,57 Q40,61 44,57" fill="none" stroke="#1f2937" strokeWidth="1.5" />
        {/* Whiskers */}
        <line x1="10" y1="50" x2="26" y2="50" stroke="#9ca3af" strokeWidth="1" />
        <line x1="10" y1="54" x2="26" y2="53" stroke="#9ca3af" strokeWidth="1" />
        <line x1="54" y1="50" x2="70" y2="50" stroke="#9ca3af" strokeWidth="1" />
        <line x1="54" y1="53" x2="70" y2="54" stroke="#9ca3af" strokeWidth="1" />
      </svg>

      {/* Loading text */}
      <motion.p
        className="font-display text-xl text-deep-rose/80 mb-4"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading your surprise...
      </motion.p>

      {/* Pulsing dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-deep-rose/60"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Blink keyframes */}
      <style>{`
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        .animate-blink {
          animation: blink 3s infinite;
          transform-origin: center;
        }
      `}</style>
    </motion.div>
  )
}

export default LoadingScreen
