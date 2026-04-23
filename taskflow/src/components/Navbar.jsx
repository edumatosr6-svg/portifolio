import { Bell, Settings, User } from 'lucide-react'

export default function Navbar({ boardName }) {
  return (
    <nav className="bg-surface border-b border-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold gradient-text">{boardName || 'TaskFlow'}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-card rounded-lg transition-colors">
          <Bell size={20} className="text-muted" />
        </button>
        <button className="p-2 hover:bg-card rounded-lg transition-colors">
          <Settings size={20} className="text-muted" />
        </button>
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
      </div>
    </nav>
  )
}
