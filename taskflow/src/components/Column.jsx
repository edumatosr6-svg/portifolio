import { Plus, Trash2 } from 'lucide-react'
import TaskCard from './TaskCard'
import { useTaskStore } from '../store/taskStore'
import { useState } from 'react'

export default function Column({ boardId, column }) {
  const { addTask } = useTaskStore()
  const [showNewTask, setShowNewTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(boardId, column.id, {
        title: newTaskTitle,
        description: '',
        priority: 'medium',
        dueDate: null,
        assignee: null,
        tags: [],
      })
      setNewTaskTitle('')
      setShowNewTask(false)
    }
  }

  return (
    <div className="w-80 flex-shrink-0 bg-card rounded-lg overflow-hidden flex flex-col max-h-full">
      {/* Header */}
      <div className="bg-surface px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-primary">{column.name}</h3>
        <span className="text-xs bg-card px-2 py-1 rounded text-muted">{column.tasks.length}</span>
      </div>

      {/* Tasks */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} boardId={boardId} columnId={column.id} />
        ))}
      </div>

      {/* Add Task Button */}
      <div className="p-3 border-t border-border">
        {!showNewTask ? (
          <button
            onClick={() => setShowNewTask(true)}
            className="w-full py-2 px-3 hover:bg-surface rounded-lg transition-colors flex items-center justify-center gap-2 text-muted hover:text-primary text-sm"
          >
            <Plus size={18} /> Add Task
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full bg-surface px-3 py-2 rounded text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleAddTask()
                if (e.key === 'Escape') {
                  setShowNewTask(false)
                  setNewTaskTitle('')
                }
              }}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddTask}
                className="flex-1 bg-accent text-white py-1.5 rounded text-sm hover:bg-accent/90 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowNewTask(false)
                  setNewTaskTitle('')
                }}
                className="flex-1 bg-surface text-primary py-1.5 rounded text-sm hover:bg-surface/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
