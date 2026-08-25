import { useEffect, useRef, useState } from 'react'

interface PawPrint {
  id: number
  x: number
  y: number
}

export default function PawTrail() {
  const [prints, setPrints] = useState<PawPrint[]>([])
  const idRef = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 25) {
        lastPos.current = { x: e.clientX, y: e.clientY }
        const id = idRef.current++
        setPrints(prev => [...prev.slice(-20), { id, x: e.clientX, y: e.clientY }])

        setTimeout(() => {
          setPrints(prev => prev.filter(p => p.id !== id))
        }, 1500)
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  if (prints.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {prints.map(p => (
        <svg
          key={p.id}
          width="30"
          height="30"
          viewBox="0 0 32 32"
          className="absolute animate-[fadeOut_1.5s_ease-out_forwards]"
          style={{ left: p.x - 15, top: p.y - 15 }}
        >
          <ellipse cx="16" cy="21" rx="6" ry="5" fill="#c77d8a" opacity="0.35" />
          <circle cx="11" cy="12" r="3" fill="#c77d8a" opacity="0.35" />
          <circle cx="16" cy="9" r="2.8" fill="#c77d8a" opacity="0.35" />
          <circle cx="21" cy="12" r="3" fill="#c77d8a" opacity="0.35" />
          <circle cx="7" cy="16" r="2.5" fill="#c77d8a" opacity="0.35" />
        </svg>
      ))}
    </div>
  )
}
