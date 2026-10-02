import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import NotificationBell from './NotificationBell'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, role, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    setOpen(false)
    navigate('/')
  }

  const firstName = user?.fullName?.split(' ')[0] || 'Account'
  const isSeller = role === 'SELLER'

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={38} />
          <span style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-xl">
            Bhoomi<span style={{ color: '#2F4538' }}>Connect</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-[#2F4538]">Home</Link>
          <Link to="/listings" className="hover:text-[#2F4538]">Listings</Link>
          {isAuthenticated ? (
            <>
              {isSeller && (
                <>
                  <Link to="/my-listings" className="hover:text-[#2F4538]">My Listings</Link>
                  <Link to="/seller/dashboard" className="hover:text-[#2F4538]">Seller Dashboard</Link>
                </>
              )}
              {!isSeller && <Link to="/dashboard" className="hover:text-[#2F4538]">Dashboard</Link>}
              <NotificationBell />
              <span style={{ color: '#2F4538' }}>Hi, {firstName}</span>
              <button
                onClick={handleLogout}
                style={{ backgroundColor: '#2F4538' }}
                className="text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#2F4538]">Login</Link>
              <Link
                to="/signup"
                style={{ backgroundColor: '#2F4538' }}
                className="text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4 text-sm font-medium text-gray-700">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/listings" onClick={() => setOpen(false)}>Listings</Link>
          {isAuthenticated ? (
            <>
              {isSeller && (
                <>
                  <Link to="/my-listings" onClick={() => setOpen(false)}>My Listings</Link>
                  <Link to="/seller/dashboard" onClick={() => setOpen(false)}>Seller Dashboard</Link>
                </>
              )}
              {!isSeller && <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
              <button onClick={handleLogout} className="text-left" style={{ color: '#2F4538' }}>
                Logout ({firstName})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} style={{ color: '#2F4538' }}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}