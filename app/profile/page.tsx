'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock user data
const userData = {
  username: 'cyber_angel',
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
}

// Mock friends list
const friends = [
  { username: 'synthwave_queen', status: 'online' },
  { username: 'void_walker', status: 'offline' },
  { username: 'retrohacker', status: 'online' },
  { username: 'null_pointer', status: 'away' },
  { username: 'red_pill', status: 'online' },
]

// Mock recent rooms
const recentRooms = [
  {
    id: '1',
    name: 'Plastic Love',
    tag: 'Y2K Space',
    palette: ['#ff00ff', '#00ffff', '#1a1a2e', '#e94560', '#0f3460'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
    likes: 234,
  },
  {
    id: '2',
    name: 'Neon Sunset',
    tag: 'Synthwave',
    palette: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=400&auto=format&fit=crop',
    likes: 189,
  },
  {
    id: '3',
    name: 'Digital Void',
    tag: 'Glitch',
    palette: ['#00ff00', '#003300', '#006600', '#009900', '#00cc00'],
    imageUrl: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=400&auto=format&fit=crop',
    likes: 156,
  },
  {
    id: '4',
    name: 'Retro Cafe',
    tag: 'Hardware',
    palette: ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
    likes: 98,
  },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'saved' | 'about'>('rooms')

  return (
    <div className="container" style={{ padding: '40px 32px' }}>
      {/* Profile Header */}
      <div className="surface" style={{ padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          {/* Avatar */}
          <div style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
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
            CA
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase' }}>
                  {userData.displayName}
                </h1>
                <p className="mono" style={{ color: 'var(--muted-foreground)', marginTop: '4px' }}>
                  @{userData.username}
                </p>
              </div>
              <button className="btn" style={{ width: 'auto', padding: '10px 20px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Profile
              </button>
            </div>

            <p style={{ marginTop: '16px', fontSize: '16px', maxWidth: '500px' }}>
              {userData.bio}
            </p>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '24px' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '20px' }}>{userData.stats.houseWalls}</span>
                <span className="mono" style={{ color: 'var(--muted-foreground)', marginLeft: '8px' }}>Rooms</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, fontSize: '20px' }}>{userData.followers}</span>
                <span className="mono" style={{ color: 'var(--muted-foreground)', marginLeft: '8px' }}>Followers</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, fontSize: '20px' }}>{userData.following}</span>
                <span className="mono" style={{ color: 'var(--muted-foreground)', marginLeft: '8px' }}>Following</span>
              </div>
              <div>
                <span className="mono" style={{ color: 'var(--muted-foreground)' }}>Joined {userData.joined}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-value">{userData.stats.houseWalls}</div>
          <div className="stat-label">House Walls</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{userData.stats.nodesExplored}</div>
          <div className="stat-label">Nodes Explored</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{userData.stats.timeTaken}</div>
          <div className="stat-label">Time Taken</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
        
        {/* Left - Recent Creations */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <button 
              className={`filter-tag ${activeTab === 'rooms' ? 'active' : ''}`}
              onClick={() => setActiveTab('rooms')}
            >
              My Rooms
            </button>
            <button 
              className={`filter-tag ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              Saved
            </button>
            <button 
              className={`filter-tag ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
          </div>

          {/* Rooms Grid */}
          {activeTab === 'rooms' && (
            <div className="room-grid">
              {recentRooms.map(room => (
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
          )}

          {activeTab === 'saved' && (
            <div style={{ 
              padding: '48px', 
              textAlign: 'center', 
              border: '2px dashed var(--foreground)',
              background: 'var(--muted)',
            }}>
              <p className="mono" style={{ color: 'var(--muted-foreground)' }}>
                No saved rooms yet. Explore the gallery to find inspiration!
              </p>
              <Link href="/feed" style={{ marginTop: '16px', display: 'inline-block' }}>
                <button className="btn" style={{ width: 'auto' }}>Browse Gallery</button>
              </Link>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="surface" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>About This Profile</h3>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                {userData.bio}
              </p>
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--muted)' }}>
                <div className="mono" style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
                  MEMBER SINCE // {userData.joined.toUpperCase()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right - Friends List */}
        <div>
          <div className="surface" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>
              Friends ({friends.length})
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {friends.map(friend => (
                <Link 
                  href={`/profile/${friend.username}`} 
                  key={friend.username}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '8px',
                    background: 'var(--muted)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'var(--primary)',
                      border: '2px solid var(--foreground)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#fff',
                    }}>
                      {friend.username[0].toUpperCase()}
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '10px',
                      height: '10px',
                      background: friend.status === 'online' ? 'var(--success)' : 
                                 friend.status === 'away' ? 'var(--warning)' : 'var(--muted-foreground)',
                      border: '2px solid var(--foreground)',
                      borderRadius: '50%',
                    }} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>@{friend.username}</span>
                </Link>
              ))}
            </div>

            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '16px', padding: '10px' }}
            >
              Find Friends
            </button>
          </div>

          {/* Suggested Rooms */}
          <div className="surface" style={{ padding: '24px', marginTop: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>
              Trending Tags
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Y2K', 'Cyber', 'Liminal', 'Glitch', 'Synthwave', 'Retro'].map(tag => (
                <button key={tag} className="filter-tag" style={{ cursor: 'pointer' }}>
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

