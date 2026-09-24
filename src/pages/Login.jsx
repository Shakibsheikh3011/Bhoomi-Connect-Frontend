import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Please fill in both email and password')
      return
    }

    setLoading(true)
    try {
      const res = await API.post('/api/auth/login', form)
      // Backend jo bhi field mein token bheje (token, accessToken, etc.) usse adjust karna padega
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6" style={{ backgroundColor: '#F6F3ED' }}>
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-sm">
        <h1 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-3xl mb-1">
          Welcome back
        </h1>
        <p className="text-sm mb-6" style={{ color: '#8A877E' }}>
          Log in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm mt-6 text-center" style={{ color: '#8A877E' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#2F4538' }} className="font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}