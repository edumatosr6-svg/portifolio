import { Plus, Trash2 } from 'lucide-react'
import { useTaskStore } from '../store/taskStore'
import { useState } from 'react'

export default function Sidebar() {
  const { boards, currentBoardId, selectBoard, deleteBoard, createBoard } = useTaskStore()
  const [showNewBoard, setShowNewBoard] = useState(false)
  const [newBoardName, setNewBoardName] = useState('')

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      createBoard(newBoardName)
      setNewBoardName('')
      setShowNewBoard(false)
    }
  }

  return (
    <div className="w-64 bg-surface border-r border-card flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-card">
        <h2 className="text-lg font-bold text-primary">TaskFlow</h2>
        <p className="text-xs text-muted mt-1">Collaborative Tasks</p>
      </div>

      {/* Boards List */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-xs text-muted uppercase font-semibold mb-3">Boards</p>
        <div className="space-y-2">
          {boards.map((board) => (
            <div
              key={board.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors group flex items-center justify-between ${
                currentBoardId === board.id ? 'bg-accent text-white' : 'hover:bg-card text-primary'
              }`}
              onClick={() => selectBoard(board.id)}
            >
              <span className="font-medium text-sm truncate">{board.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteBoard(board.id)
                }}
                className={`p-1 rounded hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity ${
                  currentBoardId === board.id ? 'hover:bg-white/20' : ''
                }`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* New Board Button */}
      <div className="p-4 border-t border-card">
        <button
          onClick={() => setShowNewBoard(true)}
          className="w-full py-2 px-3 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm"
        >
          <Plus size={18} /> New Board
        </button>
      </div>

      {/* New Board Modal */}
      {showNewBoard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface p-6 rounded-xl w-96 card-shadow border border-card">
            <h2 className="text-lg font-bold mb-4 text-primary">Create New Board</h2>
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Board name..."
              className="w-full bg-card px-3 py-2 rounded-lg mb-4 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateBoard()}
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleCreateBoard}
                className="flex-1 bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewBoard(false)
                  setNewBoardName('')
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
