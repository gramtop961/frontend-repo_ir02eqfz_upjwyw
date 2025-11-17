import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import PrinciplesHub from './pages/PrinciplesHub'
import Podcast from './pages/Podcast'
import PodcastEpisode from './pages/PodcastEpisode'
import Tools from './pages/Tools'
import Directory from './pages/Directory'
import Events from './pages/Events'
import Learning from './pages/Learning'
import { AudioPlayerProvider } from './components/AudioPlayerProvider'
import StickyMiniPlayer from './components/StickyMiniPlayer'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudioPlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/test" element={<Test />} />
          <Route path="/principles" element={<PrinciplesHub />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/podcast/:slug" element={<PodcastEpisode />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/events" element={<Events />} />
          <Route path="/learning" element={<Learning />} />
        </Routes>
      </BrowserRouter>
      <StickyMiniPlayer />
    </AudioPlayerProvider>
  </React.StrictMode>,
)
