'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data for rooms
const mockRooms = [
  {
    id: '1',
    name: 'Plastic Love',
    creator: 'cyber_angel',
    tag: 'Y2K Space',
    palette: ['#ff00ff', '#00ffff', '#1a1a2e', '#e94560', '#0f3460'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    music: {
      track: 'Virtual Reality',
      artist: 'Data Stream',
      artwork: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&auto=format&fit=crop'
    }
  },
  {
    id: '2',
    name: 'System_Error',
    creator: 'null_pointer',
    tag: 'Hardware',
    palette: ['#d1d5db', '#9ca3af', '#4b5563', '#ef4444', '#111827'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop',
    music: {
      track: 'Dial-up Dreams',
      artist: 'The Modems',
      artwork: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=100&auto=format&fit=crop'
    }
  },
  {
    id: '3',
    name: 'Neon Horizon',
    creator: 'synthwave_queen',
    tag: 'Synthwave',
    palette: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2564&auto=format&fit=crop',
    music: {
      track: 'Nightcall',
      artist: 'Kavinsky',
      artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=100&auto=format&fit=crop'
    }
  },
  {
    id: '4',
    name: 'Liminal Space',
    creator: 'void_walker',
    tag: 'Liminal',
    palette: ['#2d3436', '#636e72', '#b2bec3', '#dfe6e9', '#74b9ff'],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2564&auto=format&fit=crop',
    music: {
      track: 'Echoes',
      artist: 'Pink Floyd',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=100&auto=format&fit=crop'
    }
  },
  {
    id: '5',
    name: 'Glitch_Matrix',
    creator: 'red_pill',
    tag: 'Glitch',
    palette: ['#00ff00', '#003300', '#006600', '#009900', '#00cc00'],
    imageUrl: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2564&auto=format&fit=crop',
    music: {
      track: 'Digital Dreams',
      artist: 'Techno Vibe',
      artwork: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?q=80&w=100&auto=format&fit=crop'
    }
  },
  {
    id: '6',
    name: 'Cyber_Cafe',
    creator: 'retrohacker',
    tag: 'Cyber',
    palette: ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2564&auto=format&fit=crop',
    music: {
      track: 'Computer Love',
      artist: 'Kraftwerk',
      artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop'
    }
  }
]

const filters = ['All', 'Y2K', 'Cyber', 'Liminal', 'Glitch']

export default function Feed() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [playingId, setPlayingId] = useState<string | null>(null)

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content pixel-border">
          <h1 className="hero-title">Find Your Frequency</h1>
          <p className="hero-subtitle mono">
            Explore public dream rooms or build your own aesthetic space
            combining color, sound, and vision.
          </p>
          <div className="hero-actions">
            <Link href="/builder" className="btn glitch-hover">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Create Room
            </Link>
            <button className="btn btn-secondary glitch-hover">
              Random Vibe
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          {/* Gallery Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 className="section-title">Public Directory</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              {filters.map(filter => (
                <button
                  key={filter}
                  className={`filter-tag ${activeFilter === filter ? 'active' : ''} pixel-border`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Room Grid */}
          <div className="room-grid">
            {mockRooms.map(room => (
              <Link href={`/house/${room.id}`} key={room.id} style={{ textDecoration: 'none' }}>
                <div className="room-card pixel-border glitch-hover">
                  {/* Image Container */}
                  <div className="room-image-container">
                    <img src={room.imageUrl} alt={room.name} />
                    <div className="room-tag">{room.tag}</div>
                  </div>

                  {/* Content */}
                  <div className="room-content">
                    {/* Header */}
                    <div className="room-header">
                      <div>
                        <h3 className="room-name">{room.name}</h3>
                        <div className="room-creator mono">@{room.creator}</div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>

                    {/* Palette */}
                    <div className="palette-row">
                      {room.palette.map((color, i) => (
                        <div key={i} className="color-swatch" style={{ backgroundColor: color }} />
                      ))}
                    </div>

                    {/* Music Player */}
                    <div className="music-player">
                      <div className="music-artwork">
                        <img src={room.music.artwork} alt="Album art" />
                      </div>
                      <div className="music-info">
                        <div className="music-track mono">{room.music.track}</div>
                        <div className="music-artist mono">{room.music.artist}</div>
                      </div>
                      <button 
                        className="play-btn"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setPlayingId(playingId === room.id ? null : room.id)
                        }}
                      >
                        {playingId === room.id ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

