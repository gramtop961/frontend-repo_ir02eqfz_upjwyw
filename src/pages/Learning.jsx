export default function Learning() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Learning Center</h1>
        <p className="mt-3 text-gray-600">Choose your path and level. Video courses, articles, downloads, and case studies. Quizzes and certifications coming soon.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
            <a key={lvl} href={`/learning/${lvl.toLowerCase()}`} className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold">{lvl}</h3>
              <p className="mt-2 text-gray-600">Curated lessons, resources, and tools for {lvl.toLowerCase()}s.</p>
              <span className="mt-4 inline-block text-emerald-600 font-medium">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
