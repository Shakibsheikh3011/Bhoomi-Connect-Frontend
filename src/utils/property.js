const BACKEND_URL = 'https://real-estate-backend-vh62.onrender.com'

export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'

export const unwrap = (res) => res?.data?.data ?? res?.data

function toAbsoluteUrl(url) {
  if (!url) return null

  // Backend kabhi-kabhi poora URL localhost ke saath save kar deta hai
  // (jaise http://localhost:8088/uploads/...) — usse apne real backend se replace karo
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    try {
      const path = new URL(url).pathname
      return `${BACKEND_URL}${path}`
    } catch {
      // URL parse na ho to aage normal logic try karo
    }
  }

  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

export function getImageUrls(p) {
  const list = p.images || p.imageUrls || []
  const urls = list
    .map((i) => (typeof i === 'string' ? i : i?.imageUrl || i?.url))
    .filter(Boolean)
    .map(toAbsoluteUrl)
  const single = toAbsoluteUrl(p.imageUrl || p.thumbnail)
  const result = urls.length ? urls : single ? [single] : []
  return result.length ? result : [FALLBACK_IMAGE]
}

export function normalizeProperty(p) {
  const city = p.city || ''
  const parts = [p.address, p.locality].filter(Boolean)
  if (city && !parts.some((part) => part.toLowerCase().includes(city.toLowerCase()))) {
    parts.push(city)
  }
  const location = parts.join(', ') || p.location || ''

  return {
    id: p.id,
    title: p.title || p.name || 'Property',
    location,
    price: Number(p.price ?? 0),
    type: p.listingType || p.type || p.purpose || '',
    image: getImageUrls(p)[0],
    raw: p,
  }
}