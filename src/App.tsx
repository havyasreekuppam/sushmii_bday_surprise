import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Activity, CheckCheck, ChevronLeft, ChevronRight, Flower2, Heart, Stethoscope, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import FloatingHearts from './components/FloatingHearts'
import ChocolateCursor from './components/ChocolateCursor'
import BackgroundMusic from './components/BackgroundMusic'
import TeddyCharacter from './components/TeddyCharacter'
import { birthdayData } from './data/birthdayData'

function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="relative z-10 w-full">{children}</div>
}

function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [bubbleVisible, setBubbleVisible] = useState(false)

  return (
    <AppShell>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="mb-3 text-[clamp(1.85rem,6vw,5rem)] font-normal tracking-[0.06em] text-[#8b5065]">
            {birthdayData.welcome.title}
          </h1>
          <p className="mb-3 text-lg text-[#8b5169] md:text-2xl">{birthdayData.welcome.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex flex-col items-center"
        >
          <div className="relative">
            <AnimatePresence>
              {bubbleVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 19 }}
                  className="welcome-speech-bubble absolute left-1/2 z-20 w-[min(280px,calc(100vw-3rem))] -translate-x-1/2 rounded-[22px] border border-[#f1d9df] bg-white/95 px-5 py-3 text-center text-sm text-[#87576a] shadow-[0_12px_28px_rgba(181,121,146,0.2)] md:w-[280px] md:text-base"
                >
                  {birthdayData.welcome.bubble}
                </motion.div>
              )}
            </AnimatePresence>
            <TeddyCharacter mood="happy" size={220} className="mx-auto" onClick={() => setBubbleVisible(true)} />
          </div>
          {!bubbleVisible && <p className="mt-3 text-sm text-[#9b6d7f]">Tap the teddy 🧸</p>}
          <AnimatePresence>
            {bubbleVisible && (
              <motion.button
                type="button"
                onClick={onEnter}
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="mt-7 rounded-full bg-[#d98da5] px-8 py-3 text-base text-white shadow-lg shadow-[#d98da5]/30 transition hover:scale-[1.04] md:px-10 md:py-4 md:text-lg"
              >
                {birthdayData.welcome.buttonText}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AppShell>
  )
}

