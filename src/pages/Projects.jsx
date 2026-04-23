import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ElectricBorder from '../components/ElectricBorder'
export default function Projects() {
  return (
    <main className="min-h-screen bg-bg px-6 pt-28 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary tracking-tight">Projects</h1>
            <p className="mt-2 text-muted">
              A selection of things I've built — click to explore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ElectricBorder
                key={project.id}
                color="#6366f1"
                speed={0.8}
                chaos={0.1}
                borderRadius={12}
              >
                <ProjectCard project={project} />
              </ElectricBorder>
            ))}
          </div>
        </div>
    </main>
  )
}
