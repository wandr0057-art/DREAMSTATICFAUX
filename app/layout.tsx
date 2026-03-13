import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter, IBM_Plex_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-family-body',
})

const ibmMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Dreamstatic404 - Vibe Room Builder',
  description: 'Create dream rooms by combining color palettes, music snippets, and mood images',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmMono.variable}`}>
        <div className="scanlines"></div>
        
        {/* Header */}
        <header>
          <div className="container header-content">
            <Link href="/" className="logo">
              <div className="logo-icon">D</div>
              Dreamstatic404
            </Link>
            
            <nav className="nav-links">
              <Link href="/feed" className="nav-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Gallery
              </Link>
              <Link href="/builder" className="nav-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Create
              </Link>
              <Link href="/profile" className="nav-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
              </Link>
            </nav>
          </div>
        </header>

        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

