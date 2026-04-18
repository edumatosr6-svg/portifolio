import Dock from '../components/Dock'
import Balatro from '../components/Balatro'
import BorderGlow from '../components/BorderGlow'
import { GitHubIcon } from '../components/Icons'

const SKILLS = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'Flask', 'REST APIs', 'PostgreSQL'] },
  { category: 'Tools', items: ['Git', 'Docker', 'Vercel', 'Streamlit', 'Monorepos'] },
]

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
)

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
)

const DOCK_ITEMS = [
  { icon: <HomeIcon />, label: 'Home', onClick: () => window.location.href = '/' },
  { icon: <CodeIcon />, label: 'Projects', onClick: () => window.location.href = '/projects' },
  { icon: <UserIcon />, label: 'About', onClick: () => {} },
  { icon: <GithubIcon />, label: 'GitHub', onClick: () => window.open('https://github.com/edumatosr6-svg', '_blank') },
]

export default function About() {
  return (
    <main className="min-h-screen bg-bg px-6 pt-28 pb-24">
      {/* ASCII Name */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Balatro isRotate mouseInteraction={true} pixelFilter={700} />
      </div>

      {/* Dock Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 pointer-events-auto z-50">
        <Dock 
          items={DOCK_ITEMS}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary tracking-tight mb-10">About</h1>

        {/* Bio card */}
        <BorderGlow colors={['#6366f1', '#8b5cf6', '#4f46e5']} backgroundColor="#120F17" borderRadius={16} glowRadius={40} glowIntensity={1.0} style={{ marginBottom: '2rem' }}>
          <div className="rounded-2xl bg-card p-8">
            <p className="text-muted leading-relaxed text-base">
              I'm a Full Stack Developer focused on building clean, performant web applications.
              I enjoy working across the entire stack — from designing APIs to crafting responsive UIs.
              Always looking to ship things that are both useful and well-made.
            </p>
            <p className="text-muted leading-relaxed text-base mt-4">
              Most of my work lives on GitHub — you'll find scheduling platforms, biomedicine sites,
              restaurant menus, Pokémon validators, and even a Naruto jutsu recognizer built with finite automata.
            </p>

            <a
              href="https://github.com/edumatosr6-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-2 transition-colors duration-200"
            >
              <GitHubIcon className="w-4 h-4" />
              github.com/edumatosr6-svg
            </a>
          </div>
        </BorderGlow>

        {/* Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {SKILLS.map(({ category, items }) => (
            <BorderGlow key={category} colors={['#8b5cf6','#c084fc','#38bdf8']} backgroundColor="#120F17" borderRadius={12} glowRadius={36} glowIntensity={0.9}>
              <div className="rounded-xl bg-card p-5">
                <h3 className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
                  {category}
                </h3>
                <ul className="space-y-1.5">
                  {items.map(skill => (
                    <li key={skill} className="text-sm text-muted">{skill}</li>
                  ))}
                </ul>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </main>
  )
}
