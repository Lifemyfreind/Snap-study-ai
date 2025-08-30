import { NextRequest, NextResponse } from 'next/server'
import { openai, defaultModel } from '@/lib/openai'

type IncomingMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  images?: string[]
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages: IncomingMessage[] = body?.messages || []

    const input = messages.map((m) => ({
      role: m.role,
      content: [
        { type: 'input_text' as const, text: m.content || '' },
        ...((m.images || []).map((url) => ({ type: 'input_image' as const, image_url: url })))
      ]
    }))

    const response = await openai.responses.create({
      model: defaultModel,
      input,
    })

    const text = (response as any).output_text || ''
    return NextResponse.json({ content: text })
  } catch (err: any) {
    console.error('chat error', err)
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 })
  }
}

