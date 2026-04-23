import { create } from 'zustand'

const generateId = () => Math.random().toString(36).substr(2, 9)

export const useTaskStore = create((set) => ({
  boards: [
    {
      id: generateId(),
      name: 'Welcome',
      columns: [
        {
          id: generateId(),
          name: 'To Do',
          tasks: [
            { id: generateId(), title: 'Create your first task', description: 'Click + to add tasks', priority: 'medium', dueDate: null, assignee: null, tags: [] },
          ],
        },
        {
          id: generateId(),
          name: 'In Progress',
          tasks: [],
        },
        {
          id: generateId(),
          name: 'Done',
          tasks: [],
        },
      ],
    },
  ],
  currentBoardId: null,

  selectBoard: (boardId) => set({ currentBoardId: boardId }),

  createBoard: (name) =>
    set((state) => {
      const newBoard = {
        id: generateId(),
        name,
        columns: [
          { id: generateId(), name: 'To Do', tasks: [] },
          { id: generateId(), name: 'In Progress', tasks: [] },
          { id: generateId(), name: 'Done', tasks: [] },
        ],
      }
      return {
        boards: [...state.boards, newBoard],
        currentBoardId: newBoard.id,
      }
    }),

  deleteBoard: (boardId) =>
    set((state) => ({
      boards: state.boards.filter((b) => b.id !== boardId),
      currentBoardId: state.currentBoardId === boardId ? null : state.currentBoardId,
    })),

  addTask: (boardId, columnId, task) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((col) =>
                col.id === columnId ? { ...col, tasks: [...col.tasks, { id: generateId(), ...task }] } : col,
              ),
            }
          : board,
      ),
    })),

  updateTask: (boardId, columnId, taskId, updates) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((col) =>
                col.id === columnId
                  ? { ...col, tasks: col.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)) }
                  : col,
              ),
            }
          : board,
      ),
    })),

  deleteTask: (boardId, columnId, taskId) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((col) =>
                col.id === columnId ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) } : col,
              ),
            }
          : board,
      ),
    })),

  moveTask: (boardId, sourceColumnId, targetColumnId, taskId) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((col) => {
                if (col.id === sourceColumnId) {
                  return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
                }
                if (col.id === targetColumnId) {
                  const task = board.columns
                    .find((c) => c.id === sourceColumnId)
                    ?.tasks.find((t) => t.id === taskId)
                  return task ? { ...col, tasks: [...col.tasks, task] } : col
                }
                return col
              }),
            }
          : board,
      ),
    })),
}))
