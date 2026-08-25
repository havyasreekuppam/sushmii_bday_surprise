import { motion } from 'framer-motion';

interface PawPrintsProps {
  count?: number;
}

function PawSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      {/* Main pad */}
      <ellipse cx="8" cy="11" rx="3.5" ry="3" />
      {/* Toe beans */}
      <circle cx="5" cy="6.5" r="1.8" />
      <circle cx="8" cy="5" r="1.8" />
      <circle cx="11" cy="6.5" r="1.8" />
      <circle cx="13" cy="9" r="1.5" />
    </svg>
  );
}

export default function PawPrints({ count = 5 }: PawPrintsProps) {
  return (
    <div className="relative w-full h-24 overflow-hidden flex items-center justify-center">
      {Array.from({ length: count }, (_, i) => {
        const xOffset = (i / (count - 1)) * 80 + 10; // spread 10%–90%
        const yOffset = Math.sin(i * 1.2) * 12; // wavy
        const rotation = -30 + (i % 2 === 0 ? 10 : -10);
        return (
          <motion.div
            key={i}
            className="absolute text-rose-300/30"
            style={{ left: `${xOffset}%`, top: `calc(50% + ${yOffset}px)`, rotate: `${rotation}deg` }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <PawSvg />
          </motion.div>
        );
      })}
    </div>
  );
}
