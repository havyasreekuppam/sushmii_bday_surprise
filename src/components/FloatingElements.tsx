import { motion } from 'framer-motion';

type ElementType = 'petals' | 'sparkles' | 'hearts' | 'confetti' | 'mixed';
type Density = 'low' | 'medium' | 'high';

interface FloatingElementsProps {
  type: ElementType;
  density?: Density;
  className?: string;
}

const COUNTS: Record<Density, number> = { low: 8, medium: 16, high: 28 };

const COLORS = ['#f5c6d0', '#e8b4d4', '#fde8d8', '#d4b8e8', '#f8d4e0', '#ffe0cc'];

function seededProps(i: number) {
  const x = ((i * 37 + 13) % 100);
  const delay = ((i * 53 + 7) % 40) / 10;
  const duration = 6 + ((i * 29) % 8);
  const size = 6 + ((i * 17) % 10);
  const color = COLORS[i % COLORS.length];
  return { x, delay, duration, size, color };
}

function Petal({ i }: { i: number }) {
  const { x, delay, duration, size, color } = seededProps(i);
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: '100%' }}
      animate={{ y: [0, -(window?.innerHeight ?? 800) - 100], x: [0, 20, -10, 15], opacity: [0, 0.7, 0.7, 0], rotate: [0, 180, 360] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox="0 0 10 10">
        <ellipse cx="5" cy="5" rx="3" ry="5" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  );
}

function Sparkle({ i }: { i: number }) {
  const { x, delay, duration, size, color } = seededProps(i);
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: '100%' }}
      animate={{ y: [0, -(window?.innerHeight ?? 800) - 100], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
      transition={{ duration: duration * 0.7, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox="0 0 12 12">
        <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill={color} opacity="0.8" />
      </svg>
    </motion.div>
  );
}

function Heart({ i }: { i: number }) {
  const { x, delay, duration, size, color } = seededProps(i);
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: '100%' }}
      animate={{ y: [0, -(window?.innerHeight ?? 800) - 100], opacity: [0, 0.6, 0.6, 0], scale: [0.8, 1, 0.8] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox="0 0 12 12">
        <path d="M6 10 C2 7 0 4 2 2 C4 0 6 2 6 4 C6 2 8 0 10 2 C12 4 10 7 6 10Z" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  );
}

function Confetti({ i }: { i: number }) {
  const { x, delay, duration, size, color } = seededProps(i);
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: '100%' }}
      animate={{ y: [0, -(window?.innerHeight ?? 800) - 100], opacity: [0, 0.8, 0.8, 0], rotate: [0, 360, 720] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size * 0.6} height={size} viewBox="0 0 6 10">
        <rect x="1" y="1" width="4" height="8" rx="1" fill={color} opacity="0.8" />
      </svg>
    </motion.div>
  );
}

const ELEMENTS = { petals: Petal, sparkles: Sparkle, hearts: Heart, confetti: Confetti };

export default function FloatingElements({ type, density = 'low', className }: FloatingElementsProps) {
  const count = COUNTS[density];
  const items = Array.from({ length: count }, (_, i) => i);

  function getComponent(i: number) {
    if (type === 'mixed') {
      const types: (keyof typeof ELEMENTS)[] = ['petals', 'sparkles', 'hearts', 'confetti'];
      const Comp = ELEMENTS[types[i % types.length]];
      return <Comp key={i} i={i} />;
    }
    const Comp = ELEMENTS[type];
    return <Comp key={i} i={i} />;
  }

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className ?? ''}`}>
      {items.map(getComponent)}
    </div>
  );
}
