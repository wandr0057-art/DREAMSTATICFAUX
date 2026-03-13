'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

// Mock room data
const mockRoom = {
  id: '1',
  name: 'Plastic Love',
  creator: 'cyber_angel',
  createdAt: '2024-03-10',
  views: 1284,
  users: 342,
  activity: 89,
  tag: 'Y2K Space',
  palette: ['#ff00ff', '#00ffff', '#1a1a2e', '#e94560', '#0f3460'],
  imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  music: {
    track: 'Virtual Reality',
    artist: 'Data Stream',
    artwork: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&auto=format&fit=crop',
    previewUrl: ''
  }
}

const mockComments = [
  { id: '1', author: 'synthwave_queen', text: 'This is giving me major nostalgia vibes! Love the color palette.', time: '2 hours ago' },
  { id: '2', author: 'void_walker', text: 'The magenta tones are everything 😍', time: '5 hours ago' },
  { id: '3', author: 'retrohacker', text: 'Saving this to my collection. Chef\'s kiss!', time: '1 day ago' },
]

export default function RoomDetail() {
  const params = useParams()
  const [playing, setPlaying] = useState(false)
  const [comment, setComment] = useState('')

  const room = mockRoom // In real app, fetch by params.id

  return (
    <div className="container" style={{ padding: '40px 32px' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '24px' }}>
        <a href="/feed" style={{ 
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
        </a>
      </div>

      {/* Room Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span className="room-tag">{room.tag}</span>
            <span className="mono" style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
              Created {room.createdAt}
            </span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1px' }}>
            {room.name}
          </h1>
          <p className="mono" style={{ color: 'var(--muted-foreground)', marginTop: '8px' }}>
            by @{room.creator}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn" style={{ width: 'auto', padding: '12px 20px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Share
          </button>
          <button className="btn btn-secondary" style={{ width: 'auto', padding: '12px 20px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Save
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="room-stats" style={{ marginBottom: '32px' }}>
        <div className="stat-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span style={{ fontWeight: 700 }}>{room.views.toLocaleString()}</span>
          <span className="mono" style={{ color: 'var(--muted-foreground)', fontSize: '12px' }}>views</span>
        </div>
        <div className="stat-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span style={{ fontWeight: 700 }}>{room.users}</span>
          <span className="mono" style={{ color: 'var(--muted-foreground)', fontSize: '12px' }}>users</span>
        </div>
        <div className="stat-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span style={{ fontWeight: 700 }}>{room.activity}%</span>
          <span className="mono" style={{ color: 'var(--muted-foreground)', fontSize: '12px' }}>activity</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
        
        {/* Left Column - Room Preview */}
        <div>
          <div className="surface" style={{ padding: '0', overflow: 'hidden' }}>
            <img 
              src={room.imageUrl} 
              alt={room.name}
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>

          {/* Color Palette */}
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
              Color Palette
            </h3>
            <div className="palette-row">
              {room.palette.map((color, i) => (
                <div 
                  key={i} 
                  className="color-swatch" 
                  style={{ backgroundColor: color, cursor: 'pointer', position: 'relative' }}
                  title={`Click to copy: ${color}`}
                  onClick={() => navigator.clipboard.writeText(color)}
                >
                  <span style={{
                    position: 'absolute',
                    bottom: '-24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    color: 'var(--muted-foreground)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }} className="color-label">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>
              Comments ({mockComments.length})
            </h3>

            {/* Add Comment */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--muted)',
                border: '2px solid var(--foreground)',
                flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <textarea
                  className="input-field"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ minHeight: '80px', resize: 'vertical' }}
                />
                <button 
                  className="btn" 
                  style={{ width: 'auto', marginTop: '8px', padding: '8px 16px' }}
                  disabled={!comment.trim()}
                >
                  Post Comment
                </button>
              </div>
            </div>

            {/* Comment List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mockComments.map(c => (
                <div key={c.id} className="comment">
                  <div className="comment-avatar" />
                  <div className="comment-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="comment-author">@{c.author}</span>
                      <span className="mono" style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>{c.time}</span>
                    </div>
                    <p className="comment-text">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Music Player */}
        <div>
          <div className="surface" style={{ padding: '24px', position: 'sticky', top: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>
              Now Playing
            </h3>
            
            {/* Album Art */}
            <div style={{ 
              width: '100%', 
              aspectRatio: '1', 
              border: '2px solid var(--foreground)',
              marginBottom: '24px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <img 
                src={room.music.artwork} 
                alt="Album art"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {playing && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1,2,3,4,5].map(i => (
                      <div 
                        key={i}
                        style={{
                          width: '4px',
                          height: `${Math.random() * 20 + 10}px`,
                          background: 'var(--secondary)',
                          animation: `equalizer 0.5s ease-in-out ${i * 0.1}s infinite alternate`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Track Info */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800 }}>{room.music.track}</div>
              <div className="mono" style={{ fontSize: '12px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
                {room.music.artist}
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ 
                height: '8px', 
                background: 'var(--muted)', 
                border: '2px solid var(--foreground)',
                position: 'relative',
              }}>
                <div style={{
                  width: playing ? '35%' : '0%',
                  height: '100%',
                  background: 'var(--primary)',
                  transition: 'width 0.3s',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span className="mono" style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>0:00</span>
                <span className="mono" style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>0:30</span>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <button style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                padding: '8px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                  <line x1="5" y1="19" x2="5" y2="5"></line>
                </svg>
              </button>
              
              <button 
                onClick={() => setPlaying(!playing)}
                className="play-btn"
                style={{ 
                  width: '64px', 
                  height: '64px',
                  fontSize: '24px',
                }}
              >
                {playing ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>

              <button style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                padding: '8px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
              </button>
            </div>

            {/* Volume */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <div style={{ flex: 1, height: '4px', background: 'var(--muted)', border: '1px solid var(--foreground)' }}>
                <div style={{ width: '70%', height: '100%', background: 'var(--foreground)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .color-swatch:hover .color-label {
          opacity: 1 !important;
        }
        @keyframes equalizer {
          0% { height: 10px; }
          100% { height: 25px; }
        }
      `}</style>
    </div>
  )
}

