import { useEffect, useState } from 'react'

export default function Directory() {
  const [items, setItems] = useState([])
  const [category, setCategory] = useState('')
  const [pillar, setPillar] = useState('')
  const [location, setLocation] = useState('')
  const [featured, setFeatured] = useState('')
  const [worked, setWorked] = useState('')
  const [q, setQ] = useState('')

  useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const url = new URL(`${base}/directory`)
      if (category) url.searchParams.set('category', category)
      if (pillar) url.searchParams.set('pillar', pillar)
      if (location) url.searchParams.set('location', location)
      if (featured) url.searchParams.set('featured', featured)
      if (worked) url.searchParams.set('worked', worked)
      if (q) url.searchParams.set('q', q)
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setItems(data.items || [])
      }
    }
    load()
  }, [category, pillar, location, featured, worked, q])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold">CRE8 Network Directory</h1>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="rounded-md border px-3 py-2" />
          <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" className="rounded-md border px-3 py-2" />
          <input value={pillar} onChange={e=>setPillar(e.target.value)} placeholder="Pillar" className="rounded-md border px-3 py-2" />
          <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="rounded-md border px-3 py-2" />
          <select value={featured} onChange={e=>setFeatured(e.target.value)} className="rounded-md border px-3 py-2">
            <option value="">Featured?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select value={worked} onChange={e=>setWorked(e.target.value)} className="rounded-md border px-3 py-2">
            <option value="">Worked with CRE8?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(p => (
            <div key={p._id} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                {p.featured && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">CRE8 Trusted</span>}
              </div>
              <div className="mt-1 text-gray-600">{p.company} · {p.category}</div>
              <div className="mt-1 text-gray-500 text-sm">{p.location}</div>
              <p className="mt-3 text-sm text-gray-700">{p.bio}</p>
              <div className="mt-4 flex gap-3">
                {p.website && <a className="text-emerald-600 font-medium" href={p.website} target="_blank">Website →</a>}
                {p.contact_email && <a className="text-emerald-600 font-medium" href={`mailto:${p.contact_email}`}>Email →</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
