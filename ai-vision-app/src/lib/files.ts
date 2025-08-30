import { promises as fs } from 'fs'
import path from 'path'

const DATA_ROOT = path.join(process.cwd(), '.data')
const SESSIONS_ROOT = path.join(DATA_ROOT, 'sessions')

export async function ensureDataDirs(): Promise<void> {
  await fs.mkdir(SESSIONS_ROOT, { recursive: true })
}

export function getSessionDir(sessionId: string): string {
  return path.join(SESSIONS_ROOT, sessionId)
}

export async function ensureSessionDir(sessionId: string): Promise<string> {
  const dir = getSessionDir(sessionId)
  await fs.mkdir(dir, { recursive: true })
  return dir
}

export function detectMimeTypeByExt(filename: string): string {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.webp')) return 'image/webp'
  if (lower.endsWith('.gif')) return 'image/gif'
  if (lower.endsWith('.bmp')) return 'image/bmp'
  if (lower.endsWith('.heic')) return 'image/heic'
  return 'image/jpeg'
}

