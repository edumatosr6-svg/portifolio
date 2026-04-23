import { Trash2, Flag } from 'lucide-react'
import { useTaskStore } from '../store/taskStore'
import { useState } from 'react'

const priorityColors = {
  low: 'text-blue-400 bg-blue-400/10',
  medium: 'text-yellow-400 bg-yellow-400/10',
  high: 'text-red-400 bg-red-400/10',
}

export default function TaskCard({ task, boardId, columnId }) {
  const { updateTask, deleteTask } = useTaskStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTask(boardId, columnId, task.id, { title: editTitle })
      setIsEditing(false)
    }
  }

  return (
    <div className="bg-surface rounded-lg p-3 hover:shadow-md transition-shadow group cursor-pointer border border-border hover:border-accent">
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') setIsEditing(false)
          }}
          className="w-full bg-card px-2 py-1 rounded text-primary focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          autoFocus
        />
      ) : (
        <>
          <p className="text-primary text-sm font-medium mb-2 break-words">{task.title}</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${priorityColors[task.priority]}`}>
                <Flag size={12} />
                {task.priority}
              </span>
            </div>
            <button
              onClick={() => deleteTask(boardId, columnId, task.id)}
              className="p-1 hover:bg-red-500/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} className="text-danger" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
