import { NextResponse } from 'next/server'
import { ensureDataDirs, ensureSessionDir } from '@/lib/files'

export async function POST() {
  try {
    await ensureDataDirs()
    const id = crypto.randomUUID()
    await ensureSessionDir(id)
    return NextResponse.json({ id })
  } catch (err: any) {
    console.error('create session error', err)
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 })
  }
}

