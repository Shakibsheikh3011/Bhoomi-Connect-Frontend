export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'

// Backend ka response { success, message, data } ho ya seedha data, dono chalega
export const unwrap = (res) => res?.data?.data ?? res?.data

export function getImageUrls(p) {
  const list = p.images || p.imageUrls || []
  const urls = list
    .map((i) => (typeof i === 'string' ? i : i?.imageUrl || i?.url))
    .filter(Boolean)
  return urls.length ? urls : [p.imageUrl || p.thumbnail || FALLBACK_IMAGE]
}

// Backend ke field names yahin adjust karne hain, baaki app is function se data leti hai
export function normalizeProperty(p) {
  return {
    id: p.id,
    title: p.title || p.name || 'Property',
    location: [p.locality || p.address, p.city].filter(Boolean).join(', ') || p.location || '',
    price: Number(p.price ?? 0),
    type: p.listingType || p.type || p.purpose || '',
    image: getImageUrls(p)[0],
    raw: p,
  }
}