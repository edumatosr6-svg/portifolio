import { useMemo } from 'react'
import { TrendingUp, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'
import { analyzePrompt } from '../utils/analyzer'

const SEVERITY_STYLES = {
  high: { icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30' },
  medium: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  low: { icon: CheckCircle2, color: 'text-accent-3', bg: 'bg-accent-3/10', border: 'border-accent-3/30' },
}

function ScoreBar({ label, value }) {
  const color =
    value >= 80 ? 'from-success to-emerald-400' :
    value >= 60 ? 'from-accent to-accent-2' :
    value >= 40 ? 'from-warning to-orange-400' :
                  'from-danger to-red-400'

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted">{label}</span>
        <span className="text-xs font-semibold text-primary">{value}</span>
      </div>
      <div className="h-2 bg-card rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function Analyzer({ content }) {
  const analysis = useMemo(() => analyzePrompt(content || ''), [content])

  const overallColor =
    analysis.overall >= 80 ? 'text-success' :
    analysis.overall >= 60 ? 'text-accent' :
    analysis.overall >= 40 ? 'text-warning' :
                             'text-danger'

  const overallLabel =
    analysis.overall >= 80 ? 'Excellent' :
    analysis.overall >= 60 ? 'Good' :
    analysis.overall >= 40 ? 'Needs work' :
                             'Poor'

  return (
    <aside className="w-80 bg-surface border-l border-border overflow-y-auto">
      {/* Overall Score */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-accent" />
          <h2 className="text-sm font-semibold text-primary">Quality Analysis</h2>
        </div>

        <div className="glass rounded-xl p-4 text-center">
          <div className={`text-5xl font-bold ${overallColor}`}>{analysis.overall}</div>
          <div className="text-xs text-muted mt-1">out of 100</div>
          <div className={`text-sm font-medium mt-2 ${overallColor}`}>{overallLabel}</div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="p-5 border-b border-border space-y-4">
        <h3 className="text-xs uppercase font-semibold text-muted">Breakdown</h3>
        <ScoreBar label="Clarity" value={analysis.scores.clarity} />
        <ScoreBar label="Specificity" value={analysis.scores.specificity} />
        <ScoreBar label="Structure" value={analysis.scores.structure} />
        <ScoreBar label="Context" value={analysis.scores.context} />
      </div>

      {/* Stats */}
      <div className="p-5 border-b border-border">
        <h3 className="text-xs uppercase font-semibold text-muted mb-3">Statistics</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-primary">{analysis.stats.wordCount}</div>
            <div className="text-[10px] text-muted">Words</div>
          </div>
          <div className="bg-card rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-primary">{analysis.stats.charCount}</div>
            <div className="text-[10px] text-muted">Chars</div>
          </div>
          <div className="bg-card rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-primary">{analysis.stats.lineCount}</div>
            <div className="text-[10px] text-muted">Lines</div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="p-5">
        <h3 className="text-xs uppercase font-semibold text-muted mb-3">
          Suggestions ({analysis.suggestions.length})
        </h3>
        {analysis.suggestions.length === 0 ? (
          <div className="text-center py-6 text-muted text-sm">
            <CheckCircle2 size={32} className="mx-auto mb-2 text-success" />
            <p>Looks great! No improvements needed.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {analysis.suggestions.map((s, i) => {
              const style = SEVERITY_STYLES[s.severity]
              const Icon = style.icon
              return (
                <div
                  key={i}
                  className={`p-3 rounded-lg border ${style.bg} ${style.border} flex items-start gap-2`}
                >
                  <Icon size={16} className={`${style.color} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-xs font-semibold text-primary capitalize">{s.type}</p>
                    <p className="text-xs text-muted mt-0.5">{s.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}
