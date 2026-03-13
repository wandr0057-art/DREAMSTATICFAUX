'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

// Mock user data (would be fetched based on username param)
const getUserByUsername = (username: string) => ({
  username: username,
  displayName: username.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
  bio: 'Exploring the digital dreamscape 🎨 | Creating vibes and moods',
  stats: {
    houseWalls: 23,
    nodesExplored: 89,
    timeTaken: '24h 15m',
  },
  joined: 'March 2024',
  followers: 567,
  following: 234,
})

// Mock user rooms
const userRooms = [
  {
    id: '5',
    name: 'Glitch_Matrix',
    tag: 'Glitch',
    palette: ['#00ff00', '#003300', '#006600', '#009900', '#00cc00'],
    imageUrl: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=400&auto=format&fit=crop',
    likes: 156,
  },
  {
    id: '6',
    name: 'Cyber_Cafe',
    tag: 'Cyber',
    palette: ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
    likes: 98,
  },
  {
    id: '7',
    name: 'Neon Lights',
    tag: 'Synthwave',
    palette: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=400&auto=format&fit=crop',
    likes: 234,
  },
  {
    id: '8',
    name: 'System Core',
    tag: 'Hardware',
    palette: ['#d1d5db', '#9ca3af', '#4b5563', '#ef4444', '#111827'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
    likes: 67,
  },
]

export default function PublicProfile() {
  const params = useParams()
  const username = params.username as string
  const user = getUserByUsername(username)

  return (
    <div className="container" style={{ padding: '40px 32px' }}>
      {/* Back Link */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/feed" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          color: 'var(--muted-foreground)', 
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 600,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Gallery
        </Link>
      </div>

      {/* Profile Header */}
      <div className="surface" style={{ padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          {/* Avatar */}
          <div style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, var(--secondary), var(--primary))',
            border: '3px solid var(--foreground)',
            boxShadow: '4px 4px 0 var(--foreground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 900,
            color: '#fff',
            flexShrink: 0,
          }}>
            {user.username[0].toUpperCase()}
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase' }}>
                  {user.displayName}
                </h1>
                <p className="mono" style={{ color: 'var(--muted-foreground)', marginTop: '4px' }}>
                  @{user.username}
                </p>
              </div>
              <button className="btn" style={{ width: 'auto', padding: '10px 20px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Follow
              </button>
            </div>

            <p style={{ marginTop: '16px', fontSize: '16px', maxWidth: '500px' }}>
              {user.bio}
            </p>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '24px' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '20px' }}>{user.stats.houseWalls}</span>
                <span className="mono" style={{ color: 'var(--muted-foreground)', marginLeft: '8px' }}>Rooms</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, fontSize: '20px' }}>{user.followers}</span>
                <span className="mono" style={{ color: 'var(--muted-foreground)', marginLeft: '8px' }}>Followers</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, fontSize: '20px' }}>{user.following}</span>
                <span className="mono" style={{ color: 'var(--muted-foreground)', marginLeft: '8px' }}>Following</span>
              </div>
              <div>
                <span className="mono" style={{ color: 'var(--muted-foreground)' }}>Joined {user.joined}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-value">{user.stats.houseWalls}</div>
          <div className="stat-label">House Walls</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user.stats.nodesExplored}</div>
          <div className="stat-label">Nodes Explored</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user.stats.timeTaken}</div>
          <div className="stat-label">Time Taken</div>
        </div>
      </div>

      {/* Section Title */}
      <div style={{ marginBottom: '24px' }}>
        <h2 className="section-title">Public Rooms</h2>
      </div>

      {/* Rooms Grid */}
      <div className="room-grid">
        {userRooms.map(room => (
          <Link href={`/house/${room.id}`} key={room.id} style={{ textDecoration: 'none' }}>
            <div className="room-card pixel-border glitch-hover">
              <div className="room-image-container">
                <img src={room.imageUrl} alt={room.name} />
                <div className="room-tag">{room.tag}</div>
              </div>
              <div className="room-content">
                <div className="room-header">
                  <div>
                    <h3 className="room-name">{room.name}</h3>
                    <div className="room-creator mono">@{user.username}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{room.likes}</span>
                  </div>
                </div>
                <div className="palette-row">
                  {room.palette.map((color, i) => (
                    <div key={i} className="color-swatch" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {userRooms.length === 0 && (
        <div style={{ 
          padding: '48px', 
          textAlign: 'center', 
          border: '2px dashed var(--foreground)',
          background: 'var(--muted)',
        }}>
          <p className="mono" style={{ color: 'var(--muted-foreground)' }}>
            No public rooms yet.
          </p>
        </div>
      )}
    </div>
  )
}

