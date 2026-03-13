function randHex() {
  return '#'+(Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0'))
}

export function randomPalette(count = 5) {
  return Array.from({ length: count }).map(() => randHex())
}

export function extractPaletteFromImageStub(imageUrl, count = 5) {
  // Placeholder: real implementation should analyze colors (Vibrant, ColorThief, or serverless lib)
  return randomPalette(count)
}
