import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const DATA_PATH = join(process.cwd(), 'data', 'rooms.json')

export interface Room {
  id: string
  name: string
  creator?: string
  palette?: string[]
  imageUrl?: string | null
  musicPreview?: any
  tags?: string[]
  createdAt: string
  isPublic?: boolean
}

async function read(): Promise<Room[]> {
  try {
    const txt = await readFile(DATA_PATH, 'utf-8')
    return JSON.parse(txt)
  } catch {
    return []
  }
}

async function write(data: Room[]): Promise<void> {
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function getRooms(): Promise<Room[]> {
  return read()
}

export async function saveRoom(room: Room): Promise<Room> {
  const arr = await read()
  arr.unshift(room)
  await write(arr)
  return room
}

export async function getRoomById(id: string): Promise<Room | null> {
  const arr = await read()
  return arr.find(r => r.id === id) || null
}

export async function updateRoom(id: string, patch: Partial<Room>): Promise<Room | null> {
  const arr = await read()
  const idx = arr.findIndex(r => r.id === id)
  if (idx === -1) return null
  arr[idx] = { ...arr[idx], ...patch }
  await write(arr)
  return arr[idx]
}

export async function deleteRoom(id: string): Promise<boolean> {
  const arr = await read()
  const next = arr.filter(r => r.id !== id)
  await write(next)
  return true
}

