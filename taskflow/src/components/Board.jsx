import { Plus } from 'lucide-react'
import Column from './Column'
import { useTaskStore } from '../store/taskStore'
import { useState } from 'react'

export default function Board({ board }) {
  const [newColumnName, setNewColumnName] = useState('')
  const [showNewColumn, setShowNewColumn] = useState(false)
  const [editingColumnId, setEditingColumnId] = useState(null)

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newColumn = {
        id: Math.random().toString(36).substr(2, 9),
        name: newColumnName,
        tasks: [],
      }
      setNewColumnName('')
      setShowNewColumn(false)
    }
  }

  return (
    <div className="flex-1 overflow-x-auto p-6">
      <div className="flex gap-6 min-w-min">
        {board.columns.map((column) => (
          <Column key={column.id} boardId={board.id} column={column} />
        ))}

        {/* Add Column Button */}
        <div className="w-80 flex-shrink-0">
          <button
            onClick={() => setShowNewColumn(true)}
            className="w-full py-4 px-4 border-2 border-dashed border-card hover:border-accent rounded-lg transition-colors flex items-center justify-center gap-2 text-muted hover:text-accent"
          >
            <Plus size={20} /> Add Column
          </button>
        </div>
      </div>

      {showNewColumn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface p-6 rounded-xl w-96 card-shadow border border-card">
            <h2 className="text-lg font-bold mb-4 text-primary">Add Column</h2>
            <input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Column name..."
              className="w-full bg-card px-3 py-2 rounded-lg mb-4 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddColumn}
                className="flex-1 bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowNewColumn(false)
                  setNewColumnName('')
                }}
                className="flex-1 bg-card text-primary py-2 rounded-lg hover:bg-card/80 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
