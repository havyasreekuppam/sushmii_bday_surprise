import { motion } from 'framer-motion'
import { useState } from 'react'

export type TeddyMood = 'idle' | 'wave' | 'happy' | 'shy' | 'eat' | 'celebrate'

export default function TeddyCharacter({
  mood = 'idle',
  size = 210,
  className = '',
  onClick,
  ariaLabel,
}: {
  mood?: TeddyMood
  size?: number
  className?: string
  onClick?: () => void
  ariaLabel?: string
}) {
  const [delighted, setDelighted] = useState(false)
  const isExcited = mood === 'happy' || mood === 'celebrate' || delighted
  const isWaving = mood === 'wave'

  return (
    <motion.button
      type="button"
      className={`block border-0 bg-transparent p-0 leading-none ${className}`}
      aria-label={ariaLabel ?? (onClick ? 'Tap the teddy to see a message' : 'Make the teddy bounce')}
      style={{ width: size, height: size * (500 / 420), maxWidth: '100%' }}
      animate={
        isExcited
          ? { y: [0, -8, 0], rotate: [0, -1.5, 1.5, 0], scale: [1, 1.015, 1] }
          : isWaving
            ? { y: [0, -2, 0], rotate: [0, -2.5, 2.5, 0] }
            : { y: [0, -2, 0], rotate: [0, -0.5, 0.5, 0], scale: [1, 1.008, 1] }
      }
      transition={{
        duration: isExcited ? 0.75 : isWaving ? 1.8 : 4.5,
        repeat: isExcited ? 1 : Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
      onClick={() => {
        setDelighted(true)
        window.setTimeout(() => setDelighted(false), 850)
        onClick?.()
      }}
    >
      <img
        src="/images/susmitha-teddy.png?v=clean-outline"
        alt=""
        draggable={false}
        className="h-full w-full select-none object-contain"
      />
    </motion.button>
  )
}
