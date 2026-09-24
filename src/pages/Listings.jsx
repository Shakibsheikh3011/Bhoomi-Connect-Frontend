import { useState, useMemo } from 'react'
import PropertyCard from '../components/PropertyCard'

const DUMMY_PROPERTIES = [
  {
    id: 1,
    title: '3 BHK Apartment',
    location: 'Freeganj, Ujjain',
    price: 4200000,
    type: 'Buy',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    title: '2 BHK Flat',
    location: 'Nanakheda, Ujjain',
    price: 15000,
    type: 'Rent',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    title: '4 BHK Villa',
    location: 'Dewas Road, Ujjain',
    price: 8500000,
    type: 'Buy',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    title: '1 BHK Studio',
    location: 'Mahakal Marg, Ujjain',
    price: 8000,
    type: 'Rent',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 5,
    title: '2 BHK Apartment',
    location: 'Rishi Nagar, Ujjain',
    price: 3200000,
    type: 'Buy',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 6,
    title: '3 BHK Flat',
    location: 'Vikram Nagar, Ujjain',
    price: 18000,
    type: 'Rent',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
  },
]

export default function Listings() {
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [maxPrice, setMaxPrice] = useState(10000000)

  const filtered = useMemo(() => {
    return DUMMY_PROPERTIES.filter((p) => {
      const matchesLocation = p.location.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesType = typeFilter === 'All' || p.type === typeFilter
      const matchesPrice = p.price <= maxPrice
      return matchesLocation && matchesType && matchesPrice
    })
  }, [locationFilter, typeFilter, maxPrice])

  return (
    <div style={{ backgroundColor: '#F6F3ED' }} className="min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1
          style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }}
          className="text-3xl mb-8"
        >
          All properties
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Search by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="flex-grow border rounded-md px-3 py-2 text-sm outline-none"
            style={{ borderColor: '#DEDACF' }}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm outline-none"
            style={{ borderColor: '#DEDACF' }}
          >
            <option value="All">All types</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>

          <div className="flex items-center gap-2 min-w-[200px]">
            <input
              type="range"
              min="5000"
              max="10000000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-grow"
            />
            <span className="text-xs whitespace-nowrap" style={{ color: '#8A877E' }}>
              ≤ ₹{maxPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#8A877E' }} className="text-center py-16">
            No properties match these filters. Try adjusting them.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard
                key={p.id}
                title={p.title}
                location={p.location}
                price={p.price}
                type={p.type}
                image={p.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}