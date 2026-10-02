import { useEffect, useMemo, useState } from 'react'
import API from '../api/axios'
import PropertyCard from '../components/PropertyCard'
import { normalizeProperty, unwrap } from '../utils/property'

export default function Listings() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [maxPrice, setMaxPrice] = useState(null)

  useEffect(() => {
    API.get('/api/properties', { params: { page: 0, size: 50 } })
      .then((res) => {
        const data = unwrap(res)
        const list = data?.content ?? data ?? []
        const items = list.map(normalizeProperty)
        setProperties(items)
        setMaxPrice(Math.max(0, ...items.map((p) => p.price)))
      })
      .catch((err) => {
        console.error(err)
        setError(err.response?.data?.message || 'Could not load properties. Please try again.')
      })
      .finally(() => setLoading(false))
  }, [])

  const types = useMemo(
    () => [...new Set(properties.map((p) => p.type).filter(Boolean))],
    [properties]
  )
  const highestPrice = useMemo(
    () => Math.max(0, ...properties.map((p) => p.price)),
    [properties]
  )

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesLocation = p.location.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesType = typeFilter === 'All' || p.type === typeFilter
      const matchesPrice = maxPrice === null || p.price <= maxPrice
      return matchesLocation && matchesType && matchesPrice
    })
  }, [properties, locationFilter, typeFilter, maxPrice])

  return (
    <div style={{ backgroundColor: '#F6F3ED' }} className="min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-3xl mb-8">
          All properties
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
          <input
            type="text" placeholder="Search by location" value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="flex-grow border rounded-md px-3 py-2 text-sm outline-none"
            style={{ borderColor: '#DEDACF' }}
          />
          <select
            value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm outline-none"
            style={{ borderColor: '#DEDACF' }}
          >
            <option value="All">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>
            ))}
          </select>
          {highestPrice > 0 && (
            <div className="flex items-center gap-2 min-w-[200px]">
              <input
                type="range" min="0" max={highestPrice} step="1000"
                value={maxPrice ?? highestPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-grow"
              />
              <span className="text-xs whitespace-nowrap" style={{ color: '#8A877E' }}>
                ≤ ₹{Number(maxPrice ?? highestPrice).toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>

        {loading && (
          <p className="text-center py-16" style={{ color: '#8A877E' }}>
            Loading properties... the server may take up to a minute to wake up.
          </p>
        )}
        {error && <p className="text-center py-16" style={{ color: '#B5563A' }}>{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p style={{ color: '#8A877E' }} className="text-center py-16">
            No properties found. Try adjusting the filters.
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard
                key={p.id} id={p.id} title={p.title} location={p.location}
                price={p.price} type={p.type} image={p.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}