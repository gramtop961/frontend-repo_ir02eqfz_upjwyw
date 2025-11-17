import Hero from './components/Hero'
import Principles from './components/Principles'
import Highlights from './components/Highlights'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Hero />
      <Principles />
      <Highlights />
      <Footer />
    </div>
  )
}

export default App
