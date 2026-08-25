import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function EasterEgg() {
  const [show, setShow] = useState(false)
  const taps = useRef<number[]>([])

  useEffect(() => {
    function handleClick() {
      if (show) return
      const now = Date.now()
      taps.current.push(now)
      taps.current = taps.current.filter((t) => now - t < 2000)
      if (taps.current.length >= 10) {
        taps.current = []
        setShow(true)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setShow(false)}
          />
          <motion.div
            className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center max-w-xs"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>
            <p className="font-display text-xl mb-2">Stop poking me. 😂</p>
            <p className="text-sm text-gray-600">
              But also... you're the best, Havya. 🐱💗
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EasterEgg
