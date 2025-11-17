import { useEffect, useState } from 'react'

const defaultPillars = [
  { key: 'capital', title: 'Capital' },
  { key: 'development', title: 'Development' },
  { key: 'investment', title: 'Investment' },
  { key: 'operations', title: 'Operations' },
  { key: 'leasing', title: 'Leasing' },
  { key: 'advisory', title: 'Advisory' },
  { key: 'technology', title: 'Technology' },
  { key: 'community', title: 'Community' },
]

export default function PrinciplesHub() {
  const [pillars, setPillars] = useState(defaultPillars)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/principles`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data.items) && data.items.length) setPillars(data.items)
        }
      } catch {}
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold">The CRE8 Pillars</h1>
        <p className="mt-3 text-gray-600">Explore curated resources, tools, and experts aligned to each pillar.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map(p => (
            <a key={p.key} href={`/principles/${p.key}`} className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-gray-600">Articles, tools, podcasts, and recommended professionals.</p>
              <span className="mt-4 inline-block text-emerald-600 font-medium">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
