import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'

function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-bg font-sans text-primary">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {!isHome && (
        <footer className="border-t border-border px-6 py-6 text-center text-xs text-subtle">
          Built with React &amp; Tailwind CSS &mdash;{' '}
          <a
            href="https://github.com/edumatosr6-svg/portifolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary transition-colors duration-200"
          >
            View source
          </a>
        </footer>
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
