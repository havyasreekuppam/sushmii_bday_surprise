import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import CuteCat from '../components/CuteCat';
import FloatingElements from '../components/FloatingElements';

const CARD_ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5]
const CARD_DECORATIONS = ['✿', '✦', '♪', '❀', '☆', '♫', '✧', '♡']

const CAT_SPEECH: Record<number, string> = {
  0: "This energy is contagious. 😄",
  1: "The drama... it's giving Oscar. 🎭",
  2: "Why are we awake? 🌙",
  3: "Yep. This one is definitely her. 😭",
  4: "Protect her at all costs. 🥺",
  5: "She means business. 💅",
  6: "Finally... my kind of energy. 😴",
  7: "Us forever. No take-backs. 💜",
}

const CAT_MOODS: Record<number, 'happy' | 'excited' | 'sleepy' | 'idle' | 'judging' | 'disappointed'> = {
  0: 'happy',
  1: 'excited',
  2: 'sleepy',
  3: 'excited',
  4: 'idle',
  5: 'happy',
  6: 'sleepy',
  7: 'happy',
}

export default function QuizScreen() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    setSelectedIdx(selectedIdx === i ? null : i)
  }

  return (
    <section className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f3eeff] via-[#fef5f9] to-[#ffecd2] px-4 py-16 md:py-20 relative overflow-hidden">
      <FloatingElements type="sparkles" density="low" />

      {/* Floating music notes */}
      {['♪', '♫', '♩', '♬', '♪'].map((note, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute pointer-events-none text-purple-300/30 text-lg"
          style={{ left: `${15 + i * 18}%`, top: `${10 + (i * 23) % 60}%` }}
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
        >
          {note}
        </motion.div>
      ))}

      {/* Header */}
      <motion.h2
        className="font-display text-2xl md:text-3xl text-center mb-3 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Havya has a BTS song for literally everything 💜
      </motion.h2>

      <motion.p
        className="text-sm md:text-base text-gray-500 mb-8 text-center italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Pick a version of Havya... I'll pick the song.
      </motion.p>

      {/* Cat with speech bubble */}
      <motion.div
        className="flex flex-col items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        {/* Speech bubble */}
        <motion.div
          className="relative mb-3 rounded-2xl bg-white/85 backdrop-blur-sm px-4 py-2.5 shadow-md max-w-[260px]"
          key={selectedIdx ?? 'default'}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs md:text-sm text-gray-700 text-center">
            {selectedIdx !== null ? CAT_SPEECH[selectedIdx] : "Okay... which Havya are we dealing with today? 🐱"}
          </p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/85" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <CuteCat
            mood={selectedIdx !== null ? CAT_MOODS[selectedIdx] : 'idle'}
            size={130}
          />
        </motion.div>
      </motion.div>

      {/* Mood cards — scrapbook style */}
      <div className="grid grid-cols-2 gap-4 md:gap-5 w-full max-w-md md:max-w-lg">
        {birthdayData.btsMoods.map((item, i) => {
          const isSelected = selectedIdx === i
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleSelect(i)}
              whileHover={{ scale: 1.03, rotate: 0 }}
              whileTap={{ scale: 0.97 }}
              className={`relative cursor-pointer rounded-xl p-4 md:p-5 shadow-md transition-all duration-300 border ${
                isSelected
                  ? 'bg-white shadow-lg border-purple-200 z-10 scale-[1.02]'
                  : 'bg-white/70 backdrop-blur-sm border-pink-100/60 hover:shadow-lg'
              }`}
              style={{ rotate: isSelected ? 0 : `${CARD_ROTATIONS[i]}deg` }}
            >
              {/* Decorative corner element */}
              <span className="absolute top-2 right-2.5 text-[10px] opacity-30 pointer-events-none">
                {CARD_DECORATIONS[i]}
              </span>

              <p className="text-2xl mb-1.5">{item.emoji}</p>
              <p className="font-medium text-sm text-gray-700">{item.mood}</p>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 pt-3 border-t border-purple-100"
                  >
                    {/* Song title */}
                    <p className="font-display text-base text-purple-700 italic mb-1.5">
                      🎵 {item.song}
                    </p>
                    {/* Reason */}
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      {item.reason}
                    </p>
                    {/* Play on Spotify — search for the song */}
                    <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://open.spotify.com/search/${encodeURIComponent('BTS ' + item.song)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#282828] text-white text-xs font-medium px-4 py-2.5 rounded-full transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                        Play "{item.song}" on Spotify
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Footer message */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-2xl md:text-3xl font-medium text-purple-500 mb-2">
          보라해 💜
        </p>
        <p className="text-sm text-gray-400 italic">
          We purple you, Havya.
        </p>
      </motion.div>
    </section>
  );
}
