import { motion } from 'framer-motion';

type Mood = 'idle' | 'happy' | 'sleepy' | 'excited' | 'judging' | 'disappointed';

interface CuteCatProps {
  mood: Mood;
  size?: number;
  className?: string;
  withBalloon?: boolean;
  withCake?: boolean;
  withBow?: boolean;
}

export default function CuteCat({
  mood,
  size = 120,
  className,
  withBalloon = false,
  withCake = false,
  withBow = true,
}: CuteCatProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      animate={
        mood === 'happy' ? { y: [0, -4, 0] } :
        mood === 'excited' ? { y: [0, -8, 0] } :
        mood === 'sleepy' ? { scale: [1, 1.02, 1] } :
        undefined
      }
      transition={
        mood === 'happy' ? { duration: 1, repeat: Infinity } :
        mood === 'excited' ? { duration: 0.4, repeat: Infinity } :
        mood === 'sleepy' ? { duration: 2, repeat: Infinity } :
        undefined
      }
    >
      {/* Tail */}
      <motion.path
        d="M 85 75 Q 100 65 95 50"
        fill="none"
        stroke="#fde8d8"
        strokeWidth="5"
        strokeLinecap="round"
        animate={{ d: ['M 85 75 Q 100 65 95 50', 'M 85 75 Q 105 70 100 55', 'M 85 75 Q 100 65 95 50'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Body */}
      <ellipse cx="60" cy="75" rx="25" ry="20" fill="#fde8d8" />

      {/* Head */}
      <circle cx="60" cy="48" r="22" fill="#fde8d8" />

      {/* Ears */}
      <motion.polygon
        points="42,30 38,12 52,25"
        fill="#fde8d8"
        animate={{ points: ['42,30 38,12 52,25', '42,30 39,14 52,25', '42,30 38,12 52,25'] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <polygon points="42,30 40,16 50,26" fill="#f5c6d0" opacity="0.6" />
      <motion.polygon
        points="78,30 82,12 68,25"
        fill="#fde8d8"
        animate={
          mood === 'disappointed'
            ? { points: ['78,30 80,16 68,25', '78,32 79,18 68,27', '78,30 80,16 68,25'] }
            : { points: ['78,30 82,12 68,25', '78,30 81,14 68,25', '78,30 82,12 68,25'] }
        }
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      />
      <polygon points="78,30 80,16 70,26" fill="#f5c6d0" opacity="0.6" />

      {/* Eyes */}
      {mood === 'sleepy' ? (
        <>
          <motion.line x1="51" y1="46" x2="57" y2="46" stroke="#4a3f4a" strokeWidth="2" strokeLinecap="round" />
          <motion.line x1="63" y1="46" x2="69" y2="46" stroke="#4a3f4a" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : mood === 'judging' ? (
        <>
          <ellipse cx="53" cy="46" rx="3.5" ry="2" fill="#4a3f4a" />
          <ellipse cx="67" cy="45" rx="3.5" ry="2" fill="#4a3f4a" />
          <line x1="64" y1="40" x2="70" y2="39" stroke="#4a3f4a" strokeWidth="1.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <motion.ellipse
            cx="53"
            cy="46"
            rx={mood === 'excited' ? 4.5 : 3.5}
            ry={mood === 'excited' ? 5 : mood === 'happy' ? 4.5 : 4}
            fill="#4a3f4a"
            animate={{ ry: mood === 'excited' ? [5, 5, 0.5, 5] : [4, 4, 0.5, 4] }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.85, 0.9, 0.95] }}
          />
          <motion.ellipse
            cx="67"
            cy="46"
            rx={mood === 'excited' ? 4.5 : 3.5}
            ry={mood === 'excited' ? 5 : mood === 'happy' ? 4.5 : 4}
            fill="#4a3f4a"
            animate={{ ry: mood === 'excited' ? [5, 5, 0.5, 5] : [4, 4, 0.5, 4] }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.85, 0.9, 0.95] }}
          />
          {/* Eye highlights */}
          <circle cx="52" cy="44" r="1.2" fill="white" />
          <circle cx="66" cy="44" r="1.2" fill="white" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="60" cy="52" rx="2" ry="1.5" fill="#e8b4b8" />

      {/* Mouth */}
      {mood === 'happy' || mood === 'excited' ? (
        <path d="M 57 55 Q 60 58 63 55" fill="none" stroke="#4a3f4a" strokeWidth="1" strokeLinecap="round" />
      ) : mood === 'disappointed' ? (
        <path d="M 57 57 Q 60 55 63 57" fill="none" stroke="#4a3f4a" strokeWidth="1" strokeLinecap="round" />
      ) : (
        <path d="M 58 55 Q 60 56 62 55" fill="none" stroke="#4a3f4a" strokeWidth="0.8" strokeLinecap="round" />
      )}

      {/* Whiskers */}
      <line x1="40" y1="50" x2="48" y2="51" stroke="#4a3f4a" strokeWidth="0.5" opacity="0.4" />
      <line x1="40" y1="53" x2="48" y2="53" stroke="#4a3f4a" strokeWidth="0.5" opacity="0.4" />
      <line x1="72" y1="51" x2="80" y2="50" stroke="#4a3f4a" strokeWidth="0.5" opacity="0.4" />
      <line x1="72" y1="53" x2="80" y2="53" stroke="#4a3f4a" strokeWidth="0.5" opacity="0.4" />

      {/* Paws */}
      <ellipse cx="48" cy="90" rx="6" ry="4" fill="#fde8d8" />
      <ellipse cx="72" cy="90" rx="6" ry="4" fill="#fde8d8" />

      {/* Bow */}
      {withBow && (
        <g transform="translate(47, 28)">
          <path d="M 0 3 Q -5 0 -3 -3 Q 0 -1 0 3 Z" fill="#e8b4b8" />
          <path d="M 0 3 Q 5 0 3 -3 Q 0 -1 0 3 Z" fill="#e8b4b8" />
          <circle cx="0" cy="3" r="1.5" fill="#d4a0a8" />
        </g>
      )}

      {/* Mood-specific decorations */}
      {mood === 'happy' && (
        <>
          <motion.text x="30" y="30" fontSize="8" animate={{ opacity: [0, 1, 0], y: [30, 24, 18] }} transition={{ duration: 2, repeat: Infinity }}>&#x2764;</motion.text>
          <motion.text x="82" y="28" fontSize="7" animate={{ opacity: [0, 1, 0], y: [28, 22, 16] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}>&#x2764;</motion.text>
        </>
      )}
      {mood === 'sleepy' && (
        <motion.text
          x="78"
          y="35"
          fontSize="9"
          fill="#b8a0c8"
          fontStyle="italic"
          animate={{ opacity: [0, 1, 0], y: [35, 28] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Zzz
        </motion.text>
      )}
      {mood === 'excited' && (
        <>
          <motion.text x="28" y="22" fontSize="7" animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}>&#x2728;</motion.text>
          <motion.text x="85" y="25" fontSize="6" animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}>&#x2728;</motion.text>
          <motion.text x="55" y="15" fontSize="6" animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}>&#x2728;</motion.text>
        </>
      )}

      {/* Balloon */}
      {withBalloon && (
        <g>
          <line x1="42" y1="90" x2="30" y2="30" stroke="#d4a0a8" strokeWidth="0.7" />
          <motion.ellipse
            cx="30"
            cy="22"
            rx="7"
            ry="9"
            fill="#f5c6d0"
            animate={{ cy: [22, 20, 22] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <path d="M 29 31 L 30 31 L 30.5 33 L 29.5 33 Z" fill="#d4a0a8" />
        </g>
      )}

      {/* Cake */}
      {withCake && (
        <g transform="translate(88, 72)">
          <rect x="-8" y="0" width="16" height="12" rx="2" fill="#fce4ec" />
          <rect x="-6" y="-2" width="12" height="4" rx="1" fill="#f8bbd0" />
          <rect x="-1" y="-8" width="2" height="6" fill="#ffe0b2" />
          <motion.circle
            cx="0"
            cy="-9"
            r="2"
            fill="#ffcc80"
            animate={{ opacity: [1, 0.6, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </g>
      )}
    </motion.svg>
  );
}
