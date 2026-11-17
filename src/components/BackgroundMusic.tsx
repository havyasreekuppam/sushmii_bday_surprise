import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

type BackgroundMusicProps = {
  screen: string
  songActive: boolean
  finaleComplete: number
}

const NORMAL_VOLUME = 0.18
const DEDICATED_SONG_VOLUME = 0.035
const FINALE_VOLUME = 0.12

export default function BackgroundMusic({ screen, songActive, finaleComplete }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeFrameRef = useRef<number | null>(null)
  const startedRef = useRef(false)
  const mutedRef = useRef(false)
  const songActiveRef = useRef(songActive)
  const screenRef = useRef(screen)
  const finaleCompleteRef = useRef(false)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0
  }, [])

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current !== null) {
      window.cancelAnimationFrame(fadeFrameRef.current)
      fadeFrameRef.current = null
    }
  }, [])

  const fadeTo = useCallback((target: number, duration: number, onComplete?: () => void) => {
    const audio = audioRef.current
    if (!audio) return

    cancelFade()
    const from = audio.volume
    if (!duration || from === target) {
      audio.volume = target
      onComplete?.()
      return
    }

    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      audio.volume = from + (target - from) * progress

      if (progress < 1) {
        fadeFrameRef.current = window.requestAnimationFrame(tick)
      } else {
        fadeFrameRef.current = null
        onComplete?.()
      }
    }
    fadeFrameRef.current = window.requestAnimationFrame(tick)
  }, [cancelFade])

  const targetVolume = useCallback(() => {
    if (mutedRef.current || finaleCompleteRef.current) return 0
    if (songActiveRef.current) return DEDICATED_SONG_VOLUME
    return screenRef.current === 'finale' ? FINALE_VOLUME : NORMAL_VOLUME
  }, [])

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || mutedRef.current) return

    if (screenRef.current !== 'finale' && finaleCompleteRef.current) {
      finaleCompleteRef.current = false
    }

    if (audio.paused) {
      audio.volume = 0
      try {
        await audio.play()
        if (mutedRef.current) {
          audio.pause()
          return
        }
        startedRef.current = true
        setPlaying(true)
        setPlaybackError(false)
      } catch (error) {
        startedRef.current = false
        setPlaying(false)
        setPlaybackError(true)
        console.error('Unable to play the background music at /music/music_full.mp3.', error)
        return
      }
    }

    startedRef.current = true
    fadeTo(targetVolume(), 3000)
  }, [fadeTo, targetVolume])

  useEffect(() => {
    screenRef.current = screen
    songActiveRef.current = songActive
  }, [screen, songActive])

  useEffect(() => {
    const handleInteraction = () => {
      const audio = audioRef.current
      if (!audio || mutedRef.current) return
      if (!startedRef.current || audio.paused || (finaleCompleteRef.current && screenRef.current !== 'finale')) {
        void startPlayback()
      }
    }

    document.addEventListener('pointerdown', handleInteraction, true)
    document.addEventListener('keydown', handleInteraction, true)
    return () => {
      document.removeEventListener('pointerdown', handleInteraction, true)
      document.removeEventListener('keydown', handleInteraction, true)
    }
  }, [startPlayback])

  useEffect(() => {
    if (!startedRef.current || finaleCompleteRef.current) return
    fadeTo(targetVolume(), screen === 'finale' ? 1200 : 700)
  }, [fadeTo, screen, songActive, targetVolume])

  useEffect(() => {
    if (finaleComplete === 0) return
    finaleCompleteRef.current = true
    if (!startedRef.current) return

    fadeTo(0, 4000, () => {
      const audio = audioRef.current
      audio?.pause()
      startedRef.current = false
      setPlaying(false)
    })
  }, [fadeTo, finaleComplete])

  useEffect(() => () => cancelFade(), [cancelFade])

  const toggleMute = () => {
    const nextMuted = !mutedRef.current
    mutedRef.current = nextMuted
    setMuted(nextMuted)

    if (nextMuted) {
      fadeTo(0, 600, () => {
        audioRef.current?.pause()
        setPlaying(false)
      })
    } else {
      if (screenRef.current === 'finale') finaleCompleteRef.current = false
      void startPlayback()
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/music_full.mp3"
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaybackError(true)
          console.error('Unable to load the background music at /music/music_full.mp3.')
        }}
      />
      <button
        type="button"
        onClick={toggleMute}
        className="fixed bottom-5 right-5 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-white/65 text-[#c77d98] shadow-[0_8px_24px_rgba(181,121,146,0.2)] backdrop-blur-md transition hover:scale-105 hover:bg-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c77d98]"
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
        aria-pressed={muted}
        title={playbackError ? 'Background music could not be loaded' : muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} className={playing ? '' : 'opacity-75'} />}
      </button>
    </>
  )
}
