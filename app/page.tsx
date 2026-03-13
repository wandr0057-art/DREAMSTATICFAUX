'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  return (
    <div className="split-layout" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Visual Pane - Left side with image */}
      <div className="visual-pane" style={{
        flex: 1.2,
        position: 'relative',
        borderRight: '3px solid var(--foreground)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px',
        overflow: 'hidden',
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://storage.googleapis.com/banani-generated-images/generated-images/38fd6c1c-368c-4fd4-97dd-0b91c357d65f.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.85,
          mixBlendMode: 'luminosity',
          filter: 'contrast(1.2)',
        }} />
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Brand Logo */}
        <div className="visual-content" style={{ 
          position: 'relative', 
          zIndex: 10, 
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            textShadow: '2px 2px 0 #000000',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ffffff',
              borderRadius: '999px',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </div>
            DREAMSTATIC
          </div>
        </div>

        {/* Hero Text */}
        <div className="visual-content" style={{ 
          position: 'relative', 
          zIndex: 10, 
          marginTop: 'auto',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div className="mono" style={{ color: '#a5b4fc', marginBottom: '8px' }}>
            AUTH_GATEWAY // SECURE CONNECTION
          </div>
          <h1 style={{
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textShadow: '4px 4px 0 #000000',
            maxWidth: '600px',
          }}>
            Enter the<br />Dreamscape
          </h1>
          <p style={{
            fontSize: '18px',
            lineHeight: 1.5,
            maxWidth: '480px',
            textShadow: '1px 1px 0 #000000',
            color: 'rgba(255, 255, 255, 0.9)',
          }}>
            Sign in to sync your mood boards, access your saved rooms, and
            collaborate with other creators in real-time.
          </p>
        </div>
      </div>

      {/* Form Pane - Right side */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: 'radial-gradient(circle at center, var(--muted) 0%, var(--background) 100%)',
        position: 'relative',
      }}>
        {/* Back Link */}
        <Link href="/feed" style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--foreground)',
          background: 'var(--card)',
          padding: '8px 16px',
          border: '2px solid var(--foreground)',
          boxShadow: '3px 3px 0 var(--foreground)',
          borderRadius: 'var(--radius-sm)',
          textDecoration: 'none',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Gallery
        </Link>

        <div style={{
          width: '100%',
          maxWidth: '440px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          {/* Auth Card */}
          <div className="auth-card surface">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Enter your credentials to access your studio.</p>
            </div>

            {/* Tab Row */}
            <div className="tab-row">
              <button 
                className={`tab-btn ${activeTab === 'login' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('login')}
              >
                Log In
              </button>
              <button 
                className={`tab-btn ${activeTab === 'signup' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Form Fields */}
            <div className="field-group">
              <div className="field">
                <div className="field-label">Email Address</div>
                <input 
                  type="email" 
                  className="input-field"
                  placeholder="user@dreamstatic.app"
                />
              </div>
              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="field-label">Password</div>
                  <span style={{ 
                    fontSize: '13px', 
                    fontWeight: 600, 
                    color: 'var(--primary)', 
                    textAlign: 'right',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    cursor: 'pointer',
                  }}>
                    Forgot?
                  </span>
                </div>
                <input 
                  type="password" 
                  className="input-field"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="btn">
              {activeTab === 'login' ? 'Initialize Session' : 'Create Account'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">Or continue with</div>
              <div className="divider-line"></div>
            </div>

            {/* Social Buttons */}
            <div className="social-row">
              <button className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
              <button className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
            </div>
          </div>

          {/* Terms */}
          <div style={{
            textAlign: 'center',
            fontSize: '13px',
            color: 'var(--muted-foreground)',
          }}>
            By connecting, you agree to the{' '}
            <span style={{ color: 'var(--foreground)', fontWeight: 600, textDecoration: 'underline' }}>
              Terms of Service
            </span>{' '}
            and{' '}
            <span style={{ color: 'var(--foreground)', fontWeight: 600, textDecoration: 'underline' }}>
              Privacy Policy
            </span>.
          </div>
        </div>
      </div>
    </div>
  )
}

