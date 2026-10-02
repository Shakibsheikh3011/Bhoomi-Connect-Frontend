import { useEffect, useState } from 'react'
import API from '../api/axios'
import { unwrap } from '../utils/property'

export default function SellerDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([API.get('/api/seller/stats'), API.get('/api/seller/dashboard')]).then(
      ([statsRes, dashRes]) => {
        const s = statsRes.status === 'fulfilled' ? unwrap(statsRes.value) : null
        const d = dashRes.status === 'fulfilled' ? unwrap(dashRes.value) : null
        setStats({ ...(d || {}), ...(s || {}) })
        setLoading(false)
      }
    )
  }, [])

  if (loading) {
    return <p className="text-center py-24" style={{ color: '#8A877E' }}>Loading dashboard...</p>
  }

  const entries = Object.entries(stats || {}).filter(
    ([, v]) => typeof v === 'number' || typeof v === 'string'
  )

  return (
    <div style={{ backgroundColor: '#F6F3ED' }} className="min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-3xl mb-8">
          Seller Dashboard
        </h1>

        {entries.length === 0 ? (
          <p style={{ color: '#8A877E' }}>No stats available yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {entries.map(([key, value]) => (
              <div key={key} className="bg-white rounded-lg p-5">
                <p className="text-sm" style={{ color: '#8A877E' }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}
                </p>
                <p style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-2xl mt-1">
                  {typeof value === 'number' && key.toLowerCase().includes('price')
                    ? `₹${value.toLocaleString('en-IN')}`
                    : String(value)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}