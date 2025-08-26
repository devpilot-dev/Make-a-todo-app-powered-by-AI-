export interface AITaskSuggestion {
  title: string
  priority: 'low' | 'medium' | 'high'
  estimatedTime?: string
}

export class AIService {
  static async generateSubtasks(taskDescription: string): Promise<AITaskSuggestion[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const suggestions: AITaskSuggestion[] = []
    const keywords = taskDescription.toLowerCase()
    
    if (keywords.includes('project') || keywords.includes('app') || keywords.includes('website')) {
      suggestions.push(
        { title: 'Define project requirements and scope', priority: 'high' },
        { title: 'Create project structure and setup', priority: 'high' },
        { title: 'Design user interface mockups', priority: 'medium' },
        { title: 'Implement core functionality', priority: 'high' },
        { title: 'Add testing and validation', priority: 'medium' },
        { title: 'Deploy and document', priority: 'low' }
      )
    } else if (keywords.includes('meeting') || keywords.includes('presentation')) {
      suggestions.push(
        { title: 'Prepare agenda and talking points', priority: 'high' },
        { title: 'Create presentation slides', priority: 'medium' },
        { title: 'Send calendar invites', priority: 'high' },
        { title: 'Review and practice', priority: 'low' }
      )
    } else if (keywords.includes('study') || keywords.includes('learn') || keywords.includes('course')) {
      suggestions.push(
        { title: 'Gather learning resources', priority: 'high' },
        { title: 'Create study schedule', priority: 'medium' },
        { title: 'Take notes and summarize', priority: 'high' },
        { title: 'Practice with exercises', priority: 'medium' },
        { title: 'Review and test knowledge', priority: 'low' }
      )
    } else if (keywords.includes('bug') || keywords.includes('fix') || keywords.includes('issue')) {
      suggestions.push(
        { title: 'Reproduce the issue', priority: 'high' },
        { title: 'Identify root cause', priority: 'high' },
        { title: 'Implement fix', priority: 'high' },
        { title: 'Test the solution', priority: 'medium' },
        { title: 'Document the fix', priority: 'low' }
      )
    } else {
      suggestions.push(
        { title: 'Research and gather information', priority: 'medium' },
        { title: 'Plan approach and timeline', priority: 'high' },
        { title: 'Execute main task', priority: 'high' },
        { title: 'Review and refine', priority: 'low' }
      )
    }
    
    return suggestions
  }

  static async categorizeTask(title: string, description?: string): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const text = `${title} ${description || ''}`.toLowerCase()
    const categories: string[] = []
    
    if (text.includes('work') || text.includes('project') || text.includes('meeting')) {
      categories.push('work')
    }
    if (text.includes('personal') || text.includes('home') || text.includes('family')) {
      categories.push('personal')
    }
    if (text.includes('urgent') || text.includes('asap') || text.includes('important')) {
      categories.push('urgent')
    }
    if (text.includes('code') || text.includes('develop') || text.includes('programming')) {
      categories.push('development')
    }
    if (text.includes('design') || text.includes('ui') || text.includes('ux')) {
      categories.push('design')
    }
    
    if (categories.length === 0) {
      categories.push('general')
    }
    
    return categories
  }

  static async prioritizeTask(title: string, description?: string): Promise<'low' | 'medium' | 'high'> {
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const text = `${title} ${description || ''}`.toLowerCase()
    
    if (text.includes('urgent') || text.includes('critical') || text.includes('asap') || text.includes('important')) {
      return 'high'
    }
    if (text.includes('soon') || text.includes('next') || text.includes('should')) {
      return 'medium'
    }
    
    return 'low'
  }
}