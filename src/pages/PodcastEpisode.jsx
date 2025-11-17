import { useEffect, useState } from 'react'
import { useAudioPlayer } from '../components/AudioPlayerProvider'
import { Play, Pause, Disc } from 'lucide-react'

export default function PodcastEpisode() {
  const [episode, setEpisode] = useState(null)
  const { playEpisode, current, isPlaying, toggle } = useAudioPlayer()

  useEffect(() => {
    const load = async () => {
      const slug = window.location.pathname.split('/').pop()
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/podcasts/${slug}`)
      if (res.ok) {
        const data = await res.json()
        setEpisode(data)
      }
    }
    load()
  }, [])

  if (!episode) return <div className="min-h-screen grid place-items-center"><div>Loading...</div></div>

  const isCurrent = current?.slug === episode.slug

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-start gap-3">
          {isCurrent && isPlaying ? (
            <Disc className="mt-1 h-6 w-6 text-emerald-600 animate-spin" />
          ) : (
            <div className="mt-1 h-6 w-6 rounded-full border border-gray-300" />
          )}
          <h1 className="text-3xl md:text-4xl font-bold flex-1">{episode.title}</h1>
        </div>
        <p className="mt-3 text-gray-600">{episode.summary}</p>
        {episode.audio_url && (
          <div className="mt-6">
            {isCurrent ? (
              <button
                onClick={toggle}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            ) : (
              <button
                onClick={() => playEpisode(episode)}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              >
                <Play className="h-4 w-4" />
                Play Episode
              </button>
            )}
          </div>
        )}
        {episode.guest_name && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Guest: {episode.guest_name}</h3>
            <p className="mt-2 text-gray-600">{episode.guest_bio}</p>
          </div>
        )}
      </div>
    </div>
  )
}
