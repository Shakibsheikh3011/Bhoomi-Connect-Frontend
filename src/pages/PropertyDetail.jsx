import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import PropertyCard from '../components/PropertyCard'
import { getImageUrls, normalizeProperty, unwrap } from '../utils/property'

const DETAIL_LABELS = {
  bedrooms: 'Bedrooms',
  bathrooms: 'Bathrooms',
  area: 'Area',
  areaSqFt: 'Area (sq ft)',
  propertyType: 'Property type',
  furnishing: 'Furnishing',
  floor: 'Floor',
  city: 'City',
  state: 'State',
  pincode: 'Pincode',
}

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [property, setProperty] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(null)
  const [similar, setSimilar] = useState([])
  const [wishlisted, setWishlisted] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [inquiryMsg, setInquiryMsg] = useState('')
  const [inquiryStatus, setInquiryStatus] = useState('')
  const [apptDate, setApptDate] = useState('')
  const [apptStatus, setApptStatus] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    API.get(`/api/properties/${id}`)
      .then((res) => setProperty(unwrap(res)))
      .catch((err) => setError(err.response?.data?.message || 'Could not load this property.'))
      .finally(() => setLoading(false))

    API.get(`/api/reviews/property/${id}`)
      .then((res) => {
        const d = unwrap(res)
        setReviews(d?.content ?? d ?? [])
      })
      .catch(() => {})
    API.get(`/api/reviews/property/${id}/rating`)
      .then((res) => setRating(unwrap(res)))
      .catch(() => {})
    API.get(`/api/recommendations/similar/${id}`)
      .then((res) => {
        const d = unwrap(res)
        setSimilar((d?.content ?? d ?? []).map(normalizeProperty))
      })
      .catch(() => {})

    if (isAuthenticated) {
      API.get(`/api/wishlist/check/${id}`)
        .then((res) => setWishlisted(Boolean(unwrap(res))))
        .catch(() => {})
    }
  }, [id, isAuthenticated])

  const toggleWishlist = async () => {
    if (!isAuthenticated) return navigate('/login')
    try {
      if (wishlisted) await API.delete(`/api/wishlist/${id}`)
      else await API.post(`/api/wishlist/${id}`)
      setWishlisted(!wishlisted)
    } catch (err) {
      console.error(err)
    }
  }

  const sendInquiry = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) return navigate('/login')
    setInquiryStatus('sending')
    try {
      await API.post('/api/inquiries', { propertyId: id, message: inquiryMsg })
      setInquiryStatus('sent')
      setInquiryMsg('')
    } catch (err) {
      console.error(err)
      setInquiryStatus('error')
    }
  }

  const bookAppointment = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) return navigate('/login')
    setApptStatus('sending')
    try {
      await API.post('/api/appointments', { propertyId: id, scheduledAt: apptDate })
      setApptStatus('sent')
      setApptDate('')
    } catch (err) {
      console.error(err)
      setApptStatus('error')
    }
  }

  if (loading) {
    return <p className="text-center py-24" style={{ color: '#8A877E' }}>Loading property...</p>
  }
  if (error || !property) {
    return <p className="text-center py-24" style={{ color: '#B5563A' }}>{error || 'Property not found.'}</p>
  }

  const p = normalizeProperty(property)
  const images = getImageUrls(property)
  const details = Object.keys(DETAIL_LABELS).filter(
    (k) => property[k] !== undefined && property[k] !== null && property[k] !== ''
  )

  return (
    <div style={{ backgroundColor: '#F6F3ED' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <div className="rounded-lg overflow-hidden bg-white">
              <img src={images[activeImg]} alt={p.title} className="w-full h-96 object-cover" />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3 mt-3">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${p.title} ${i + 1}`}
                    onClick={() => setActiveImg(i)}
                    className={`h-20 w-full object-cover rounded-md cursor-pointer ${
                      i === activeImg ? 'ring-2 ring-[#2F4538]' : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <h1 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-3xl">
                {p.title}
              </h1>
              <button
                onClick={toggleWishlist}
                className="text-sm px-3 py-1.5 rounded-md border whitespace-nowrap"
                style={{
                  borderColor: '#2F4538',
                  color: wishlisted ? '#fff' : '#2F4538',
                  backgroundColor: wishlisted ? '#2F4538' : 'transparent',
                }}
              >
                {wishlisted ? 'Saved' : 'Save'}
              </button>
            </div>
            <p className="mt-1 text-sm" style={{ color: '#8A877E' }}>{p.location}</p>
            <p style={{ color: '#C08A3E' }} className="text-3xl font-semibold mt-4">
              ₹{p.price.toLocaleString('en-IN')}
            </p>
            {rating !== null && rating !== undefined && (
              <p className="mt-2 text-sm" style={{ color: '#5C5A54' }}>
                Rating: {Number(rating).toFixed(1)} / 5 ({reviews.length} reviews)
              </p>
            )}

            {details.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-6">
                {details.map((k) => (
                  <div key={k} className="bg-white rounded-md p-3">
                    <p className="text-xs" style={{ color: '#8A877E' }}>{DETAIL_LABELS[k]}</p>
                    <p className="text-sm font-medium" style={{ color: '#23262B' }}>{String(property[k])}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {property.description && (
          <div className="mt-10 bg-white rounded-lg p-6">
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-xl mb-3">
              About this property
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#5C5A54' }}>{property.description}</p>
          </div>
        )}

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-xl mb-3">
              Send an inquiry
            </h2>
            {inquiryStatus === 'sent' ? (
              <p className="text-sm" style={{ color: '#2F4538' }}>✓ Inquiry sent to the seller.</p>
            ) : (
              <form onSubmit={sendInquiry} className="space-y-3">
                <textarea
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  placeholder="I'm interested in this property..."
                  rows="3"
                  required
                  className="w-full border rounded-md px-4 py-3 text-sm outline-none resize-none"
                  style={{ borderColor: '#DEDACF' }}
                />
                <button
                  type="submit"
                  disabled={inquiryStatus === 'sending'}
                  style={{ backgroundColor: '#C08A3E' }}
                  className="text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60"
                >
                  {inquiryStatus === 'sending' ? 'Sending...' : 'Send Inquiry'}
                </button>
                {inquiryStatus === 'error' && (
                  <p className="text-sm" style={{ color: '#B5563A' }}>Could not send inquiry. Try again.</p>
                )}
              </form>
            )}
          </div>

          <div className="bg-white rounded-lg p-6">
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-xl mb-3">
              Book a site visit
            </h2>
            {apptStatus === 'sent' ? (
              <p className="text-sm" style={{ color: '#2F4538' }}>✓ Appointment request sent.</p>
            ) : (
              <form onSubmit={bookAppointment} className="space-y-3">
                <input
                  type="datetime-local"
                  value={apptDate}
                  onChange={(e) => setApptDate(e.target.value)}
                  required
                  className="w-full border rounded-md px-4 py-3 text-sm outline-none"
                  style={{ borderColor: '#DEDACF' }}
                />
                <button
                  type="submit"
                  disabled={apptStatus === 'sending'}
                  style={{ backgroundColor: '#2F4538' }}
                  className="text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60"
                >
                  {apptStatus === 'sending' ? 'Booking...' : 'Request Visit'}
                </button>
                {apptStatus === 'error' && (
                  <p className="text-sm" style={{ color: '#B5563A' }}>Could not book appointment. Try again.</p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-xl mb-4">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-sm" style={{ color: '#8A877E' }}>No reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r, i) => (
                <div key={r.id ?? i} className="bg-white rounded-lg p-4">
                  <p className="text-sm font-medium" style={{ color: '#23262B' }}>
                    {r.userName || r.reviewerName || r.fullName || 'Anonymous'}
                    {r.rating ? ` · ${r.rating}/5` : ''}
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#5C5A54' }}>{r.comment || r.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {similar.length > 0 && (
          <div className="mt-12">
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-xl mb-4">
              Similar properties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {similar.slice(0, 3).map((s) => (
                <PropertyCard
                  key={s.id}
                  id={s.id}
                  title={s.title}
                  location={s.location}
                  price={s.price}
                  type={s.type}
                  image={s.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}