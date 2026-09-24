import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        'service_4cu7br2',     // <-- apna Service ID daalo
        'template_xh8clnq',    // <-- apna Template ID daalo
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
        },
        '1_0Nq-Zmle6UWRYKh'    // <-- apna Public Key daalo
      )
      setStatus('success')
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section style={{ backgroundColor: '#2F4538' }} className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          style={{ fontFamily: 'var(--font-serif)' }}
          className="text-3xl text-center text-white mb-12"
        >
          Contact us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="text-white">
            <p className="font-semibold text-lg mb-1">BhoomiConnect</p>
            <p className="text-white/70 text-sm mb-6">Rooted in trust, connected to home</p>
            <div className="space-y-4 text-sm">
              <p>📞 +91 87708 70700</p>
              <p>📍 Freeganj, Ujjain, Madhya Pradesh</p>
              <p>✉️ shakibshaikhs88@gmail.com</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full rounded-md px-4 py-3 text-sm outline-none bg-white text-gray-900 placeholder-gray-400"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="w-full sm:w-1/2 rounded-md px-4 py-3 text-sm outline-none bg-white text-gray-900 placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full sm:w-1/2 rounded-md px-4 py-3 text-sm outline-none bg-white text-gray-900 placeholder-gray-400"
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="3"
              className="w-full rounded-md px-4 py-3 text-sm outline-none resize-none bg-white text-gray-900 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{ backgroundColor: '#C08A3E' }}
              className="w-full text-white py-3 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-white/90">✓ Message sent! We'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-sm" style={{ color: '#F0A5A5' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}