export interface MusicPreview {
  trackId: number | string
  trackName: string
  artist: string
  previewUrl?: string | null
  artworkUrl?: string | null
}

export interface Room {
  id: string
  name: string
  creator?: string | null
  palette?: string[]
  imageUrl?: string | null
  musicPreview?: MusicPreview | null
  tags?: string[]
  createdAt: string
  isPublic?: boolean
}
