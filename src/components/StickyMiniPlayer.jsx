import React from 'react'
import { useAudioPlayer } from './AudioPlayerProvider'

function formatTime(s) {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function StickyMiniPlayer() {
  const { current, isPlaying, duration, currentTime, toggle, seekTo, close } = useAudioPlayer()

  if (!current) return null

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[540px]">
      <div className="rounded-2xl border bg-white/90 backdrop-blur shadow-lg">
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate font-medium">{current.title}</div>
              <div className="text-xs text-gray-500">{formatTime(currentTime)} / {formatTime(duration)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => seekTo(Math.max(0, currentTime - 10))} className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50">-10s</button>
              <button onClick={toggle} className="rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={() => seekTo(Math.min(duration, currentTime + 30))} className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50">+30s</button>
              <button onClick={close} className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50">Close</button>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={1}
            value={currentTime || 0}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="mt-3 w-full"
          />
        </div>
        <div className="h-1 w-full bg-gray-100 rounded-b-2xl overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
