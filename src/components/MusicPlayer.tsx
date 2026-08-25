import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    // Try autoplay
    const tryPlay = () => {
      el.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Autoplay blocked — wait for first user interaction
        setAutoplayBlocked(true);
        const startOnInteraction = () => {
          el.play().then(() => {
            setPlaying(true);
            setAutoplayBlocked(false);
          }).catch(() => {});
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('touchstart', startOnInteraction);
        };
        document.addEventListener('click', startOnInteraction, { once: true });
        document.addEventListener('touchstart', startOnInteraction, { once: true });
      });
    };

    if (el.readyState >= 3) {
      tryPlay();
    } else {
      el.addEventListener('canplaythrough', tryPlay, { once: true });
    }
  }, []);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play();
      setPlaying(true);
      setAutoplayBlocked(false);
    }
  }

  if (hidden) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/birthday.mp3"
        loop
        preload="auto"
        onError={() => setHidden(true)}
        onLoadedData={() => {
          if (audioRef.current) audioRef.current.volume = 0.35;
        }}
      />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/30 border border-white/40 shadow-lg hover:scale-110 transition-transform cursor-pointer"
        aria-label={playing ? 'Mute music' : 'Play music'}
      >
        {playing ? (
          <Volume2 size={20} className="text-pink-400" />
        ) : (
          <VolumeX size={20} className={`text-pink-300 ${autoplayBlocked ? 'animate-pulse' : 'opacity-70'}`} />
        )}
      </button>
    </>
  );
}
