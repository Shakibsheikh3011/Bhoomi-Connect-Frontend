import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'
import { unwrap } from '../utils/property'

const EMPTY_FORM = {
  title: '',
  description: '',
  price: '',
  listingType: 'SALE',
  propertyType: 'APARTMENT',
  bedrooms: '',
  bathrooms: '',
  areaSqFt: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
}

export default function PropertyForm() {
  const { id } = useParams() // edit mode mein id milega, add mode mein undefined
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY_FORM)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    API.get(`/api/properties/${id}`)
      .then((res) => {
        const p = unwrap(res)
        setForm({
          title: p.title || '',
          description: p.description || '',
          price: p.price ?? '',
          listingType: p.listingType || 'SALE',
          propertyType: p.propertyType || 'APARTMENT',
          bedrooms: p.bedrooms ?? '',
          bathrooms: p.bathrooms ?? '',
          areaSqFt: p.areaSqFt ?? p.area ?? '',
          address: p.address || '',
          city: p.city || '',
          state: p.state || '',
          pincode: p.pincode || '',
        })
      })
      .catch((err) => setError(err.response?.data?.message || 'Could not load property.'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
        areaSqFt: form.areaSqFt ? Number(form.areaSqFt) : undefined,
      }

      let propertyId = id
      if (isEdit) {
        await API.put(`/api/properties/${id}`, payload)
      } else {
        const res = await API.post('/api/properties', payload)
        propertyId = unwrap(res)?.id
      }

      if (images.length > 0 && propertyId) {
        const fd = new FormData()
        images.forEach((file) => fd.append('images', file))
        await API.post(`/api/properties/${propertyId}/images`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }

      navigate('/my-listings')
    } catch (err) {
      console.error(err)
      const data = err.response?.data?.data
      if (data && typeof data === 'object') {
        setError(Object.values(data).join(', '))
      } else {
        setError(err.response?.data?.message || 'Could not save property. Try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-center py-24" style={{ color: '#8A877E' }}>Loading...</p>
  }

  return (
    <div style={{ backgroundColor: '#F6F3ED' }} className="min-h-[80vh]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-3xl mb-8">
          {isEdit ? 'Edit property' : 'List a new property'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-4">
          <div>
            <label className="text-sm font-medium" style={{ color: '#23262B' }}>Title</label>
            <input
              type="text" name="title" value={form.title} onChange={handleChange} required
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
              style={{ borderColor: '#DEDACF' }} placeholder="3BHK Sea View Apartment in Bandra"
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: '#23262B' }}>Description</label>
            <textarea
              name="description" value={form.description} onChange={handleChange} rows="4"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none resize-none"
              style={{ borderColor: '#DEDACF' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" style={{ color: '#23262B' }}>Price (₹)</label>
              <input
                type="number" name="price" value={form.price} onChange={handleChange} required
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium" style={{ color: '#23262B' }}>Listing type</label>
              <select
                name="listingType" value={form.listingType} onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              >
                <option value="SALE">Sale</option>
                <option value="RENT">Rent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" style={{ color: '#23262B' }}>Property type</label>
              <select
                name="propertyType" value={form.propertyType} onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              >
                <option value="APARTMENT">Apartment</option>
                <option value="VILLA">Villa</option>
                <option value="STUDIO">Studio</option>
                <option value="HOUSE">House</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium" style={{ color: '#23262B' }}>Area (sq ft)</label>
              <input
                type="number" name="areaSqFt" value={form.areaSqFt} onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" style={{ color: '#23262B' }}>Bedrooms</label>
              <input
                type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium" style={{ color: '#23262B' }}>Bathrooms</label>
              <input
                type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: '#23262B' }}>Address</label>
            <input
              type="text" name="address" value={form.address} onChange={handleChange} required
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
              style={{ borderColor: '#DEDACF' }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium" style={{ color: '#23262B' }}>City</label>
              <input
                type="text" name="city" value={form.city} onChange={handleChange} required
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium" style={{ color: '#23262B' }}>State</label>
              <input
                type="text" name="state" value={form.state} onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium" style={{ color: '#23262B' }}>Pincode</label>
              <input
                type="text" name="pincode" value={form.pincode} onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: '#23262B' }}>Photos</label>
            <input
              type="file" multiple accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files))}
              className="mt-1 w-full text-sm"
            />
            {images.length > 0 && (
              <p className="text-xs mt-1" style={{ color: '#8A877E' }}>{images.length} file(s) selected</p>
            )}
          </div>

          {error && <p className="text-sm" style={{ color: '#B5563A' }}>{error}</p>}

          <button
            type="submit" disabled={saving}
            style={{ backgroundColor: '#2F4538' }}
            className="w-full text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60"
          >
            {saving ? 'Saving...' : isEdit ? 'Update property' : 'List property'}
          </button>
        </form>
      </div>
    </div>
  )
}