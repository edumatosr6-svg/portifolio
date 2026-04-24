import { useState, useEffect } from 'react'
import { Copy, Check, Sparkles, Wand2 } from 'lucide-react'
import { usePromptStore } from '../store/promptStore'
import { optimizePrompt } from '../utils/analyzer'

export default function Editor({ prompt }) {
  const { updatePrompt } = usePromptStore()
  const [copied, setCopied] = useState(false)
  const [title, setTitle] = useState(prompt.title)
  const [content, setContent] = useState(prompt.content)

  useEffect(() => {
    setTitle(prompt.title)
    setContent(prompt.content)
  }, [prompt.id])

  useEffect(() => {
    const t = setTimeout(() => {
      if (title !== prompt.title || content !== prompt.content) {
        updatePrompt(prompt.id, { title, content })
      }
    }, 300)
    return () => clearTimeout(t)
  }, [title, content])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOptimize = () => {
    const optimized = optimizePrompt(content)
    setContent(optimized)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-bg">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent flex-1 text-xl font-semibold text-primary focus:outline-none placeholder:text-muted"
          placeholder="Título do prompt..."
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleOptimize}
            className="px-3 py-2 bg-card hover:bg-card-hover border border-border rounded-lg text-sm text-primary flex items-center gap-2 transition-colors"
          >
            <Wand2 size={14} className="text-accent" /> Otimizar
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-2 gradient-bg rounded-lg text-sm text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva seu prompt aqui...&#10;&#10;Dica: Comece definindo o papel da IA, depois descreva a tarefa claramente e especifique o formato de saída."
          className="w-full h-full min-h-[500px] bg-card border border-border rounded-xl p-5 text-primary placeholder:text-subtle focus:outline-none focus:border-accent resize-none font-mono text-sm leading-relaxed"
          spellCheck="false"
        />
      </div>

      <div className="px-6 py-3 border-t border-border flex items-center justify-between text-xs text-muted bg-surface">
        <div className="flex gap-4">
          <span>{content.length} caracteres</span>
          <span>{content.split(/\s+/).filter(Boolean).length} palavras</span>
          <span>{content.split('\n').length} linhas</span>
        </div>
        <div className="flex items-center gap-1 text-subtle">
          <Sparkles size={12} />
          Salvo automaticamente
        </div>
      </div>
    </div>
  )
}