function RevealScreen() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sceneRef, { once: true, amount: 0.2 })
  const reduceMotion = useReducedMotion()
  const confetti = Array.from({ length: 24 }, (_, index) => index)
  const balloons = Array.from({ length: 10 }, (_, index) => index)
  const balloonPositions = [5, 12, 19, 27, 35, 65, 73, 81, 89, 96]

  const garlandPath = 'M 0 5 C 155 9, 190 120, 600 138'
  const getGarlandPoint = (t: number) => {
    const inverse = 1 - t
    return {
      x: 3 * inverse * inverse * t * 155 + 3 * inverse * t * t * 190 + t * t * t * 600,
      y: 3 * inverse * inverse * t * 9 + 3 * inverse * t * t * 120 + t * t * t * 138 + inverse * inverse * inverse * 5,
    }
  }
  const getGarlandAngle = (t: number) => {
    const inverse = 1 - t
    const dx = 3 * inverse * inverse * 155 + 6 * inverse * t * (190 - 155) + 3 * t * t * (600 - 190)
    const dy = 3 * inverse * inverse * 4 + 6 * inverse * t * (120 - 9) + 3 * t * t * (138 - 120)
    return Math.atan2(dy, dx) * (180 / Math.PI)
  }

  return (
    <AppShell>
      <div ref={sceneRef} className="birthday-reveal relative mx-auto flex min-h-[78svh] max-w-6xl flex-col items-center justify-center overflow-hidden px-5 py-12 text-center">
        <motion.div
          className="birthday-garland birthday-garland-left"
          initial={reduceMotion ? false : { x: '-105%', opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 600 160" preserveAspectRatio="none">
            <path d={garlandPath} className="garland-string" />
            {Array.from({ length: 13 }, (_, index) => {
              const t = 0.06 + index * 0.073
              const point = getGarlandPoint(t)
              const angle = getGarlandAngle(t)
              return (
                <g key={index} transform={`translate(${point.x} ${point.y}) rotate(${angle})`}>
                  <path d="M-12 1 L12 1 L0 27 Z" className={`garland-flag garland-flag-${index % 4}`} />
                  <circle cx="0" cy="-7" r="3.2" className="garland-bulb" style={{ '--light-delay': `${1.05 + index * 0.055}s` } as React.CSSProperties} />
                </g>
              )
            })}
          </svg>
        </motion.div>
        <motion.div
          className="birthday-garland birthday-garland-right"
          initial={reduceMotion ? false : { x: '105%', opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 600 160" preserveAspectRatio="none">
            <g transform="translate(600 0) scale(-1 1)">
              <path d={garlandPath} className="garland-string" />
              {Array.from({ length: 13 }, (_, index) => {
                const t = 0.06 + index * 0.073
                const point = getGarlandPoint(t)
                const angle = getGarlandAngle(t)
                return (
                  <g key={index} transform={`translate(${point.x} ${point.y}) rotate(${angle})`}>
                    <path d="M-12 1 L12 1 L0 27 Z" className={`garland-flag garland-flag-${index % 4}`} />
                    <circle cx="0" cy="-7" r="3.2" className="garland-bulb" style={{ '--light-delay': `${1.05 + index * 0.055}s` } as React.CSSProperties} />
                  </g>
                )
              })}
            </g>
          </svg>
        </motion.div>
        {!reduceMotion && inView && confetti.map((piece) => (
          <motion.span
            key={piece}
            className={`birthday-confetti birthday-confetti-${piece % 5} birthday-confetti-shape-${piece % 3}`}
            style={{
              left: `${(piece * 41) % 100}%`,
              '--confetti-drift': `${piece % 2 === 0 ? 1 : -1}${12 + (piece * 7) % 40}px`,
            } as React.CSSProperties}
            initial={reduceMotion ? false : { y: '-8vh', x: 0, opacity: 0, rotate: 0 }}
            animate={inView ? {
              y: '105svh',
              x: [0, (piece % 2 === 0 ? 1 : -1) * (12 + (piece * 7) % 40), (piece % 2 === 0 ? -1 : 1) * (8 + (piece * 5) % 24)],
              opacity: piece < 16 ? [0, 0.8, 0.7, 0] : [0, 0.42, 0.3, 0],
              rotate: [0, piece % 2 === 0 ? 220 : -260],
            } : {}}
            transition={{
              duration: piece < 16 ? 3.5 + (piece % 4) * 0.35 : 6 + (piece % 3),
              delay: piece < 16 ? 1.5 + (piece % 8) * 0.055 : 5 + (piece % 8) * 0.32,
              repeat: piece < 16 ? 0 : 1,
              ease: 'linear',
            }}
            aria-hidden="true"
          />
        ))}
        {!reduceMotion && inView && balloons.map((balloon) => (
          <motion.span
            key={balloon}
            className={`birthday-balloon birthday-balloon-${balloon % 5}`}
            style={{
              left: `${balloonPositions[balloon]}%`,
              '--balloon-width': `${26 + (balloon % 3) * 5}px`,
              '--balloon-height': `${36 + (balloon % 3) * 7}px`,
            } as React.CSSProperties}
            initial={reduceMotion ? false : { y: '110svh', opacity: 0, x: 0 }}
            animate={inView ? {
              y: '-125px',
              opacity: [0, 0.82, 0.82, 0],
              x: [0, balloon % 2 === 0 ? 20 : -20, balloon % 2 === 0 ? -16 : 16, 0],
              rotate: [0, balloon % 2 === 0 ? 3 : -3, balloon % 2 === 0 ? -2 : 2, 0],
            } : {}}
            transition={{ duration: 8 + (balloon % 4) * 1.1, delay: 2 + balloon * 0.52, ease: 'linear' }}
            aria-hidden="true"
          />
        ))}
        <motion.div className="relative z-10 flex flex-col items-center">
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 2.5 }}
            className="mb-2 text-[clamp(1.7rem,4vw,3.2rem)] font-normal tracking-[0.04em] text-[#8b5065]"
          >
            HAPPY 19TH BIRTHDAY
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: reduceMotion ? 0 : 3 }}
            className="birthday-name mb-3 flex items-center justify-center gap-2 text-[#a75f7a]"
          >
            <span className="birthday-name-content">
              <span>SUSMIII...</span>
              <span className="birthday-name-emoji" aria-hidden="true">🥳</span>
            </span>
          </motion.p>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.94 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 180, damping: 16, delay: reduceMotion ? 0 : 3.7 }}>
            <TeddyCharacter mood="celebrate" size={170} />
          </motion.div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: reduceMotion ? 0 : 4.2 }}
            className="mx-auto mt-3 max-w-2xl text-base text-[#845767] md:text-xl"
          >
            {birthdayData.reveal.message}
          </motion.p>
        </motion.div>
      </div>
    </AppShell>
  )
}

