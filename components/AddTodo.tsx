'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface AddTodoProps {
  onAdd: (title: string, description: string, priority: 'low' | 'medium' | 'high', tags: string[]) => void
  onAISuggest?: (description: string) => Promise<void>
}

export default function AddTodo({ onAdd, onAISuggest }: AddTodoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [tags, setTags] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      onAdd(title, description, priority, tagArray)
      setTitle('')
      setDescription('')
      setPriority('medium')
      setTags('')
      setIsOpen(false)
    }
  }

  const handleAISuggest = async () => {
    if (onAISuggest && description) {
      setIsGenerating(true)
      await onAISuggest(description)
      setIsGenerating(false)
    }
  }

  return (
    <div className="mb-6">
      {!isOpen ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(true)}
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Task
        </motion.button>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title..."
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add details about your task..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="work, personal, urgent"
                />
              </div>
            </div>

            {onAISuggest && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAISuggest}
                  disabled={!description || isGenerating}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      AI Suggest Subtasks
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setTitle('')
                  setDescription('')
                  setPriority('medium')
                  setTags('')
                }}
                className="flex-1 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.form>
      )}
    </div>
  )
}