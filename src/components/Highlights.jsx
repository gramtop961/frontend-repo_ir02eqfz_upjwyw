import { motion } from 'framer-motion'

function Card({ title, subtitle, cta, href }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{subtitle}</p>
      </div>
      <div className="mt-6">
        <span className="text-emerald-600 font-medium">{cta} →</span>
      </div>
    </motion.a>
  )
}

export default function Highlights() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Newest Podcast Episode" subtitle="Building the Future of CRE Networks with Alex Morgan" cta="Listen now" href="/podcast/future-of-cre-networks" />
          <Card title="Upcoming Event" subtitle="CRE8 Summit 2025 — Austin, TX" cta="Reserve your spot" href="/events" />
          <Card title="Featured Expert" subtitle="Horizon Capital Partners — Debt & Equity" cta="View profile" href="/directory" />
        </div>
      </div>
    </section>
  )
}
