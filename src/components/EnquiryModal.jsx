import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function EnquiryModal({ planTitle, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        'service_4cu7br2',     // <-- apna Service ID daalo
        'template_xh8clnq',    // apna Template ID
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: `Interested in: ${planTitle}\n\n${form.message}`,
        },
        '1_0Nq-Zmle6UWRYKh'    // apna Public Key
      )
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(24,25,22,0.6)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 md:p-7 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-1">
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-2xl">
            Enquire now
          </h2>
          <button onClick={onClose} className="text-2xl leading-none" style={{ color: '#8A877E' }}>
            &times;
          </button>
        </div>
        <p className="text-sm mb-5" style={{ color: '#8A877E' }}>
          Interested in <span className="font-medium" style={{ color: '#2F4538' }}>{planTitle}</span> — share your details
        </p>

        {status === 'success' ? (
          <p className="text-sm py-8 text-center" style={{ color: '#2F4538' }}>
            ✓ Thanks! We'll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full border rounded-md px-4 py-3 text-sm outline-none"
              style={{ borderColor: '#DEDACF' }}
            />
            <div className="flex gap-3">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="w-1/2 border rounded-md px-4 py-3 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-1/2 border rounded-md px-4 py-3 text-sm outline-none"
                style={{ borderColor: '#DEDACF' }}
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any specific requirement?"
              rows="3"
              className="w-full border rounded-md px-4 py-3 text-sm outline-none resize-none"
              style={{ borderColor: '#DEDACF' }}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{ backgroundColor: '#C08A3E' }}
              className="w-full text-white py-3 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'error' && (
              <p className="text-sm" style={{ color: '#B5563A' }}>Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}