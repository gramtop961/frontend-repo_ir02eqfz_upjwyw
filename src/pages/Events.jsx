import { useEffect, useState } from 'react'

export default function Events() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/events`)
      if (res.ok) {
        const data = await res.json()
        setItems(data.items || [])
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Events</h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(e => (
            <div key={e.slug} className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{e.title}</h3>
              <div className="mt-1 text-gray-600">{e.location}</div>
              {e.date && <div className="mt-1 text-gray-500 text-sm">{new Date(e.date).toLocaleString()}</div>}
              <p className="mt-3 text-gray-700">{e.summary}</p>
              {e.rsvp_url && <a href={e.rsvp_url} target="_blank" className="mt-4 inline-block text-emerald-600 font-medium">RSVP →</a>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
