import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CuteCat from '../components/CuteCat'
import FloatingElements from '../components/FloatingElements'

const CAT_ESCAPE_MESSAGES = [
  ["Okay okay... I'll let you feed me. 🥺", "Hehe... too slow! 🐱💨"],
  ["Hmm... maybe not. 😼", "You thought I'd make it that easy? 😂"],
  ["Come onnnn...", "You really thought I'd stay there? 😂"],
  ["Almosttttt! 🐱💨", "Catch me if you can! 💨"],
  ["Okay okay, you win! 😭❤️", ""],
]

const SUCCESS_MESSAGES = [
  "Yummm! 🐱❤️",
  "That was good! More please! 😋",
  "Okay you're getting better at this 😼",
  "Almost done! One more! 🍰",
  "PERFECT. I'm full! 🐱💗",
]

type GamePhase = 'intro' | 'cut' | 'play' | 'success' | 'done'

export default function CatGame() {
  const [phase, setPhase] = useState<GamePhase>('intro')
  const [round, setRound] = useState(0)
  const [catPos, setCatPos] = useState({ x: 150, y: 80 })
  const [slicePos, setSlicePos] = useState<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [catSpeech, setCatSpeech] = useState("Havya! I'm hungry... 🥺")
  const [escapes, setEscapes] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [catMood, setCatMood] = useState<'idle' | 'happy' | 'excited'>('idle')
  const containerRef = useRef<HTMLDivElement>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const total = 5

  function getRandomPos(avoidX?: number, avoidY?: number) {
    const w = containerRef.current?.offsetWidth ?? 300
    const h = containerRef.current?.offsetHeight ?? 350
    let x: number, y: number
    let attempts = 0
    do {
      x = 20 + Math.random() * (w - 120)
      y = 20 + Math.random() * (h - 120)
      attempts++
    } while (avoidX !== undefined && Math.abs(x - avoidX) < 80 && Math.abs(y - (avoidY ?? 0)) < 80 && attempts < 20)
    return { x, y }
  }

  const startRound = useCallback(() => {
    const pos = getRandomPos()
    setCatPos(pos)
    setCatSpeech(CAT_ESCAPE_MESSAGES[Math.min(round, 4)][0])
    setCatMood('idle')
    setEscapes(0)
    setSlicePos(null)
    setDragging(false)
    setShowSuccess(false)
  }, [round])

  function handleCutCake() {
    setPhase('play')
    startRound()
  }

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (showSuccess) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (slicePos && Math.abs(x - slicePos.x) < 40 && Math.abs(y - slicePos.y) < 40) {
      setDragging(true)
      dragOffset.current = { x: x - slicePos.x, y: y - slicePos.y }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    } else if (!slicePos) {
      setSlicePos({ x, y })
      setDragging(true)
      dragOffset.current = { x: 0, y: 0 }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
  }, [slicePos, showSuccess])

  const feedCat = useCallback(() => {
    setDragging(false)
    setShowSuccess(true)
    setCatMood('happy')
    setCatSpeech(SUCCESS_MESSAGES[round])
    setSlicePos({ x: catPos.x + 20, y: catPos.y + 40 })

    setTimeout(() => {
      if (round + 1 >= total) {
        setPhase('success')
      } else {
        setRound(r => r + 1)
      }
    }, 1800)
  }, [catPos.x, catPos.y, round])

  const escapeCat = useCallback((fromX: number, fromY: number) => {
    const maxEscapes = round < 4 ? 2 + round : 2
    if (escapes >= maxEscapes) {
      feedCat()
      return
    }
    setEscapes(e => e + 1)
    const newPos = getRandomPos(fromX, fromY)
    setCatPos(newPos)
    setCatMood('excited')
    const msgs = CAT_ESCAPE_MESSAGES[Math.min(round, 4)]
    setCatSpeech(msgs[1] || msgs[0])
    setTimeout(() => setCatMood('idle'), 800)
  }, [escapes, feedCat, round])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(rect.width - 30, e.clientX - rect.left - dragOffset.current.x))
    const y = Math.max(0, Math.min(rect.height - 30, e.clientY - rect.top - dragOffset.current.y))
    setSlicePos({ x, y })

    const dist = Math.sqrt((x - catPos.x - 30) ** 2 + (y - catPos.y - 30) ** 2)

    if (dist < 60) {
      if (round === 4 && escapes >= 1) {
        feedCat()
      } else {
        escapeCat(x, y)
      }
    }
  }, [dragging, catPos.x, catPos.y, round, escapes, escapeCat, feedCat])

  const handlePointerUp = useCallback(() => {
    setDragging(false)
  }, [])

  // INTRO
  if (phase === 'intro') {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff5ee] to-[#fef5ff] px-6 py-20">
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CuteCat mood="excited" size={140} />
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm px-5 py-3 shadow-md max-w-[280px]">
            <p className="text-sm text-gray-700">Havya! I'm SO hungry... 🥺 Will you feed me birthday cake?</p>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-deep-rose">Feed the Cat! 🎂</h2>
          <p className="text-sm text-gray-500 max-w-xs">Cut a cake slice and drag it to the cat. But careful... this cat is a little mischievous. 😼</p>
          <motion.button
            className="group relative overflow-hidden mt-4 px-8 py-3 bg-gradient-to-r from-blush to-soft-pink rounded-full font-display text-deep-rose shadow-lg text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPhase('cut')}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Let's go! 🍰</span>
          </motion.button>
        </motion.div>
      </section>
    )
  }

  // CUT THE CAKE
  if (phase === 'cut') {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff5ee] to-[#fef5ff] px-6 py-20">
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="font-display text-xl text-deep-rose">Cut a slice for the hungry cat 🎂</p>
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCutCake}
          >
            <svg width="160" height="110" viewBox="0 0 160 110">
              <rect x="20" y="50" width="120" height="40" rx="5" fill="#fde8d8" />
              <rect x="15" y="44" width="130" height="14" rx="7" fill="#f5c6d0" />
              <rect x="35" y="25" width="90" height="22" rx="5" fill="#fde8d8" />
              <rect x="30" y="20" width="100" height="10" rx="5" fill="#e8b4d4" />
              {[50, 70, 90, 110].map((cx, i) => (
                <g key={i}>
                  <rect x={cx} y="6" width="4" height="14" rx="2" fill="#ffe0b2" />
                  <circle cx={cx + 2} cy="5" r="3" fill="#ff9800" opacity="0.8" />
                  <circle cx={cx + 2} cy="4" r="2" fill="#ffeb3b" />
                </g>
              ))}
              {/* Knife hint */}
              <motion.g animate={{ y: [0, 3, 0], rotate: [0, 2, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <rect x="75" y="35" width="2" height="40" fill="#b0b0b0" rx="1" />
                <rect x="70" y="32" width="12" height="6" rx="2" fill="#8b6f47" />
              </motion.g>
            </svg>
          </motion.div>
          <motion.p
            className="text-sm text-deep-rose/60"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✂️ tap the cake to cut!
          </motion.p>
        </motion.div>
      </section>
    )
  }

  // SUCCESS / DONE
  if (phase === 'success' || phase === 'done') {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff5ee] to-[#fef5ff] px-6 py-20 relative overflow-hidden">
        <FloatingElements type="confetti" density="high" />
        <motion.div
          className="flex flex-col items-center gap-5 text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <CuteCat mood="happy" size={170} withCake />
          </motion.div>

          <motion.p
            className="font-display text-3xl md:text-4xl text-deep-rose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            YOU DID IT! 🎉🐱
          </motion.p>

          <motion.div
            className="rounded-2xl bg-white/85 backdrop-blur-sm px-5 py-3 shadow-md max-w-[280px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-gray-700">Okay Havya... you're officially my favourite human. 🐱💗</p>
            <p className="text-sm text-gray-700 mt-2 font-medium">Happy Birthday! 🎂</p>
          </motion.div>

          <motion.p
            className="text-sm text-gray-500 mt-4 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            The cat has officially been fed. And since you were patient enough to catch that little troublemaker...
          </motion.p>

          {[0, 1, 2, 3, 4].map(i => (
            <motion.span
              key={i}
              className="absolute text-lg pointer-events-none"
              style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              💗
            </motion.span>
          ))}
        </motion.div>
      </section>
    )
  }

  // PLAY PHASE
  return (
    <section className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#fff5ee] to-[#fef5ff] px-4 py-8">
      {/* Score */}
      <div className="mb-3 text-center">
        <p className="font-display text-lg text-deep-rose">🐱 Cake chase: {round + 1} / {total}</p>
        <p className="text-xs text-gray-400 mt-1">Drag the cake slice to the cat!</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i < round ? 'bg-rose-gold' : i === round ? 'bg-soft-pink animate-pulse' : 'bg-pink-100'}`} />
        ))}
      </div>

      {/* Play area */}
      <div
        ref={containerRef}
        className="relative w-full max-w-md h-[55vh] bg-white/40 backdrop-blur-sm rounded-2xl border border-pink-100 shadow-inner overflow-hidden touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Cat */}
        <motion.div
          className="absolute"
          animate={{ left: catPos.x, top: catPos.y }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        >
          <CuteCat mood={catMood} size={80} />
        </motion.div>

        {/* Cat speech bubble */}
        <motion.div
          key={catSpeech}
          className="absolute top-2 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-xl bg-white/90 px-3 py-1.5 shadow-sm text-xs text-gray-600 whitespace-nowrap">
            {catSpeech}
          </div>
        </motion.div>

        {/* Cake slice (draggable) */}
        {slicePos && (
          <motion.div
            className="absolute z-20 text-3xl select-none"
            style={{ left: slicePos.x - 15, top: slicePos.y - 15 }}
            animate={showSuccess ? { scale: [1, 0.5, 0], opacity: [1, 1, 0] } : {}}
            transition={{ duration: 0.6 }}
          >
            🍰
          </motion.div>
        )}

        {/* Tap hint if no slice yet */}
        {!slicePos && !showSuccess && (
          <motion.p
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            tap anywhere to place cake 🍰
          </motion.p>
        )}

        {/* Success overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.p
                className="text-2xl font-display text-deep-rose"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
              >
                {SUCCESS_MESSAGES[round]}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
