import { useEffect, useState } from 'react'

export default function PodcastEpisode() {
  const [episode, setEpisode] = useState(null)

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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold">{episode.title}</h1>
        <p className="mt-3 text-gray-600">{episode.summary}</p>
        {episode.audio_url && (
          <audio controls className="mt-6 w-full">
            <source src={episode.audio_url} />
          </audio>
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
