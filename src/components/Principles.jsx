import { motion } from 'framer-motion'
import { Home, Building2, LineChart, Cog, BadgeDollarSign, Users, Cpu, Network } from 'lucide-react'

const pillars = [
  { key: 'capital', title: 'Capital', icon: BadgeDollarSign, color: 'emerald' },
  { key: 'development', title: 'Development', icon: Building2, color: 'sky' },
  { key: 'investment', title: 'Investment', icon: LineChart, color: 'violet' },
  { key: 'operations', title: 'Operations', icon: Cog, color: 'cyan' },
  { key: 'leasing', title: 'Leasing', icon: Home, color: 'amber' },
  { key: 'advisory', title: 'Advisory', icon: Users, color: 'rose' },
  { key: 'technology', title: 'Technology', icon: Cpu, color: 'lime' },
  { key: 'community', title: 'Community', icon: Network, color: 'fuchsia' },
]

export default function Principles() {
  return (
    <section id="principles" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">The 8 CRE8 Pillars</h2>
          <a href="/principles" className="text-emerald-600 hover:text-emerald-700 font-medium">View the hub →</a>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ key, title, icon: Icon, color }) => (
            <motion.a
              key={key}
              href={`/principles/${key}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className={`h-10 w-10 rounded-md bg-${color}-100 text-${color}-700 flex items-center justify-center`}> 
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">Explore resources, tools, and experts in {title.toLowerCase()}.</p>
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/5 transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
