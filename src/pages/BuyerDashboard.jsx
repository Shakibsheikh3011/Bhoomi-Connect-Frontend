import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios'
import PropertyCard from '../components/PropertyCard'
import { normalizeProperty, unwrap } from '../utils/property'

export default function BuyerDashboard() {
  const [wishlist, setWishlist] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      API.get('/api/wishlist'),
      API.get('/api/inquiries/my-inquiries'),
      API.get('/api/appointments/my-appointments'),
    ]).then(([wRes, iRes, aRes]) => {
      if (wRes.status === 'fulfilled') {
        const d = unwrap(wRes.value)
        const list = d?.content ?? d ?? []
        setWishlist(list.map((w) => normalizeProperty(w.property || w)))
      }
      if (iRes.status === 'fulfilled') {
        const d = unwrap(iRes.value)
        setInquiries(d?.content ?? d ?? [])
      }
      if (aRes.status === 'fulfilled') {
        const d = unwrap(aRes.value)
        setAppointments(d?.content ?? d ?? [])
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <p className="text-center py-24" style={{ color: '#8A877E' }}>Loading your dashboard...</p>
  }

  return (
    <div style={{ backgroundColor: '#F6F3ED' }} className="min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-3xl mb-10">
          My Dashboard
        </h1>

        <section className="mb-12">
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-xl mb-4">
            Saved properties
          </h2>
          {wishlist.length === 0 ? (
            <p className="text-sm" style={{ color: '#8A877E' }}>
              No saved properties yet.{' '}
              <Link to="/listings" style={{ color: '#2F4538' }}>Browse listings</Link>.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlist.map((p) => (
                <PropertyCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  location={p.location}
                  price={p.price}
                  type={p.type}
                  image={p.image}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mb-12">
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-xl mb-4">
            My inquiries
          </h2>
          {inquiries.length === 0 ? (
            <p className="text-sm" style={{ color: '#8A877E' }}>No inquiries sent yet.</p>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inq, i) => (
                <div key={inq.id ?? i} className="bg-white rounded-lg p-4">
                  <p className="text-sm font-medium" style={{ color: '#23262B' }}>
                    {inq.propertyTitle || `Property #${inq.propertyId ?? ''}`}
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#5C5A54' }}>{inq.message}</p>
                  <p className="text-xs mt-1" style={{ color: '#8A877E' }}>{inq.status || 'Sent'}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-xl mb-4">
            My appointments
          </h2>
          {appointments.length === 0 ? (
            <p className="text-sm" style={{ color: '#8A877E' }}>No appointments booked yet.</p>
          ) : (
            <div className="space-y-3">
              {appointments.map((a, i) => (
                <div key={a.id ?? i} className="bg-white rounded-lg p-4">
                  <p className="text-sm font-medium" style={{ color: '#23262B' }}>
                    {a.propertyTitle || `Property #${a.propertyId ?? ''}`}
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#5C5A54' }}>
                    {a.scheduledAt ? new Date(a.scheduledAt).toLocaleString() : ''}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#8A877E' }}>{a.status || 'Requested'}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}