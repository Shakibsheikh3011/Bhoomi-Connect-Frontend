import { useState } from 'react'
import emailjs from '@emailjs/browser'
import CountUp from '../components/CountUp'
import PropertyCard from '../components/PropertyCard'
import PricingSection from '../components/PricingSection'
import AboutSection from '../components/AboutSection'
import GallerySection from '../components/GallerySection'
import ContactSection from '../components/ContactSection'
import EnquiryModal from '../components/EnquiryModal'

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [enquiryPlan, setEnquiryPlan] = useState(null)

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
          message: form.message,
        },
        '1_0Nq-Zmle6UWRYKh'
      )
      setStatus('success')
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=80"
          alt="Apartment complex"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(24,25,22,0.75) 0%, rgba(24,25,22,0.35) 45%, rgba(24,25,22,0.15) 100%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h1
              style={{ fontFamily: 'var(--font-serif)' }}
              className="reveal-1 text-5xl md:text-6xl font-medium leading-tight text-white"
            >
              Find your next home
            </h1>
            <p className="reveal-2 mt-5 text-xl text-white/85">
              Verified 1, 2 &amp; 3 BHK apartments and independent houses across Ujjain and nearby areas.
            </p>

            <div className="reveal-3 mt-10 flex gap-10">
              <div>
                <p className="text-3xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                  <CountUp target={1200} />+
                </p>
                <p className="text-sm text-white/70 mt-1">Properties listed</p>
              </div>
              <div>
                <p className="text-3xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                  <CountUp target={340} />
                </p>
                <p className="text-sm text-white/70 mt-1">Happy families</p>
              </div>
              <div>
                <p className="text-3xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                  <CountUp target={18} />
                </p>
                <p className="text-sm text-white/70 mt-1">Cities covered</p>
              </div>
            </div>
          </div>

          <div className="reveal-4 bg-white rounded-lg shadow-lg p-6 md:p-7">
            <h2
              style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }}
              className="text-2xl mb-1"
            >
              Let's find your next home
            </h2>
            <p className="text-sm mb-5" style={{ color: '#8A877E' }}>
              Share your details and we'll send you the best matches.
            </p>

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
                placeholder="What kind of property are you looking for?"
                rows="3"
                className="w-full border rounded-md px-4 py-3 text-sm outline-none resize-none"
                style={{ borderColor: '#DEDACF' }}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{ backgroundColor: '#C08A3E' }}
                className="w-full text-white py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-sm" style={{ color: '#2F4538' }}>✓ Message sent! We'll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-sm" style={{ color: '#B5563A' }}>Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section style={{ backgroundColor: '#2F4538' }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-white/60">Property types</p>
            <p className="mt-1 font-medium">1, 2 &amp; 3 BHK Flats</p>
          </div>
          <div>
            <p className="text-sm text-white/60">Also available</p>
            <p className="mt-1 font-medium">Independent Houses</p>
          </div>
          <div>
            <p className="text-sm text-white/60">Price range</p>
            <p className="mt-1 font-medium">₹15L – ₹1.2Cr</p>
          </div>
          <div>
            <p className="text-sm text-white/60">Coverage</p>
            <p className="mt-1 font-medium">Ujjain &amp; nearby cities</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection onEnquire={(planTitle) => setEnquiryPlan(planTitle)} />

      {/* About */}
      <AboutSection />

      {/* Gallery */}
      <GallerySection />

      {/* Featured properties */}
      <section className="max-w-6xl mx-auto px-6 py-24" style={{ backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: '#23262B' }} className="text-2xl mb-6">
          Featured this week
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertyCard
            title="3 BHK Apartment"
            location="Freeganj, Ujjain"
            price={4200000}
            type="Buy"
            image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80"
          />
          <PropertyCard
            title="2 BHK Villa"
            location="Dewas Road, Ujjain"
            price={7500000}
            type="Buy"
            image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
          />
          <PropertyCard
            title="1 BHK Flat"
            location="Nanakheda, Ujjain"
            price={12000}
            type="Rent"
            image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80"
          />
        </div>
      </section>

      {/* Contact */}
      <ContactSection />

      {/* Enquiry modal */}
      {enquiryPlan && (
        <EnquiryModal planTitle={enquiryPlan} onClose={() => setEnquiryPlan(null)} />
      )}
    </div>
  )
}