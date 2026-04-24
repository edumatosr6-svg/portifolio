import { useMemo } from 'react'
import { TrendingUp, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'
import { analyzePrompt } from '../utils/analyzer'

const SEVERITY_STYLES = {
  high: { icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30' },
  medium: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  low: { icon: CheckCircle2, color: 'text-accent-3', bg: 'bg-accent-3/10', border: 'border-accent-3/30' },
}

const SUGGESTION_LABELS = {
  clarity: 'Clareza',
  specificity: 'Especificidade',
  structure: 'Estrutura',
  context: 'Contexto',
  completeness: 'Completude',
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
    analysis.overall >= 80 ? 'Excelente' :
    analysis.overall >= 60 ? 'Bom' :
    analysis.overall >= 40 ? 'Precisa melhorar' :
                             'Fraco'

  return (
    <aside className="w-80 bg-surface border-l border-border overflow-y-auto">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-accent" />
          <h2 className="text-sm font-semibold text-primary">Análise de Qualidade</h2>
        </div>

        <div className="glass rounded-xl p-4 text-center">
          <div className={`text-5xl font-bold ${overallColor}`}>{analysis.overall}</div>
          <div className="text-xs text-muted mt-1">de 100</div>
          <div className={`text-sm font-medium mt-2 ${overallColor}`}>{overallLabel}</div>
        </div>
      </div>

      <div className="p-5 border-b border-border space-y-4">
        <h3 className="text-xs uppercase font-semibold text-muted">Detalhamento</h3>
        <ScoreBar label="Clareza" value={analysis.scores.clarity} />
        <ScoreBar label="Especificidade" value={analysis.scores.specificity} />
        <ScoreBar label="Estrutura" value={analysis.scores.structure} />
        <ScoreBar label="Contexto" value={analysis.scores.context} />
      </div>

      <div className="p-5 border-b border-border">
        <h3 className="text-xs uppercase font-semibold text-muted mb-3">Estatísticas</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-primary">{analysis.stats.wordCount}</div>
            <div className="text-[10px] text-muted">Palavras</div>
          </div>
          <div className="bg-card rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-primary">{analysis.stats.charCount}</div>
            <div className="text-[10px] text-muted">Caracteres</div>
          </div>
          <div className="bg-card rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-primary">{analysis.stats.lineCount}</div>
            <div className="text-[10px] text-muted">Linhas</div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xs uppercase font-semibold text-muted mb-3">
          Sugestões ({analysis.suggestions.length})
        </h3>
        {analysis.suggestions.length === 0 ? (
          <div className="text-center py-6 text-muted text-sm">
            <CheckCircle2 size={32} className="mx-auto mb-2 text-success" />
            <p>Ótimo! Nenhuma melhoria necessária.</p>
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
                    <p className="text-xs font-semibold text-primary">
                      {SUGGESTION_LABELS[s.type] || s.type}
                    </p>
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
