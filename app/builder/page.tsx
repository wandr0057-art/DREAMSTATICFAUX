'use client'

import { useState } from 'react'

type Step = 'image' | 'music' | 'palette' | 'details'

interface RoomData {
  image: string | null
  imagePalette: string[]
  music: {
    track: string
    artist: string
    artwork: string
    previewUrl: string
  } | null
  palette: string[]
  name: string
  tags: string[]
}

const steps: { key: Step; label: string }[] = [
  { key: 'image', label: '1. Image' },
  { key: 'music', label: '2. Music' },
  { key: 'palette', label: '3. Palette' },
  { key: 'details', label: '4. Details' },
]

// Mock music search results
const mockMusicResults = [
  { id: '1', track: 'Virtual Reality', artist: 'Data Stream', artwork: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&auto=format&fit=crop', previewUrl: '' },
  { id: '2', track: 'Digital Dreams', artist: 'Techno Vibe', artwork: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?q=80&w=100&auto=format&fit=crop', previewUrl: '' },
  { id: '3', track: 'Neon Nights', artist: 'Cyber Synth', artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=100&auto=format&fit=crop', previewUrl: '' },
  { id: '4', track: 'Future Bass', artist: 'Wavetable', artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop', previewUrl: '' },
]

// Color palette presets
const palettePresets = [
  ['#ff00ff', '#00ffff', '#1a1a2e', '#e94560', '#0f3460'],
  ['#d1d5db', '#9ca3af', '#4b5563', '#ef4444', '#111827'],
  ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
  ['#2d3436', '#636e72', '#b2bec3', '#dfe6e9', '#74b9ff'],
  ['#00ff00', '#003300', '#006600', '#009900', '#00cc00'],
  ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1'],
]

const tagOptions = ['Y2K', 'Cyber', 'Liminal', 'Glitch', 'Synthwave', 'Hardware', 'Retro', 'Futuristic']

export default function Builder() {
  const [currentStep, setCurrentStep] = useState<Step>('image')
  const [roomData, setRoomData] = useState<RoomData>({
    image: null,
    imagePalette: [],
    music: null,
    palette: [],
    name: '',
    tags: [],
  })
  const [dragActive, setDragActive] = useState(false)
  const [musicSearch, setMusicSearch] = useState('')

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setRoomData(prev => ({ ...prev, image: url }))
      // Simulate palette extraction
      setRoomData(prev => ({ ...prev, imagePalette: ['#ff00ff', '#00ffff', '#1a1a2e', '#e94560', '#0f3460'] }))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setRoomData(prev => ({ ...prev, image: url }))
      setRoomData(prev => ({ ...prev, imagePalette: ['#ff00ff', '#00ffff', '#1a1a2e', '#e94560', '#0f3460'] }))
    }
  }

  const generateRandomPalette = () => {
    const randomPalette = Array.from({ length: 5 }, () => 
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    )
    setRoomData(prev => ({ ...prev, palette: randomPalette }))
  }

  const useImagePalette = () => {
    setRoomData(prev => ({ ...prev, palette: prev.imagePalette }))
  }

  const handleSubmit = () => {
    console.log('Room created:', roomData)
    // In a real app, this would POST to /api/rooms
  }

  const currentStepIndex = steps.findIndex(s => s.key === currentStep)

  return (
    <div className="container" style={{ padding: '40px 32px' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1px' }}>
          Build Your Room
        </h1>
        <p className="mono" style={{ color: 'var(--muted-foreground)', marginTop: '8px' }}>
          CREATE_DREAM // V.1.0
        </p>
      </div>

      {/* Builder Steps */}
      <div className="builder-steps">
        {steps.map((step, index) => (
          <button
            key={step.key}
            className={`builder-step ${
              currentStep === step.key ? 'active' : 
              index < currentStepIndex ? 'completed' : ''
            }`}
            onClick={() => setCurrentStep(step.key)}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="surface" style={{ padding: '32px', marginTop: '24px' }}>
        
        {/* Step 1: Image Upload */}
        {currentStep === 'image' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>
              Upload Your Mood Image
            </h2>
            
            <div
              className={`upload-area ${dragActive ? 'pixel-border' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              style={{
                border: dragActive ? '2px dashed var(--primary)' : '2px dashed var(--foreground)',
                background: dragActive ? 'var(--muted)' : 'transparent',
              }}
            >
              {roomData.image ? (
                <div style={{ position: 'relative' }}>
                  <img 
                    src={roomData.image} 
                    alt="Uploaded" 
                    style={{ maxWidth: '100%', maxHeight: '300px', border: '2px solid var(--foreground)' }}
                  />
                  <button
                    onClick={() => setRoomData(prev => ({ ...prev, image: null }))}
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '-12px',
                      background: 'var(--destructive)',
                      color: 'var(--destructive-foreground)',
                      border: '2px solid var(--foreground)',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <div className="upload-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                    Drag & drop your image here
                  </p>
                  <p className="mono" style={{ color: 'var(--muted-foreground)', fontSize: '12px' }}>
                    or click to browse files
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                  />
                </>
              )}
            </div>

            {roomData.imagePalette.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
                  Extracted Palette (click to use):
                </p>
                <div className="palette-row" style={{ cursor: 'pointer' }} onClick={useImagePalette}>
                  {roomData.imagePalette.map((color, i) => (
                    <div key={i} className="color-swatch" style={{ backgroundColor: color }} title={color} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Music Selection */}
        {currentStep === 'music' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>
              Add Your Soundtrack
            </h2>
            
            {/* Search */}
            <div style={{ marginBottom: '24px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Search for tracks..."
                value={musicSearch}
                onChange={(e) => setMusicSearch(e.target.value)}
              />
            </div>

            {/* Selected Music */}
            {roomData.music && (
              <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--secondary)', border: '2px solid var(--foreground)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={roomData.music.artwork} alt="" style={{ width: '48px', height: '48px', border: '2px solid var(--foreground)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{roomData.music.track}</div>
                    <div className="mono" style={{ fontSize: '12px', color: 'var(--secondary-foreground)' }}>{roomData.music.artist}</div>
                  </div>
                  <button
                    onClick={() => setRoomData(prev => ({ ...prev, music: null }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockMusicResults.map(track => (
                <button
                  key={track.id}
                  onClick={() => setRoomData(prev => ({ 
                    ...prev, 
                    music: { track: track.track, artist: track.artist, artwork: track.artwork, previewUrl: track.previewUrl }
                  }))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: 'var(--card)',
                    border: '2px solid var(--foreground)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <img src={track.artwork} alt="" style={{ width: '40px', height: '40px', border: '2px solid var(--foreground)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{track.track}</div>
                    <div className="mono" style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>{track.artist}</div>
                  </div>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: roomData.music?.track === track.track ? 'var(--success)' : 'var(--foreground)',
                    color: roomData.music?.track === track.track ? 'var(--success-foreground)' : 'var(--background)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {roomData.music?.track === track.track ? '✓' : '+'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Palette */}
        {currentStep === 'palette' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>
              Create Your Color Palette
            </h2>

            {/* Current Palette */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 600 }}>Current Palette</span>
                <button 
                  onClick={generateRandomPalette}
                  className="btn btn-secondary"
                  style={{ width: 'auto', padding: '8px 16px', fontSize: '12px' }}
                >
                  Randomize
                </button>
              </div>
              
              {roomData.palette.length > 0 ? (
                <div className="palette-row">
                  {roomData.palette.map((color, i) => (
                    <div 
                      key={i} 
                      className="color-swatch" 
                      style={{ backgroundColor: color, position: 'relative' }}
                      title={color}
                    >
                      <button
                        onClick={() => {
                          const newPalette = [...roomData.palette]
                          newPalette[i] = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
                          setRoomData(prev => ({ ...prev, palette: newPalette }))
                        }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          background: 'rgba(0,0,0,0.5)',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          opacity: 0,
                          transition: 'opacity 0.2s',
                        }}
                        className="color-edit-btn"
                      >
                        ⟳
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ 
                  padding: '32px', 
                  textAlign: 'center', 
                  border: '2px dashed var(--foreground)',
                  background: 'var(--muted)',
                }}>
                  <p className="mono" style={{ color: 'var(--muted-foreground)' }}>
                    No palette selected. Use "Randomize" or go back to upload an image.
                  </p>
                </div>
              )}
            </div>

            {/* Presets */}
            <div>
              <span style={{ fontWeight: 600, marginBottom: '12px', display: 'block' }}>Presets</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {palettePresets.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => setRoomData(prev => ({ ...prev, palette: preset }))}
                    className="palette-row"
                    style={{ cursor: 'pointer', border: roomData.palette.join(',') === preset.join(',') ? '3px solid var(--primary)' : '2px solid var(--foreground)' }}
                  >
                    {preset.map((color, j) => (
                      <div key={j} className="color-swatch" style={{ backgroundColor: color }} />
                    ))}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Details */}
        {currentStep === 'details' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>
              Room Details
            </h2>

            <div className="field-group">
              {/* Room Name */}
              <div className="field">
                <div className="field-label">Room Name</div>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter your room name..."
                  value={roomData.name}
                  onChange={(e) => setRoomData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Tags */}
              <div className="field">
                <div className="field-label">Tags</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tagOptions.map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        const newTags = roomData.tags.includes(tag)
                          ? roomData.tags.filter(t => t !== tag)
                          : [...roomData.tags, tag]
                        setRoomData(prev => ({ ...prev, tags: newTags }))
                      }}
                      className={`filter-tag ${roomData.tags.includes(tag) ? 'active' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div style={{ marginTop: '24px' }}>
                <div className="field-label" style={{ marginBottom: '12px' }}>Preview</div>
                <div className="room-card pixel-border">
                  <div className="room-image-container">
                    {roomData.image && <img src={roomData.image} alt="Preview" />}
                    <div className="room-tag">{roomData.tags[0] || 'New Room'}</div>
                  </div>
                  <div className="room-content">
                    <div className="room-header">
                      <div>
                        <h3 className="room-name">{roomData.name || 'Untitled Room'}</h3>
                        <div className="room-creator mono">@you</div>
                      </div>
                    </div>
                    <div className="palette-row">
                      {(roomData.palette.length > 0 ? roomData.palette : roomData.imagePalette).map((color, i) => (
                        <div key={i} className="color-swatch" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                    {roomData.music && (
                      <div className="music-player">
                        <div className="music-artwork">
                          <img src={roomData.music.artwork} alt="Album art" />
                        </div>
                        <div className="music-info">
                          <div className="music-track mono">{roomData.music.track}</div>
                          <div className="music-artist mono">{roomData.music.artist}</div>
                        </div>
                        <button className="play-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '2px solid var(--foreground)' }}>
          <button
            onClick={() => {
              const idx = currentStepIndex
              if (idx > 0) setCurrentStep(steps[idx - 1].key)
            }}
            disabled={currentStepIndex === 0}
            className="btn btn-secondary"
            style={{ width: 'auto', opacity: currentStepIndex === 0 ? 0.5 : 1 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </button>

          {currentStepIndex < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(steps[currentStepIndex + 1].key)}
              className="btn"
              style={{ width: 'auto' }}
            >
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn" style={{ width: 'auto', background: 'var(--success)', color: 'var(--success-foreground)' }}>
              Create Room
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .color-swatch:hover .color-edit-btn {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  )
}