function WarningMotif({ index }: { index: number }) {
  const motif = index % 4
  const common = { size: 18, strokeWidth: 1.35, className: 'text-[#b88796]' }
  if (motif === 0) return <Heart {...common} />
  if (motif === 1) return <Flower2 {...common} />
  if (motif === 2) {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-[#b88796]" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">
        <rect x="4" y="6" width="16" height="13" rx="2" />
        <path d="M9.3 6v4M14.7 6v4M4 12h16M9.3 12v7M14.7 12v7" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-[#b88796]" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">
      <circle cx="7" cy="7" r="3" /><circle cx="17" cy="7" r="3" />
      <path d="M4 19c0-4 3-7 8-7s8 3 8 7v1H4zM10 15h4" />
    </svg>
  )
}

function WarningsScreen() {
  const [revealed, setRevealed] = useState<number[]>([])
  const [approved, setApproved] = useState(false)

  const revealCard = (index: number) => {
    setRevealed((current) => (current.includes(index) ? current : [...current, index]))
  }

  return (
    <AppShell>
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-8 md:px-8 md:py-12">
        <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3 text-center text-3xl font-normal text-[#8b5065] md:text-5xl">
          {birthdayData.warnings.heading}
        </motion.h2>
        <p className="mb-8 text-center text-base text-[#80586d] md:text-xl">{birthdayData.warnings.subtitle}</p>

        <div className="grid w-full gap-5 md:grid-cols-2">
          {birthdayData.warnings.list.map((warning, index) => {
            const isRevealed = revealed.includes(index)
            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => revealCard(index)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[28px] border border-[#f0dcd6] bg-[rgba(255,255,255,0.74)] p-5 text-left shadow-[0_20px_32px_rgba(173,120,145,0.08)] backdrop-blur-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-display text-lg font-normal text-[#8b5065]">Warning {index + 1}</span>
                  <WarningMotif index={index} />
                </div>
                {isRevealed ? (
                  <div className="space-y-3">
                    <p className="text-base font-medium text-[#714d5d]">{warning.title}</p>
                    {warning.detail ? <p className="text-sm text-[#774e66]">{warning.detail}</p> : null}
                  </div>
                ) : (
                  <div className="flex min-h-[96px] items-center justify-center rounded-2xl bg-[#fef3f6] text-base font-medium text-[#9d6a7d]">
                    Tap to reveal
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-8 flex flex-col items-center gap-4">
          <label className="flex items-center gap-3 rounded-full bg-white/70 px-5 py-3 text-[#8a5368] shadow-md ring-1 ring-[#efd5dc]">
            <input
              type="checkbox"
              checked={approved}
              onChange={(event) => setApproved(event.target.checked)}
              className="h-4 w-4 accent-[#d98da5]"
            />
            <span className="text-base font-medium">{birthdayData.warnings.approvalText}</span>
          </label>

          {approved && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-[#8a5368]">
              <CheckCheck size={20} className="text-[#d98da5]" />
              <span className="text-sm font-medium">Approved with love 💗</span>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AppShell>
  )
}

function MusicScreen() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h2 className="text-3xl font-normal text-[#8b5065] md:text-5xl">{birthdayData.music.heading}</h2>
          <p className="mt-3 text-base text-[#8d5a6d] md:text-xl">{birthdayData.music.subtitle}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {birthdayData.music.songs.map((song, index) => (
            <motion.a
              key={song.song}
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${song.song} on Spotify`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              className="group block rounded-[26px] border border-[#f0d8d9] bg-white/75 p-5 shadow-[0_18px_32px_rgba(180,130,145,0.1)] backdrop-blur-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#61956a]"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#a46679]">A song for you</p>
                  <h3 className="mt-2 text-xl font-normal text-[#7b4257]">{song.dedication}</h3>
                </div>
                <span className="text-xl" aria-hidden="true">{song.emoji}</span>
              </div>
              <p className="mb-5 text-lg text-[#7d4b5d]">{song.song}</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d6e8d2] bg-[#f4fbf2] px-4 py-2.5 text-sm text-[#416746] transition group-hover:bg-[#eaf6e7]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M12 1.8a10.2 10.2 0 1 0 0 20.4 10.2 10.2 0 0 0 0-20.4Zm4.68 14.7a.63.63 0 0 1-.87.2c-2.4-1.47-5.42-1.8-8.98-.98a.63.63 0 1 1-.28-1.22c3.9-.9 7.25-.52 9.93 1.13a.63.63 0 0 1 .2.87Zm1.24-2.75a.8.8 0 0 1-1.1.26c-2.75-1.69-6.94-2.18-10.2-1.19a.8.8 0 1 1-.47-1.54c3.72-1.13 8.34-.58 11.5 1.36a.8.8 0 0 1 .27 1.1Zm.1-2.87c-3.3-1.96-8.74-2.14-11.9-1.18a.96.96 0 1 1-.56-1.84c3.64-1.1 9.7-.89 13.54 1.39a.96.96 0 0 1-1.08 1.63Z" />
                </svg>
                Listen on Spotify
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

function LoveLetterScreen() {
  const [opened, setOpened] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)

  const openEnvelope = () => {
    setOpened(true)
    window.setTimeout(() => setLetterVisible(true), 850)
  }

  return (
    <AppShell>
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-8 text-center md:py-12">
        <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-handwritten mb-7 text-[clamp(1.8rem,4vw,2.7rem)] font-normal text-[#b66d88]">
          A Little Piece of My Heart ❤️
        </motion.h2>

        <AnimatePresence mode="wait">
          {!letterVisible ? (
            <motion.div key="envelope" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }} className="romantic-envelope relative">
                <div className="envelope-letter-preview" />
                <div className={`envelope-flap ${opened ? 'is-open' : ''}`} />
                <div className={`envelope-seal ${opened ? 'is-open' : ''}`} aria-hidden="true">♥</div>
              </motion.div>
            <button
              type="button"
              onClick={openEnvelope}
              disabled={opened}
              className="mt-7 rounded-full bg-[#d98da5] px-8 py-3 text-base text-white shadow-[0_18px_30px_rgba(217,141,165,0.22)] transition hover:scale-[1.03] disabled:opacity-70"
            >
              Open the letter 💌
            </button>
            </motion.div>
          ) : (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 110, damping: 17 }}
              className="love-letter-paper w-full max-w-3xl rounded-[24px] border border-[#e9d8bd] p-6 text-left text-[#654b43] shadow-[0_25px_40px_rgba(140,105,83,0.16)] md:p-10"
            >
              <p className="letter-greeting mb-5 text-3xl text-[#9b5b70] md:text-4xl">{birthdayData.letter.split('\n\n')[0]}</p>
              <div className="love-letter-copy space-y-4">
                {birthdayData.letter.split('\n\n').slice(1).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  )
}

function PhotoMemoriesScreen() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const photoRows = [birthdayData.photos.slice(0, 3), birthdayData.photos.slice(3)]

  useEffect(() => {
    if (activePhoto === null) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null)
      if (event.key === 'ArrowRight') setActivePhoto((index) => index === null ? null : (index + 1) % birthdayData.photos.length)
      if (event.key === 'ArrowLeft') setActivePhoto((index) => index === null ? null : (index - 1 + birthdayData.photos.length) % birthdayData.photos.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhoto])

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center text-3xl font-normal text-[#8b5065] md:text-5xl">
          A few little memories...
        </motion.h2>

        <div className="space-y-8 md:space-y-10">
          {photoRows.map((row, rowIndex) => (
            <div className="polaroid-row relative" key={rowIndex}>
              <span className="polaroid-string" aria-hidden="true" />
              <div className="relative z-[1] flex gap-5 overflow-x-auto px-3 pb-4 pt-5 md:justify-center md:gap-8 md:overflow-visible">
                {row.map((photo, photoIndex) => {
                  const index = rowIndex === 0 ? photoIndex : photoIndex + 3
                  return (
                    <motion.figure
                      key={photo.src}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ delay: photoIndex * 0.08, duration: 0.55 }}
                      className="polaroid-frame relative shrink-0 border border-[#eee5e0] bg-white p-2 pb-4 shadow-[0_16px_25px_rgba(99,67,78,0.15)]"
                      style={{
                        width: 'clamp(180px, 20vw, 238px)',
                        '--photo-rotate': `${index % 2 === 0 ? -1.5 : 1.5}deg`,
                        '--photo-delay': `${(index % 3) * 0.45}s`,
                      } as React.CSSProperties}
                    >
                      <span className="polaroid-clip" aria-hidden="true" />
                      <button
                        type="button"
                        onClick={() => setActivePhoto(index)}
                        className="block w-full overflow-hidden bg-[#faf7f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c77d98]"
                        aria-label={`View Susmitha memory ${index + 1}: ${photo.caption}`}
                      >
                        <img
                          src={photo.src}
                          alt={`Susmitha memory ${index + 1}`}
                          className="h-56 w-full object-contain md:h-64"
                        />
                      </button>
                      <figcaption className="photo-caption mt-2 min-h-7 text-center text-xl text-[#7f5365]">{photo.caption}</figcaption>
                    </motion.figure>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {activePhoto !== null && (
            <motion.div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-[#3f2a36]/80 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`Susmitha memory ${activePhoto + 1}`}
            >
              <button type="button" onClick={() => setActivePhoto(null)} className="absolute right-4 top-4 rounded-full bg-white/80 p-3 text-[#7b4257]" aria-label="Close photo">
                <X size={22} />
              </button>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); setActivePhoto((index) => index === null ? null : (index - 1 + birthdayData.photos.length) % birthdayData.photos.length) }}
                className="absolute left-3 rounded-full bg-white/80 p-3 text-[#7b4257] md:left-8"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
              <motion.img
                key={activePhoto}
                src={birthdayData.photos[activePhoto].src}
                alt={`Susmitha memory ${activePhoto + 1}`}
                className="max-h-[85vh] max-w-[min(85vw,900px)] rounded-2xl object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(event) => event.stopPropagation()}
              />
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); setActivePhoto((index) => index === null ? null : (index + 1) % birthdayData.photos.length) }}
                className="absolute right-3 rounded-full bg-white/80 p-3 text-[#7b4257] md:right-8"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  )
}

function WishesScreen() {
  return (
    <AppShell>
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-8 md:px-8 md:py-12">
        <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-7 text-center text-3xl font-normal text-[#8b5065] md:text-5xl">
          {birthdayData.wishDetails.heading}
        </motion.h2>

        <div className="relative w-full max-w-2xl space-y-5">
          <span className="wishes-connector" aria-hidden="true"><Heart size={16} fill="currentColor" /></span>
          {birthdayData.wishDetails.list.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -3 }}
              className="relative z-[1] rounded-[22px] border border-[#f0d7dc] bg-[#fffdf9]/90 px-6 py-5 text-center shadow-[0_12px_24px_rgba(197,126,154,0.08)]"
            >
              <div className="mb-2 flex justify-center text-[#b77d91]">
                {index === 0 ? <Stethoscope size={22} strokeWidth={1.4} /> : <Activity size={22} strokeWidth={1.4} />}
              </div>
              <p className="text-lg text-[#6c3d50] md:text-xl">{wish}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

function LoveContractScreen() {
  const [signed, setSigned] = useState(false)

  return (
    <AppShell>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-8 md:px-8 md:py-12">
        <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 text-center text-3xl font-normal text-[#8b5065] md:text-4xl">
          {birthdayData.contract.heading}
        </motion.h2>

        <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="love-contract-paper relative w-full max-w-[540px] border border-[#dfd0bd] px-6 pb-7 pt-10 text-[#5d463e] shadow-[0_22px_34px_rgba(116,83,70,0.14)] md:px-10 md:pb-9 md:pt-12">
          <motion.div
            animate={signed ? { rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] } : {}}
            className="official-seal absolute -right-3 -top-4 flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full text-center text-[10px] font-medium uppercase leading-tight tracking-[0.12em] text-white shadow-lg md:-right-5 md:-top-5 md:h-[86px] md:w-[86px]"
            aria-label="Official seal"
          >
            <span>Official</span><span>Seal</span>
          </motion.div>
          <ol className="space-y-3 pr-2 text-[0.98rem] leading-7 md:text-base md:leading-7">
            {birthdayData.contract.content.slice(0, 5).map((item, index) => (
              <li key={index} className="pl-1">{item}</li>
            ))}
          </ol>

          <div className="contract-divider"><span>♡</span></div>
          <h3 className="mb-3 text-center text-xl font-normal text-[#8b5065]">{birthdayData.terms.heading}</h3>
          <ol className="space-y-2 text-[0.93rem] leading-6 md:text-[0.98rem]">
            {birthdayData.terms.list.map((item, index) => <li key={index}>{item}</li>)}
          </ol>

          <div className="mt-6 border-t border-dashed border-[#d9c6b7] pt-5 text-center">
            <p className="font-handwritten text-2xl text-[#9b5b70]">Signed with love,</p>
            <p className="mt-1 text-[#735b50]">Your favourite person.</p>
          </div>
          <div className="mt-5 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setSigned(true)}
              className="rounded-full bg-[#d98da5] px-7 py-3 text-base text-white shadow-[0_18px_30px_rgba(217,141,165,0.22)] transition hover:scale-[1.03]"
            >
              {birthdayData.contract.buttonText}
            </button>

            {signed && (
              <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} className="signed-stamp text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.16em]">Signed with love 💗</span>
                <p className="mt-1 text-xs">This promise is sealed forever</p>
              </motion.div>
            )}
          </div>
        </motion.article>
      </div>
    </AppShell>
  )
}

function ChocolateShape() {
  return (
    <span className="chocolate-bar-art" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => <span key={index} />)}
    </span>
  )
}

function TeddyGameScreen() {
  const [fedIds, setFedIds] = useState<number[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [flight, setFlight] = useState<{ id: number; left: number; top: number; dx: number; dy: number } | null>(null)
  const [touchMode, setTouchMode] = useState(false)
  const teddyRef = useRef<HTMLDivElement>(null)
  const chocolateRefs = useRef(new Map<number, HTMLButtonElement>())
  const fedSetRef = useRef(new Set<number>())
  const dragRef = useRef<{ id: number; x: number; y: number } | null>(null)
  const suppressClickRef = useRef(false)
  const flightRef = useRef(flight)

  useEffect(() => {
    const pointer = window.matchMedia('(pointer: coarse)')
    const updatePointerMode = () => setTouchMode(pointer.matches)
    updatePointerMode()
    pointer.addEventListener('change', updatePointerMode)
    return () => pointer.removeEventListener('change', updatePointerMode)
  }, [])

  useEffect(() => {
    flightRef.current = flight
  }, [flight])

  const feedChocolate = (id: number) => {
    if (fedSetRef.current.has(id) || flightRef.current) return
    const chocolate = chocolateRefs.current.get(id)
    const teddy = teddyRef.current
    if (!chocolate || !teddy) return
    const source = chocolate.getBoundingClientRect()
    const target = teddy.getBoundingClientRect()
    setSelectedId(null)
    const nextFlight = {
      id,
      left: source.left + source.width / 2 - 20,
      top: source.top + source.height / 2 - 16,
      dx: target.left + target.width / 2 - source.left - source.width / 2,
      dy: target.top + target.height * 0.34 - source.top - source.height / 2,
    }
    flightRef.current = nextFlight
    setFlight(nextFlight)
  }

  useEffect(() => {
    const handlePointerUp = (event: PointerEvent) => {
      const drag = dragRef.current
      dragRef.current = null
      if (!drag) return
      const distance = Math.hypot(event.clientX - drag.x, event.clientY - drag.y)
      if (distance < 12) return
      suppressClickRef.current = true
      window.setTimeout(() => { suppressClickRef.current = false }, 0)
      if (document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-teddy-dropzone]')) {
        feedChocolate(drag.id)
      }
    }
    window.addEventListener('pointerup', handlePointerUp)
    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [])

  const fed = fedIds.length
  const chocolates = [0, 1, 2, 3, 4]

  return (
    <AppShell>
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-8 md:px-8 md:py-12">
        <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 text-center text-3xl font-normal text-[#8b5065] md:text-5xl">
          Feed the teddy 🍫🧸
        </motion.h2>

        <div className="relative w-full max-w-3xl rounded-[30px] border border-[#f1d7db] bg-[linear-gradient(180deg,_#fffaf8,_#f8edf2)] p-5 shadow-[0_24px_40px_rgba(181,121,146,0.12)] md:p-8">
          <div className="mb-3 flex items-center justify-between text-[#7b4257]">
            <div className="text-sm font-medium uppercase tracking-[0.18em]">Heart count</div>
            <motion.div key={fed} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="rounded-full bg-[#f7e7eb] px-4 py-2 text-base font-normal" aria-live="polite">
              {fed}/5 💗
            </motion.div>
          </div>

          <div className="relative flex justify-center">
            {fed > 0 && <motion.span key={fed} className="feed-heart" initial={{ opacity: 0, y: 16, scale: 0.4 }} animate={{ opacity: [0, 1, 0], y: -65, scale: [0.5, 1.15, 0.8] }} transition={{ duration: 1.25 }} aria-hidden="true">♥</motion.span>}
            <div ref={teddyRef} data-teddy-dropzone className="relative z-[1] rounded-full" aria-label="Teddy drop target">
              <TeddyCharacter
                mood={fed >= 5 ? 'celebrate' : fed > 0 ? 'happy' : 'shy'}
                size={200}
                ariaLabel="Teddy; activate to feed the selected chocolate"
                onClick={() => {
                  if (suppressClickRef.current) {
                    suppressClickRef.current = false
                    return
                  }
                  if (selectedId !== null) feedChocolate(selectedId)
                }}
              />
            </div>
          </div>

          <p className="mt-1 text-center text-sm text-[#8b6573]" aria-live="polite">
            {touchMode ? 'Tap a chocolate to feed your teddy' : 'Drag a chocolate to teddy, or select one and click teddy'}
          </p>
          <div className="mt-4 flex min-h-24 flex-wrap items-center justify-center gap-3 rounded-[22px] border border-[#f2d9df] bg-white/45 p-4 md:gap-6">
            {chocolates.filter((id) => !fedIds.includes(id) && flight?.id !== id).map((id) => (
              <motion.button
                key={id}
                type="button"
                ref={(element) => {
                  if (element) chocolateRefs.current.set(id, element)
                  else chocolateRefs.current.delete(id)
                }}
                onPointerDown={(event) => {
                  if (!touchMode && event.button === 0) dragRef.current = { id, x: event.clientX, y: event.clientY }
                }}
                onClick={() => {
                  if (suppressClickRef.current) {
                    suppressClickRef.current = false
                    return
                  }
                  if (touchMode) feedChocolate(id)
                  else setSelectedId(id)
                }}
                whileHover={{ y: -3, rotate: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`chocolate-piece rounded-lg p-2 transition ${selectedId === id ? 'selected-chocolate' : ''}`}
                aria-label={`Chocolate ${id + 1}${selectedId === id ? ', selected; click teddy to feed' : ''}`}
                aria-pressed={selectedId === id}
              >
                <ChocolateShape />
              </motion.button>
            ))}
          </div>

          {flight && createPortal(
            <motion.div
              className="chocolate-flight"
              style={{ left: flight.left, top: flight.top }}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{ x: flight.dx, y: flight.dy, scale: 0.15, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeIn' }}
              onAnimationComplete={() => {
                if (!flightRef.current || flightRef.current.id !== flight.id) return
                fedSetRef.current.add(flight.id)
                setFedIds(Array.from(fedSetRef.current))
                flightRef.current = null
                setFlight(null)
              }}
            >
              <ChocolateShape />
            </motion.div>,
            document.body,
          )}

          {fed >= 5 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-5 text-center text-[#7b4257]">
              <div className="mb-1 text-2xl">🎉💗</div>
              <p className="text-lg">The teddy is full and glowing with happiness! You made its little heart so happy. 🧸</p>
            </motion.div>
          )}
        </div>
      </div>
    </AppShell>
  )
}

function FinaleScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <AppShell>
      <div className="flex min-h-[72svh] flex-col items-center justify-center px-5 py-10 text-center">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <h2 className="mx-auto max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-normal leading-tight text-[#8b5065]">
            {birthdayData.finale.heading}
          </h2>
          <div className="my-3 flex justify-center">
            <TeddyCharacter mood="celebrate" size={175} />
          </div>
          <p className="mx-auto max-w-2xl text-lg text-[#7e5365] md:text-xl">{birthdayData.finale.message}</p>
          <p className="mt-2 text-base text-[#7e5365] md:text-lg">{birthdayData.finale.closing}</p>
          <p className="font-handwritten mt-4 text-2xl text-[#b66d88] md:text-3xl">{birthdayData.finale.signature}</p>
          <p className="mt-1 text-2xl font-normal text-[#8b5065] md:text-3xl">{birthdayData.finale.sender}</p>
          <p className="mt-2 text-lg text-[#7e5365] md:text-xl">{birthdayData.finale.date}</p>
          <button
            type="button"
            onClick={onRestart}
            className="mt-6 rounded-full bg-[#d98da5] px-8 py-3 text-base text-white shadow-[0_18px_30px_rgba(217,141,165,0.22)] transition hover:scale-[1.03]"
          >
            {birthdayData.finale.buttonText}
          </button>
        </motion.div>
      </div>
    </AppShell>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [finaleComplete, setFinaleComplete] = useState(0)
  const [finaleVisible, setFinaleVisible] = useState(false)
  const revealRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.title = 'Happy 19th Birthday Susmitha 💗'
  }, [])

  const enterExperience = () => {
    setEntered(true)
    window.setTimeout(() => revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const restartExperience = () => {
    setFinaleVisible(false)
    setFinaleComplete((count) => count + 1)
    setEntered(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sharedProps = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 },
    transition: { duration: 0.7, ease: 'easeOut' as const },
    className: 'relative z-10 scroll-mt-6 py-5 md:py-8',
  }

  return (
    <main className="birthday-background relative min-h-screen overflow-hidden text-[#4b3947]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <FloatingHearts />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <span className="absolute left-5 top-6 text-lg text-[#d9a8b8]/45">✿</span>
        <span className="absolute right-7 top-16 text-sm text-[#c2afd9]/55">✦</span>
        <span className="absolute bottom-10 left-8 text-sm text-[#c2afd9]/55">✧</span>
        <span className="absolute bottom-8 right-6 text-lg text-[#d9a8b8]/45">❀</span>
      </div>
      <BackgroundMusic screen={finaleVisible ? 'finale' : entered ? 'story' : 'welcome'} songActive={false} finaleComplete={finaleComplete} />
      <ChocolateCursor />
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <WelcomeScreen onEnter={enterExperience} />
          </motion.div>
        ) : (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <motion.section id="reveal" ref={revealRef} {...sharedProps}>
              <RevealScreen />
            </motion.section>
            <motion.section id="warnings" {...sharedProps}>
              <WarningsScreen />
            </motion.section>
            <motion.section id="music" {...sharedProps}>
              <MusicScreen />
            </motion.section>
            <motion.section id="letter" {...sharedProps}>
              <LoveLetterScreen />
            </motion.section>
            <motion.section id="memories" {...sharedProps}>
              <PhotoMemoriesScreen />
            </motion.section>
            <motion.section id="wishes" {...sharedProps}>
              <WishesScreen />
            </motion.section>
            <motion.section id="contract" {...sharedProps}>
              <LoveContractScreen />
            </motion.section>
            <motion.section id="game" {...sharedProps}>
              <TeddyGameScreen />
            </motion.section>
            <motion.section id="finale" {...sharedProps} onViewportEnter={() => setFinaleVisible(true)} onViewportLeave={() => setFinaleVisible(false)}>
              <FinaleScreen onRestart={restartExperience} />
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
