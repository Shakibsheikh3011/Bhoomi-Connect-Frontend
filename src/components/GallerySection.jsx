const IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80',
]

export default function GallerySection() {
  return (
    <section style={{ backgroundColor: '#fff' }} className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }}
          className="text-3xl text-center mb-10"
        >
          Gallery
        </h2>

        <div className="rounded-lg overflow-hidden mb-4">
          <img src={IMAGES[0]} alt="Property" className="w-full h-96 object-cover" />
        </div>

        <div className="grid grid-cols-5 gap-3">
          {IMAGES.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Property ${i + 1}`}
              className="w-full h-20 md:h-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  )
}