import React, { useState } from 'react'
import { useTaskStore } from './store/taskStore'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Board from './components/Board'
import { Plus } from 'lucide-react'

export default function App() {
  const [newBoardName, setNewBoardName] = useState('')
  const [showNewBoard, setShowNewBoard] = useState(false)
  const { boards, createBoard, selectBoard, currentBoardId } = useTaskStore()

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      createBoard(newBoardName)
      setNewBoardName('')
      setShowNewBoard(false)
    }
  }

  const currentBoard = boards.find(b => b.id === currentBoardId)

  return (
    <div className="flex h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar boardName={currentBoard?.name} />
        <div className="flex-1 overflow-hidden">
          {currentBoard ? (
            <Board board={currentBoard} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-muted mb-6">No board selected</p>
              <button
                onClick={() => setShowNewBoard(true)}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                <Plus size={20} /> Create Board
              </button>
            </div>
          )}
        </div>
      </div>

      {showNewBoard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface p-6 rounded-xl w-96 card-shadow">
            <h2 className="text-xl font-bold mb-4">Create New Board</h2>
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
                className="flex-1 bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewBoard(false)
                  setNewBoardName('')
                }}
                className="flex-1 bg-card text-primary py-2 rounded-lg hover:bg-card/80 transition-colors"
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
