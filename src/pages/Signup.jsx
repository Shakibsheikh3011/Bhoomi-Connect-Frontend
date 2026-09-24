import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function Signup() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'BUYER',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.fullName || !form.email || !form.phone || !form.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      await API.post('/api/auth/register', form)
      navigate('/login')
    } catch (err) {
      console.error(err)
      const data = err.response?.data?.data
      if (data) {
        setError(Object.values(data).join(', '))
      } else {
        setError(err.response?.data?.message || 'Signup failed. Try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12" style={{ backgroundColor: '#F6F3ED' }}>
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-sm">
        <h1 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-3xl mb-1">
          Create account
        </h1>
        <p className="text-sm mb-6" style={{ color: '#8A877E' }}>
          Sign up for free and start browsing listings
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium" style={{ color: '#23262B' }}>Full name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
              style={{ borderColor: '#DEDACF' }}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: '#23262B' }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
              style={{ borderColor: '#DEDACF' }}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: '#23262B' }}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
              style={{ borderColor: '#DEDACF' }}
              placeholder="98765 43210"
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: '#23262B' }}>I am a</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
              style={{ borderColor: '#DEDACF' }}
            >
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: '#23262B' }}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none"
              style={{ borderColor: '#DEDACF' }}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm" style={{ color: '#B5563A' }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#2F4538' }}
            className="w-full text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-sm mt-6 text-center" style={{ color: '#8A877E' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2F4538' }} className="font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}