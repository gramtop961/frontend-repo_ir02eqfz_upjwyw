import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ onCTAClick }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/80 pointer-events-none" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          CRE8: The Ecosystem for Commercial Real Estate
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="mt-6 max-w-3xl text-lg md:text-xl text-gray-200"
        >
          CRE8 is where visionaries, dealmakers, and innovators collide to build lasting relationships, spark fresh opportunities, and close deals that shape the future of commercial real estate.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#principles" className="px-6 py-3 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors">Explore the CRE8 Ecosystem</a>
          <a href="/podcast" className="px-6 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur transition-colors">Listen to Podcast</a>
          <a href="#directory" className="px-6 py-3 rounded-md bg-white text-black font-semibold transition-colors">Join the Directory</a>
          <a href="#deal" className="px-6 py-3 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors">Submit a Deal</a>
        </motion.div>
      </div>
    </section>
  )
}
