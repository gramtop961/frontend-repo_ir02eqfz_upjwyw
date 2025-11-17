import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const AudioPlayerContext = createContext(null)

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(typeof Audio !== 'undefined' ? new Audio() : null)
  const [current, setCurrent] = useState(null) // episode object
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [visible, setVisible] = useState(false)

  // Handlers
  const playEpisode = useCallback(async (episode) => {
    if (!episode?.audio_url) return
    const audio = audioRef.current
    if (!audio) return
    try {
      if (current?.slug !== episode.slug) {
        // load new source
        audio.src = episode.audio_url
        setCurrent(episode)
        setCurrentTime(0)
      }
      await audio.play()
      setIsPlaying(true)
      setVisible(true)
    } catch (e) {
      console.error('Play error', e)
    }
  }, [current])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (audio.paused) {
        await audio.play()
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    } catch (e) {
      console.error('Toggle error', e)
    }
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  const seekTo = useCallback((time) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0))
    setCurrentTime(audio.currentTime)
  }, [])

  const seekBy = useCallback((delta) => {
    const audio = audioRef.current
    if (!audio) return
    seekTo((audio.currentTime || 0) + delta)
  }, [seekTo])

  const close = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.src = ''
    }
    setIsPlaying(false)
    setVisible(false)
    setCurrent(null)
    setCurrentTime(0)
    setDuration(0)
  }, [])

  // Attach audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => setCurrentTime(audio.currentTime || 0)
    const onMeta = () => setDuration(audio.duration || 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  // Keyboard shortcuts: Space toggle, Left/Right seek
  useEffect(() => {
    const onKey = (e) => {
      // Avoid interfering with typing
      const tag = (e.target && e.target.tagName) || ''
      const isTyping = ['INPUT', 'TEXTAREA'].includes(tag) || e.target?.isContentEditable
      if (isTyping) return

      if (e.code === 'Space') {
        e.preventDefault()
        toggle()
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        seekBy(5)
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        seekBy(-5)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle, seekBy])

  const value = useMemo(() => ({
    current,
    isPlaying,
    duration,
    currentTime,
    visible,
    playEpisode,
    toggle,
    pause,
    seekTo,
    seekBy,
    close,
  }), [current, isPlaying, duration, currentTime, visible, playEpisode, toggle, pause, seekTo, seekBy, close])

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) throw new Error('useAudioPlayer must be used within AudioPlayerProvider')
  return ctx
}
