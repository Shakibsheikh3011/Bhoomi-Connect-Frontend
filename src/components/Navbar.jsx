import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={38} />
          <span
            style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }}
            className="text-xl"
          >
            Bhoomi<span style={{ color: '#2F4538' }}>Connect</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-[#2F4538]">Home</Link>
          <Link to="/listings" className="hover:text-[#2F4538]">Listings</Link>
          <Link to="/login" className="hover:text-[#2F4538]">Login</Link>
          <Link
            to="/signup"
            style={{ backgroundColor: '#2F4538' }}
            className="text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-[#2F4538]">Home</Link>
          <Link to="/listings" className="hover:text-[#2F4538]">Listings</Link>
          <Link to="/login" className="hover:text-[#2F4538]">Login</Link>
          <Link to="/signup" style={{ color: '#2F4538' }}>Sign Up</Link>
        </div>
      )}
    </nav>
  )
}