import { GitHubIcon, ExternalLinkIcon } from './Icons'

const STATUS = {
  online:      { label: 'Online',      dot: 'bg-emerald-500' },
  'in-progress': { label: 'In Progress', dot: 'bg-amber-500'   },
  offline:     { label: 'Offline',     dot: 'bg-gray-500'    },
}

export default function ProjectCard({ project }) {
  const { title, description, tech, status, liveUrl, githubUrl } = project
  const s = STATUS[status]

  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-h hover:shadow-glow">
      {/* Title + status */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-primary leading-snug">
          {title}
        </h3>
        {s && (
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-subtle">
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="flex-1 text-sm text-muted leading-relaxed">{description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-subtle"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-1">
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-accent to-accent-2 px-3 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 active:opacity-80"
        >
          <ExternalLinkIcon className="w-3.5 h-3.5" />
          View Project
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted transition-all duration-200 hover:border-border-h hover:text-primary"
        >
          <GitHubIcon className="w-3.5 h-3.5" />
          Code
        </a>
      </div>
    </article>
  )
}
