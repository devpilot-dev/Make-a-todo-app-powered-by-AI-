'use client'

import { useState, useEffect } from 'react'
import { Todo } from '@/types/todo'
import { AIService } from '@/lib/ai-service'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = async (title: string, description: string, priority: 'low' | 'medium' | 'high', tags: string[]) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority,
      tags,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const aiTags = await AIService.categorizeTask(title, description)
    newTodo.tags = [...new Set([...tags, ...aiTags])]

    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id: string, title: string, description?: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, title, description, updatedAt: new Date() }
        : todo
    ))
  }

  const generateSubtasks = async (parentDescription: string) => {
    const suggestions = await AIService.generateSubtasks(parentDescription)
    
    const newTodos = suggestions.map(suggestion => ({
      id: Date.now().toString() + Math.random(),
      title: suggestion.title,
      description: '',
      completed: false,
      priority: suggestion.priority,
      tags: ['ai-generated'],
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    setTodos([...newTodos, ...todos])
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
      return true
    })
    .filter(todo => {
      if (!searchTerm) return true
      return todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             todo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             todo.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    })

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  }

  return {
    todos: filteredTodos,
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
  }
}