import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MusicPlayer from './components/MusicPlayer'
import PawTrail from './components/PawTrail'
import LoadingScreen from './components/LoadingScreen'
import EasterEgg from './components/EasterEgg'
import ScrollProgress from './components/ScrollProgress'
import WaveDivider from './components/WaveDivider'
import { ChevronLeft } from 'lucide-react'
import { birthdayData } from './data/birthdayData'

const IntroScreen = lazy(() => import('./screens/IntroScreen'))
const RevealScreen = lazy(() => import('./screens/RevealScreen'))
const MemoryLane = lazy(() => import('./screens/MemoryLane'))
const SpecialThings = lazy(() => import('./screens/SpecialThings'))
const QuizScreen = lazy(() => import('./screens/QuizScreen'))
const LetterScreen = lazy(() => import('./screens/LetterScreen'))
const WishesScreen = lazy(() => import('./screens/WishesScreen'))
const GiftScreen = lazy(() => import('./screens/GiftScreen'))
const CatGame = lazy(() => import('./screens/CatGame'))
const FinaleScreen = lazy(() => import('./screens/FinaleScreen'))

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={onClick}
      className="fixed top-5 left-5 z-50 flex items-center gap-1 rounded-full bg-white/40 backdrop-blur-md px-3 py-2 text-sm text-deep-rose/70 shadow-sm hover:bg-white/60 transition-colors cursor-pointer"
      aria-label="Go back"
    >
      <ChevronLeft size={16} />
      Back
    </motion.button>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [started, setStarted] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!revealed) return
    birthdayData.photos.forEach(({ src }) => {
      const img = new Image()
      img.src = src
    })
  }, [revealed])

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <>
      <MusicPlayer />
      <PawTrail />
      <EasterEgg />
      <AnimatePresence mode="wait">
        {!started && (
          <Suspense fallback={null}>
            <IntroScreen key="intro" onNext={() => setStarted(true)} />
          </Suspense>
        )}
      </AnimatePresence>

      {started && !revealed && (
        <Suspense fallback={null}>
          <BackButton onClick={() => setStarted(false)} />
          <RevealScreen key="reveal" onNext={() => setRevealed(true)} />
        </Suspense>
      )}

      {started && revealed && (
        <Suspense fallback={null}>
          <BackButton onClick={() => setRevealed(false)} />
          <ScrollProgress />
          <main>
            <MemoryLane />
            <WaveDivider color="#f3eef8" />
            <SpecialThings />
            <WaveDivider color="#f8f0f5" flip />
            <QuizScreen />
            <LetterScreen />
            <WishesScreen />
            <WaveDivider color="#fff5ee" />
            <GiftScreen />
            <CatGame />
            <FinaleScreen />
          </main>
        </Suspense>
      )}
      </>}
    </div>
  )
}

export default App
