import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import ASCIIText from '../components/ASCIIText'
import Hyperspeed from '../components/Hyperspeed'
const HYPERSPEED_OPTIONS = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 50,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.2, 0.2],
  carFloorSeparation: [0.05, 1],
  colors: {
    roadColor: 0x080810,
    islandColor: 0x0d0d1b,
    background: 0x080810,
    shoulderLines: 0x1c1c38,
    brokenLines: 0x1c1c38,
    leftCars: [0x6366f1, 0x8b5cf6, 0x4f46e5],
    rightCars: [0x8b5cf6, 0x6366f1, 0xa78bfa],
    sticks: 0x6366f1,
  },
}

export default function Home() {
  const effectOptions = useMemo(() => HYPERSPEED_OPTIONS, [])

  return (
    <>
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Hyperspeed background */}
        <div className="absolute inset-0 z-0">
          <Hyperspeed effectOptions={effectOptions} />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(8,8,16,0.3) 0%, rgba(8,8,16,0.15) 40%, rgba(8,8,16,0.7) 85%, #080810 100%)' }}
        />

        {/* ASCII "Eduardo" */}
        <div className="relative z-20 w-full" style={{ height: '220px' }}>
          <ASCIIText text="Eduardo" enableWaves asciiFontSize={11} textFontSize={200} planeBaseHeight={8} textColor="#f1f5f9" />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 pb-24 mt-2">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-primary mb-3 leading-tight">
            <span className="gradient-text">Matos</span>
          </h1>

          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-border bg-surface/80 backdrop-blur-sm text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for work
          </div>

          <p className="text-lg text-muted max-w-md mx-auto leading-relaxed">
            Full Stack Developer — building fast, clean, and scalable web experiences.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <Link
              to="/projects"
              className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              View Projects
            </Link>
            <a
              href="https://github.com/edumatosr6-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-border hover:border-border-h text-muted hover:text-primary text-sm font-medium rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
