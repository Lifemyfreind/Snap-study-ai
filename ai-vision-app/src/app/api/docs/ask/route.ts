import { NextRequest, NextResponse } from 'next/server'
import { getSessionDir, detectMimeTypeByExt } from '@/lib/files'
import { promises as fs } from 'fs'
import path from 'path'
import { openai, defaultModel } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, question } = await req.json()
    if (!sessionId || !question) {
      return NextResponse.json({ error: 'Missing sessionId or question' }, { status: 400 })
    }

    const dir = getSessionDir(sessionId)
    let files: string[] = []
    try {
      files = (await fs.readdir(dir)).filter((f) => /\.(png|jpe?g|webp|gif|bmp|heic)$/i.test(f))
    } catch {
      files = []
    }

    // Sort by filename (timestamp prefix) and limit to 12 recent images
    files.sort()
    const selected = files.slice(-12)

    const imageParts = [] as Array<{ type: 'input_image'; image_url: string }>
    for (const fname of selected) {
      const fpath = path.join(dir, fname)
      const data = await fs.readFile(fpath)
      const b64 = data.toString('base64')
      const mime = detectMimeTypeByExt(fname)
      imageParts.push({ type: 'input_image', image_url: `data:${mime};base64,${b64}` })
    }

    const systemPrompt = `You are an expert study assistant. Use only the provided page images to answer. If the answer is not present, say you cannot find it in the pages. Be concise and helpful.`

    const input = [
      { role: 'system' as const, content: [{ type: 'input_text' as const, text: systemPrompt }] },
      {
        role: 'user' as const,
        content: [
          { type: 'input_text' as const, text: question },
          ...imageParts,
        ],
      },
    ]

    const response = await openai.responses.create({ model: defaultModel, input })
    const text = (response as any).output_text || ''
    return NextResponse.json({ content: text, imagesUsed: selected.length })
  } catch (err: any) {
    console.error('ask error', err)
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 })
  }
}

