import { NextRequest, NextResponse } from 'next/server'

// Test accounts database (in production, this would be a real database)
const testUsers = [
  {
    id: '1',
    username: 'testuser',
    email: 'test@dreamstatic.app',
    password: 'password123',
    displayName: 'Test User',
    bio: 'Exploring the digital dreamscape',
    stats: {
      houseWalls: 5,
      nodesExplored: 12,
      timeTaken: '2h 30m',
    },
    joined: 'January 2024',
    followers: 42,
    following: 88,
  },
  {
    id: '2',
    username: 'cyber_angel',
    email: 'cyber@dreamstatic.app',
    password: 'y2k2024',
    displayName: 'Cyber Angel',
    bio: 'Creating dreamscapes one pixel at a time ✨ | Y2K enthusiast',
    stats: {
      houseWalls: 42,
      nodesExplored: 156,
      timeTaken: '48h 32m',
    },
    joined: 'January 2024',
    followers: 1234,
    following: 567,
  },
]

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Find user by email
    const user = testUsers.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user
    
    // Create response with user data
    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })

    // Set auth cookie
    response.cookies.set('auth_token', JSON.stringify({
      userId: user.id,
      username: user.username,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

// GET /api/auth/login - Check if user is logged in
export async function GET(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')

  if (!authToken) {
    return NextResponse.json({ authenticated: false })
  }

  try {
    const userData = JSON.parse(authToken.value)
    const user = testUsers.find(u => u.id === userData.userId)

    if (!user) {
      return NextResponse.json({ authenticated: false })
    }

    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({
      authenticated: true,
      user: userWithoutPassword,
    })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}

