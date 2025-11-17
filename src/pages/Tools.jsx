import { useEffect, useState } from 'react'

export default function Tools() {
  const [items, setItems] = useState([])
  const [category, setCategory] = useState('')
  const [fmt, setFmt] = useState('')
  const [level, setLevel] = useState('')
  const [pillar, setPillar] = useState('')

  useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const url = new URL(`${base}/tools`)
      if (category) url.searchParams.set('category', category)
      if (fmt) url.searchParams.set('fmt', fmt)
      if (level) url.searchParams.set('level', level)
      if (pillar) url.searchParams.set('pillar', pillar)
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setItems(data.items || [])
      }
    }
    load()
  }, [category, fmt, level, pillar])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Tools & Templates</h1>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="rounded-md border px-3 py-2" />
          <input value={fmt} onChange={e => setFmt(e.target.value)} placeholder="Format" className="rounded-md border px-3 py-2" />
          <input value={level} onChange={e => setLevel(e.target.value)} placeholder="Level" className="rounded-md border px-3 py-2" />
          <input value={pillar} onChange={e => setPillar(e.target.value)} placeholder="Pillar" className="rounded-md border px-3 py-2" />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(it => (
            <a key={it.slug} href={it.download_url || '#'} className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold">{it.title}</h3>
              <p className="mt-1 text-gray-600">{it.category} · {it.format} · {it.level}</p>
              <span className="mt-3 inline-block text-emerald-600 font-medium">Download →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
