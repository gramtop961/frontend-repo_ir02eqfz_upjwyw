import { useEffect, useMemo, useState } from 'react'

export default function Podcast() {
  const [episodes, setEpisodes] = useState([])
  const [q, setQ] = useState('')
  const [guest, setGuest] = useState('')
  const [pillar, setPillar] = useState('')

  useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const url = new URL(`${base}/podcasts`)
      if (q) url.searchParams.set('q', q)
      if (guest) url.searchParams.set('guest', guest)
      if (pillar) url.searchParams.set('pillar', pillar)
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setEpisodes(data.items || [])
      }
    }
    load()
  }, [q, guest, pillar])

  const filtered = useMemo(() => episodes, [episodes])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Podcast</h1>
        <p className="mt-3 text-gray-600">Search episodes by guest, topic, or pillar.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="rounded-md border px-3 py-2" />
          <input value={guest} onChange={e => setGuest(e.target.value)} placeholder="Guest" className="rounded-md border px-3 py-2" />
          <input value={pillar} onChange={e => setPillar(e.target.value)} placeholder="Pillar" className="rounded-md border px-3 py-2" />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(ep => (
            <a key={ep.slug} href={`/podcast/${ep.slug}`} className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold">{ep.title}</h3>
              <p className="mt-2 text-gray-600">{ep.summary}</p>
              <div className="mt-3 text-sm text-gray-500">{ep.guest_name}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
