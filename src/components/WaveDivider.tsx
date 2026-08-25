export default function WaveDivider({ flip, color = '#fdf8f4' }: { flip?: boolean; color?: string }) {
  return (
    <svg
      viewBox="0 0 800 80"
      preserveAspectRatio="none"
      className="w-full h-[60px]"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <path
        d="M0,40 Q200,0 400,40 Q600,80 800,40 L800,80 L0,80 Z"
        fill={color}
      />
    </svg>
  )
}
