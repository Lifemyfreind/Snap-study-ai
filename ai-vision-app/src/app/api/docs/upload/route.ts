import { NextRequest, NextResponse } from 'next/server'
import { ensureSessionDir, detectMimeTypeByExt } from '@/lib/files'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const sessionId = String(form.get('sessionId') || '')
    if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })

    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    if (buffer.length > 8 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 8MB)' }, { status: 413 })
    }

    const dir = await ensureSessionDir(sessionId)
    const safeName = (file.name || 'image').replace(/[^a-zA-Z0-9_.-]/g, '_')
    const timestamp = Date.now()
    const ext = path.extname(safeName) || '.jpg'
    const filename = `${timestamp}${ext}`
    const target = path.join(dir, filename)
    await fs.writeFile(target, buffer)

    const mime = detectMimeTypeByExt(filename)
    return NextResponse.json({ ok: true, filename, mime })
  } catch (err: any) {
    console.error('upload error', err)
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 })
  }
}

