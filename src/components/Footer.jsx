export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="text-white font-semibold mb-3">CRE8</h4>
          <p className="text-sm">Education, tools, and a trusted network for commercial real estate professionals.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/principles" className="hover:text-white">Pillars</a></li>
            <li><a href="/podcast" className="hover:text-white">Podcast</a></li>
            <li><a href="/learning" className="hover:text-white">Learning Center</a></li>
            <li><a href="/tools" className="hover:text-white">Tools & Templates</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Network</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/directory" className="hover:text-white">Directory</a></li>
            <li><a href="/events" className="hover:text-white">Events</a></li>
            <li><a href="/about" className="hover:text-white">About CRE8</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Subscribe</h4>
          <form className="space-y-3">
            <input type="email" required placeholder="Your email" className="w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <button className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-sm font-medium">Join the list</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs">© {new Date().getFullYear()} CRE8. All rights reserved.</div>
    </footer>
  )
}
