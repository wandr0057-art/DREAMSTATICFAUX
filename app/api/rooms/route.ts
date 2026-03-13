import { NextRequest, NextResponse } from 'next/server'
import { getRooms, saveRoom } from '@/lib/db'

// GET /api/rooms - Get all public rooms
export async function GET(request: NextRequest) {
  try {
    const rooms = await getRooms()
    // Filter to only public rooms
    const publicRooms = rooms.filter((room: any) => room.isPublic !== false)
    return NextResponse.json(publicRooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 })
  }
}

// POST /api/rooms - Create a new room
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: 'Room name is required' }, { status: 400 })
    }

    // Check for duplicate room names and append suffix if needed
    const rooms = await getRooms()
    let roomName = body.name
    let suffix = 1
    while (rooms.some((r: any) => r.name === roomName)) {
      roomName = `${body.name}_${suffix}`
      suffix++
    }

    // Create room object with required fields
    const newRoom = {
      id: generateId(),
      name: roomName,
      creator: body.creator || 'anon',
      palette: body.palette || [],
      imageUrl: body.imageUrl || null,
      musicPreview: body.musicPreview || null,
      tags: body.tags || [],
      createdAt: new Date().toISOString(),
      isPublic: body.isPublic !== false,
    }

    await saveRoom(newRoom)
    
    return NextResponse.json(newRoom, { status: 201 })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }
}

// Helper function to generate a unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + '.' + Math.random().toString(36).substring(2, 15)
}
