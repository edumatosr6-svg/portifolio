import { Zap, Sparkles, Target, FileText } from 'lucide-react'
import { usePromptStore } from '../store/promptStore'

export default function EmptyState({ onOpenTemplates }) {
  const { createPrompt } = usePromptStore()

  const features = [
    { icon: Sparkles, title: 'Smart Analysis', desc: 'Get real-time quality scores and suggestions' },
    { icon: Target, title: 'Templates', desc: '8+ curated prompts for common tasks' },
    { icon: FileText, title: 'Auto-save', desc: 'Your prompts persist across sessions' },
  ]

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-bg">
      <div className="max-w-2xl text-center">
        {/* Hero */}
        <div className="inline-flex items-center justify-center w-16 h-16 gradient-bg rounded-2xl mb-6 glow-purple animate-glow">
          <Zap size={32} className="text-white" fill="white" />
        </div>

        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">Craft Better Prompts</span>
        </h1>
        <p className="text-lg text-muted mb-8">
          Design, analyze and optimize AI prompts with a purpose-built studio.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() =>
              createPrompt({
                title: 'New Prompt',
                content: 'You are an expert assistant.\n\nTask: ',
              })
            }
            className="px-6 py-3 gradient-bg rounded-xl text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity glow-purple"
          >
            <Zap size={18} /> Create Prompt
          </button>
          <button
            onClick={onOpenTemplates}
            className="px-6 py-3 bg-card hover:bg-card-hover border border-border rounded-xl text-primary font-medium transition-colors"
          >
            📚 Browse Templates
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="glass rounded-xl p-5 text-left">
              <f.icon size={20} className="text-accent mb-3" />
              <h3 className="font-semibold text-primary mb-1">{f.title}</h3>
              <p className="text-xs text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
