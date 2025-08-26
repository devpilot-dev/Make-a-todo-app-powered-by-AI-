'use client'

import { useTodos } from '@/hooks/useTodos'
import AddTodo from '@/components/AddTodo'
import TodoItem from '@/components/TodoItem'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const {
    todos,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    generateSubtasks,
    clearCompleted,
    stats
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Todo App</h1>
          <p className="text-gray-600">Manage your tasks with AI-powered suggestions</p>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 bg-white rounded-lg shadow-sm p-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                Total: {stats.total}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Active: {stats.active}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Completed: {stats.completed}
              </span>
            </div>
            {stats.completed > 0 && (
              <button
                onClick={clearCompleted}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear Completed
              </button>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex bg-white rounded-lg shadow-sm">
              {(['all', 'active', 'completed'] as const).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 capitalize ${
                    filter === filterType
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  } ${filterType === 'all' ? 'rounded-l-lg' : ''} ${
                    filterType === 'completed' ? 'rounded-r-lg' : ''
                  } transition-colors`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AddTodo onAdd={addTodo} onAISuggest={generateSubtasks} />

        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {todos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-lg shadow-sm"
              >
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-500 text-lg">No tasks yet</p>
                <p className="text-gray-400 text-sm mt-2">Add your first task to get started!</p>
              </motion.div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}