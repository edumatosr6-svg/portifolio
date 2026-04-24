import { useState } from 'react'
import { X } from 'lucide-react'
import { TEMPLATES, CATEGORIES } from '../data/templates'
import { usePromptStore } from '../store/promptStore'

export default function TemplateModal({ onClose }) {
  const [category, setCategory] = useState('all')
  const { createPrompt } = usePromptStore()

  const filtered = category === 'all' ? TEMPLATES : TEMPLATES.filter((t) => t.category === category)

  const handleUseTemplate = (template) => {
    createPrompt({
      title: template.name,
      content: template.prompt,
      category: template.category,
    })
    onClose()
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface border border-border rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden"
      >
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-primary">Biblioteca de Templates</h2>
            <p className="text-xs text-muted mt-0.5">Prompts prontos para acelerar seu trabalho</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-card rounded-lg transition-colors">
            <X size={20} className="text-muted" />
          </button>
        </div>

        <div className="px-5 py-3 border-b border-border flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                category === cat.id
                  ? 'gradient-bg text-white'
                  : 'bg-card text-muted hover:text-primary'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((template) => (
              <button
                key={template.id}
                onClick={() => handleUseTemplate(template)}
                className="text-left p-4 bg-card hover:bg-card-hover border border-border hover:border-accent rounded-xl transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{template.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-primary">{template.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted line-clamp-2 mt-1">
                      {template.prompt.slice(0, 120)}...
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
