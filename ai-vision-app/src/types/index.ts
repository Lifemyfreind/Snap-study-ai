export type ChatMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  images?: string[]
}

export type ChatRequest = {
  messages: ChatMessage[]
}

export type DocSession = {
  id: string
  createdAt: number
}

