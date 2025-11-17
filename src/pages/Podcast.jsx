import { useEffect, useState } from 'react'

export default function Podcast() {
  const [episodes, setEpisodes] = useState([])
  const [syncing, setSyncing] = useState(false)
  const [message, setMessage] = useState('')

  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    try {
      const res = await fetch(`${base}/podcasts`)
      if (!res.ok) throw new Error('Failed to load episodes')
      const data = await res.json()
      setEpisodes(data.items || [])
    } catch (e) {
      setMessage(String(e.message || e))
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSync = async () => {
    try {
      setSyncing(true)
      setMessage('')
      const res = await fetch(`${base}/podcasts/import/transistor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feed_url: 'https://feeds.transistor.fm/the-cre-connection-samy-soussan' })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Sync failed')
      setMessage(`Synced ${data.created} new, ${data.updated} updated from Transistor`)
      await load()
    } catch (e) {
      setMessage(String(e.message || e))
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Podcast</h1>
            <p className="mt-3 text-gray-600">Browse episodes and play them directly.</p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700 disabled:opacity-60"
          >
            {syncing ? 'Syncing…' : 'Sync'}
          </button>
        </div>
        {message && (
          <div className="mt-4 text-sm text-gray-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
            {message}
          </div>
        )}

        <div className="mt-8 space-y-6">
          {episodes.map((ep) => (
            <div key={ep.slug} className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{ep.title}</h3>
              {ep.audio_url ? (
                <audio controls className="mt-4 w-full">
                  <source src={ep.audio_url} />
                </audio>
              ) : (
                <div className="mt-4 text-sm text-gray-500">No audio available for this episode.</div>
              )}
            </div>
          ))}
          {episodes.length === 0 && (
            <div className="text-gray-500">No episodes yet. Try syncing to import from Transistor.</div>
          )}
        </div>
      </div>
    </div>
  )
}
