import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type ChocolateMark = {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
}

const TRAIL_SPACING = 28
const MAX_MARKS = 24
const MARK_COLORS = ['#b98b78', '#c7959b', '#c6a17b']

export default function ChocolateCursor() {
  const [marks, setMarks] = useState<ChocolateMark[]>([])
  const idRef = useRef(0)
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  const distanceSinceMark = useRef(0)

  useEffect(() => {
    const pointerMedia = window.matchMedia('(pointer: fine)')
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')

    const root = document.documentElement
    const artwork = new Image()
    artwork.src = '/images/chocolate-cursor.svg'
    const resetTrail = () => {
      root.classList.remove('chocolate-cursor-active')
      lastPos.current = null
      distanceSinceMark.current = 0
    }
    const clearTrail = () => {
      resetTrail()
      setMarks([])
    }

    const makeMark = (x: number, y: number): ChocolateMark => {
      const id = idRef.current++
      return {
        id,
        x,
        y,
        rotation: Math.random() * 36 - 18,
        scale: 0.75 + Math.random() * 0.35,
        color: MARK_COLORS[Math.floor(Math.random() * MARK_COLORS.length)],
      }
    }

    const handleMove = (event: PointerEvent) => {
      if (!pointerMedia.matches || motionMedia.matches || event.pointerType === 'touch') {
        clearTrail()
        return
      }

      if (artwork.complete && artwork.naturalWidth > 0) {
        root.classList.add('chocolate-cursor-active')
      }

      const previous = lastPos.current
      lastPos.current = { x: event.clientX, y: event.clientY }
      if (!previous) return

      const dx = event.clientX - previous.x
      const dy = event.clientY - previous.y
      const distance = Math.hypot(dx, dy)
      if (!distance) return

      let offset = TRAIL_SPACING - distanceSinceMark.current
      const newMarks: ChocolateMark[] = []
      while (offset <= distance) {
        const progress = offset / distance
        newMarks.push(makeMark(previous.x + dx * progress, previous.y + dy * progress))
        offset += TRAIL_SPACING
      }
      if (newMarks.length) {
        setMarks((current) => [...current, ...newMarks].slice(-MAX_MARKS))
      }
      distanceSinceMark.current = (distanceSinceMark.current + distance) % TRAIL_SPACING
    }

    const handleLeave = () => {
      clearTrail()
    }

    const handleMediaChange = () => {
      if (!pointerMedia.matches || motionMedia.matches) clearTrail()
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerleave', handleLeave)
    pointerMedia.addEventListener('change', handleMediaChange)
    motionMedia.addEventListener('change', handleMediaChange)

    return () => {
      resetTrail()
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
      pointerMedia.removeEventListener('change', handleMediaChange)
      motionMedia.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[199]" aria-hidden="true">
      {marks.map((mark) => (
        <motion.svg
          key={mark.id}
          width="16"
          height="11"
          viewBox="0 0 24 16"
          className="absolute"
          style={{
            left: mark.x - 8,
            top: mark.y - 5.5,
            color: mark.color,
            transformOrigin: 'center',
          }}
          initial={{ opacity: 0, scale: mark.scale * 0.65, rotate: mark.rotation }}
          animate={{ opacity: [0, 0.2, 0.16, 0], scale: [mark.scale * 0.65, mark.scale, mark.scale, mark.scale * 0.8] }}
          transition={{ duration: 2.1, ease: 'easeOut' }}
          onAnimationComplete={() => setMarks((current) => current.filter((item) => item.id !== mark.id))}
        >
          <path
            d="M3 2.5h18a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 12V4A1.5 1.5 0 0 1 3 2.5Z"
            fill="currentColor"
          />
          <path d="M9 2.7v10.6M15 2.7v10.6M2 8h20" stroke="#fffaf7" strokeOpacity=".6" strokeWidth=".7" />
        </motion.svg>
      ))}
    </div>
  )
}
