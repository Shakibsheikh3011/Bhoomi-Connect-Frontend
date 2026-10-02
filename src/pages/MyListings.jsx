import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios'
import { normalizeProperty, unwrap } from '../utils/property'

export default function MyListings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const load = () => {
    setLoading(true)
    API.get('/api/properties/my-listings')
      .then((res) => {
        const d = unwrap(res)
        const list = d?.content ?? d ?? []
        setListings(list.map(normalizeProperty))
      })
      .catch((err) => setError(err.response?.data?.message || 'Could not load your listings.'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await API.delete(`/api/properties/${id}`)
      setListings((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Could not delete property.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={{ backgroundColor: '#F6F3ED' }} className="min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-3xl">
            My Listings
          </h1>
          <Link
            to="/properties/new"
            style={{ backgroundColor: '#2F4538' }}
            className="text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
          >
            + Add Property
          </Link>
        </div>

        {loading && <p className="text-center py-16" style={{ color: '#8A877E' }}>Loading...</p>}
        {error && <p className="text-center py-16" style={{ color: '#B5563A' }}>{error}</p>}

        {!loading && !error && listings.length === 0 && (
          <p style={{ color: '#8A877E' }} className="text-center py-16">
            You haven't listed any properties yet.
          </p>
        )}

        {!loading && !error && listings.length > 0 && (
          <div className="space-y-4">
            {listings.map((p) => (
              <div key={p.id} className="bg-white rounded-lg p-4 flex items-center gap-4">
                <img src={p.image} alt={p.title} className="w-24 h-20 object-cover rounded-md" />
                <div className="flex-grow">
                  <p className="font-medium" style={{ color: '#23262B' }}>{p.title}</p>
                  <p className="text-sm" style={{ color: '#8A877E' }}>{p.location}</p>
                  <p className="text-sm font-medium mt-1" style={{ color: '#2F4538' }}>
                    ₹{p.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/properties/${p.id}/edit`}
                    className="text-sm px-4 py-2 rounded-md border text-center"
                    style={{ borderColor: '#2F4538', color: '#2F4538' }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deletingId === p.id}
                    className="text-sm px-4 py-2 rounded-md border disabled:opacity-60"
                    style={{ borderColor: '#B5563A', color: '#B5563A' }}
                  >
                    {deletingId === p.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}