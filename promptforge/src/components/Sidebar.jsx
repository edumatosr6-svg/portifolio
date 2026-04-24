import { useState } from 'react'
import { Plus, Star, Trash2, Search, Zap } from 'lucide-react'
import { usePromptStore } from '../store/promptStore'

export default function Sidebar({ onNewTemplate }) {
  const { prompts, activePromptId, setActive, deletePrompt, toggleFavorite, createPrompt } = usePromptStore()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = prompts
    .filter((p) => (filter === 'favorites' ? p.favorite : true))
    .filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <aside className="w-72 bg-surface border-r border-border flex flex-col">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center glow-purple">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text">PromptForge</h1>
            <p className="text-[10px] text-muted -mt-0.5">Estúdio de Prompts IA</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2 border-b border-border">
        <button
          onClick={() =>
            createPrompt({
              title: 'Novo Prompt',
              content: 'Você é um assistente especialista.\n\nTarefa: ',
            })
          }
          className="w-full py-2 px-3 gradient-bg text-white rounded-lg flex items-center justify-center gap-2 font-medium text-sm hover:opacity-90 transition-opacity glow-purple"
        >
          <Plus size={16} /> Novo Prompt
        </button>
        <button
          onClick={onNewTemplate}
          className="w-full py-2 px-3 bg-card hover:bg-card-hover border border-border text-primary rounded-lg flex items-center justify-center gap-2 font-medium text-sm transition-colors"
        >
          📚 Templates
        </button>
      </div>

      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar prompts..."
            className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-primary placeholder:text-subtle focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 text-xs py-1.5 rounded transition-colors ${
              filter === 'all' ? 'bg-accent text-white' : 'bg-card text-muted hover:text-primary'
            }`}
          >
            Todos ({prompts.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`flex-1 text-xs py-1.5 rounded transition-colors ${
              filter === 'favorites' ? 'bg-accent text-white' : 'bg-card text-muted hover:text-primary'
            }`}
          >
            ⭐ Favoritos
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-muted text-sm">
            <p className="mb-2">🚀</p>
            <p>Nenhum prompt ainda</p>
            <p className="text-xs text-subtle mt-1">Crie um para começar</p>
          </div>
        ) : (
          filtered.map((prompt) => (
            <div
              key={prompt.id}
              onClick={() => setActive(prompt.id)}
              className={`group p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                activePromptId === prompt.id
                  ? 'bg-card border border-accent'
                  : 'hover:bg-card border border-transparent'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{prompt.title}</p>
                  <p className="text-xs text-muted line-clamp-1 mt-0.5">
                    {prompt.content.slice(0, 60) || 'Prompt vazio...'}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(prompt.id)
                    }}
                    className="p-1 hover:bg-surface rounded"
                  >
                    <Star
                      size={14}
                      className={prompt.favorite ? 'fill-warning text-warning' : 'text-muted'}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deletePrompt(prompt.id)
                    }}
                    className="p-1 hover:bg-danger/20 rounded"
                  >
                    <Trash2 size={14} className="text-danger" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-border text-center">
        <p className="text-[10px] text-subtle">Desenvolvido por Eduardo Matos</p>
      </div>
    </aside>
  )
}
