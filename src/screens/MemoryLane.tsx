import { motion } from 'framer-motion'
import { birthdayData } from '../data/birthdayData'
import CuteCat from '../components/CuteCat'

const rotations = [-2, 1, -1.5, 2, -1, 1.5, -2]

export default function MemoryLane() {
  const row1 = birthdayData.photos.slice(0, 3)
  const row2 = birthdayData.photos.slice(3)

  return (
    <section className="relative min-h-screen bg-cream px-4 md:px-6 py-20 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-14 text-center font-display text-3xl text-deep-rose md:text-4xl"
      >
        A few little memories...
      </motion.h2>

      <div className="mx-auto max-w-5xl space-y-14">
        {/* Row 1 */}
        <div className="relative">
          {/* Thread */}
          <div className="absolute top-4 left-[3%] right-[3%] h-[1.5px] bg-[#c9a0a0]/50" />
          {/* Thread endpoints */}
          <div className="absolute top-[13px] left-[3%] w-2.5 h-2.5 rounded-full bg-[#c9a0a0]/40" />
          <div className="absolute top-[13px] right-[3%] w-2.5 h-2.5 rounded-full bg-[#c9a0a0]/40" />

          {/* Cat on thread */}
          <div className="absolute -top-5 right-[8%] z-20 hidden md:block">
            <CuteCat mood="idle" size={45} />
          </div>

          <div className="flex justify-center gap-3 md:gap-6 pt-6">
            {row1.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, type: 'spring', stiffness: 80 }}
                whileHover={{ rotate: 0, scale: 1.05, y: -8 }}
                className="relative"
                style={{ rotate: `${rotations[i]}deg` }}
              >
                {/* Clip */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <svg width="14" height="22" viewBox="0 0 14 22">
                    <rect x="4" y="0" width="6" height="13" rx="2" fill="#c9a0a0" opacity="0.6" />
                    <rect x="3" y="9" width="8" height="5" rx="1" fill="#d4a8a8" opacity="0.7" />
                  </svg>
                </div>

                {/* Polaroid */}
                <div className="w-[130px] sm:w-[180px] md:w-[220px] bg-white p-2 pb-9 sm:p-3 sm:pb-11 md:pb-12 shadow-md rounded-sm">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement!.querySelector('.placeholder')?.classList.remove('hidden')
                    }}
                    className="aspect-square w-full rounded-xs object-cover"
                  />
                  <div className="placeholder hidden aspect-square w-full rounded-xs bg-gradient-to-br from-baby-pink to-lavender" />
                  <p className="absolute bottom-2 sm:bottom-3 left-2 right-2 truncate text-center font-handwritten text-xs sm:text-sm text-deep-rose/70">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative">
          {/* Thread */}
          <div className="absolute top-4 left-[1%] right-[1%] h-[1.5px] bg-[#c9a0a0]/50" />
          <div className="absolute top-[13px] left-[1%] w-2.5 h-2.5 rounded-full bg-[#c9a0a0]/40" />
          <div className="absolute top-[13px] right-[1%] w-2.5 h-2.5 rounded-full bg-[#c9a0a0]/40" />

          <div className="flex justify-center gap-3 md:gap-5 pt-6">
            {row2.map((photo, idx) => {
              const i = idx + 3
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15, type: 'spring', stiffness: 80 }}
                  whileHover={{ rotate: 0, scale: 1.05, y: -8 }}
                  className="relative"
                  style={{ rotate: `${rotations[i]}deg` }}
                >
                  {/* Clip */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <svg width="14" height="22" viewBox="0 0 14 22">
                      <rect x="4" y="0" width="6" height="13" rx="2" fill="#c9a0a0" opacity="0.6" />
                      <rect x="3" y="9" width="8" height="5" rx="1" fill="#d4a8a8" opacity="0.7" />
                    </svg>
                  </div>

                  {/* Polaroid */}
                  <div className="w-[110px] sm:w-[160px] md:w-[200px] bg-white p-2 pb-9 sm:p-3 sm:pb-11 md:pb-12 shadow-md rounded-sm">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement!.querySelector('.placeholder')?.classList.remove('hidden')
                      }}
                      className="aspect-square w-full rounded-xs object-cover"
                    />
                    <div className="placeholder hidden aspect-square w-full rounded-xs bg-gradient-to-br from-baby-pink to-lavender" />
                    <p className="absolute bottom-2 sm:bottom-3 left-2 right-2 truncate text-center font-handwritten text-xs sm:text-sm text-deep-rose/70">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Sleeping cat near last photo */}
                  {idx === row2.length - 2 && (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 hidden md:block">
                      <CuteCat mood="sleepy" size={45} />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="mt-14 flex flex-col items-center gap-2 mx-auto cursor-pointer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        onClick={() => {
          const next = document.getElementById('special-things')
          if (next) next.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <p className="text-sm text-deep-rose/40 font-body">keep scrolling</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4 L10 14 M6 10 L10 14 L14 10" stroke="#c77d8a" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  )
}
