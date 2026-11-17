import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        id: index,
        left: 5 + ((index * 17) % 90),
        delay: (index * 0.7) % 6,
        duration: 15 + (index % 7),
        size: 10 + (index % 4) * 3,
        drift: 12 + (index % 7) * 6,
        opacity: 0.08 + (index % 4) * 0.035,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-10%]"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -480, -600],
            x: [0, heart.drift, -heart.drift, 0],
            rotate: [0, 18, -18, 0],
            scale: [0.9, 1.2, 1],
            opacity: [0, heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: heart.delay,
          }}
        >
          <span style={{ fontSize: `${heart.size}px` }}>💗</span>
        </motion.div>
      ))}
    </div>
  )
}
