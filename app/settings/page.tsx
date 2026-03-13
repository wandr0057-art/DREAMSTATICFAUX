'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Settings() {
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ padding: '40px 0', minHeight: 'calc(100vh - 80px)' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1 className="section-title" style={{ marginBottom: '8px' }}>Settings</h1>
          <p style={{ color: 'var(--muted-foreground)' }}>Manage your account preferences and appearance</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          <div>
            <div className="surface" style={{ padding: '16px' }}>
              <Link href="/profile" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '12px',
                color: 'var(--foreground)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
              </Link>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '12px',
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="surface" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                </svg>
                Appearance
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Theme</div>
                  <div style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Choose your preferred color scheme</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleThemeChange('light')}
                    style={{
                      padding: '8px 16px',
                      border: '2px solid var(--foreground)',
                      background: theme === 'light' ? 'var(--primary)' : 'transparent',
                      color: theme === 'light' ? 'var(--primary-foreground)' : 'var(--foreground)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    style={{
                      padding: '8px 16px',
                      border: '2px solid var(--foreground)',
                      background: theme === 'dark' ? 'var(--primary)' : 'transparent',
                      color: theme === 'dark' ? 'var(--primary-foreground)' : 'var(--foreground)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>

            <div className="surface" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Notifications</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Push Notifications</div>
                  <div style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Receive notifications about activity</div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  style={{
                    width: '50px',
                    height: '28px',
                    borderRadius: '14px',
                    border: '2px solid var(--foreground)',
                    background: notifications ? 'var(--primary)' : 'var(--muted)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--card)',
                    position: 'absolute',
                    top: '2px',
                    left: notifications ? '24px' : '2px',
                    transition: 'left 0.2s',
                    border: '2px solid var(--foreground)',
                  }} />
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Email Updates</div>
                  <div style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Receive weekly digest emails</div>
                </div>
                <button
                  onClick={() => setEmailUpdates(!emailUpdates)}
                  style={{
                    width: '50px',
                    height: '28px',
                    borderRadius: '14px',
                    border: '2px solid var(--foreground)',
                    background: emailUpdates ? 'var(--primary)' : 'var(--muted)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--card)',
                    position: 'absolute',
                    top: '2px',
                    left: emailUpdates ? '24px' : '2px',
                    transition: 'left 0.2s',
                    border: '2px solid var(--foreground)',
                  }} />
                </button>
              </div>
            </div>

            <div className="surface" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Playback</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Autoplay Music</div>
                  <div style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Automatically play preview when viewing rooms</div>
                </div>
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  style={{
                    width: '50px',
                    height: '28px',
                    borderRadius: '14px',
                    border: '2px solid var(--foreground)',
                    background: autoplay ? 'var(--primary)' : 'var(--muted)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--card)',
                    position: 'absolute',
                    top: '2px',
                    left: autoplay ? '24px' : '2px',
                    transition: 'left 0.2s',
                    border: '2px solid var(--foreground)',
                  }} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              {saved && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 600 }}>
                  Saved!
                </div>
              )}
              <button onClick={handleSave} className="btn" style={{ width: 'auto', padding: '12px 32px' }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
