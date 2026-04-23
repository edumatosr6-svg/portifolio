import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import Analyzer from './components/Analyzer'
import TemplateModal from './components/TemplateModal'
import EmptyState from './components/EmptyState'
import { usePromptStore } from './store/promptStore'

export default function App() {
  const [showTemplates, setShowTemplates] = useState(false)
  const { prompts, activePromptId } = usePromptStore()

  const activePrompt = prompts.find((p) => p.id === activePromptId)

  return (
    <div className="h-screen flex bg-bg overflow-hidden">
      <Sidebar onNewTemplate={() => setShowTemplates(true)} />

      {activePrompt ? (
        <>
          <Editor prompt={activePrompt} key={activePrompt.id} />
          <Analyzer content={activePrompt.content} />
        </>
      ) : (
        <EmptyState onOpenTemplates={() => setShowTemplates(true)} />
      )}

      {showTemplates && <TemplateModal onClose={() => setShowTemplates(false)} />}
    </div>
  )
}
