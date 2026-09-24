const PLANS = [
  { title: '1 BHK Flats', price: '₹22.71 Lakhs' },
  { title: '2 BHK Flats', price: '₹44 Lakhs' },
  { title: '3 BHK Flats', price: '₹61.9 Lakhs' },
  { title: '3 & 4 BHK', price: '₹1.12 CR', note: 'Row houses' },
]

export default function PricingSection({ onEnquire }) {
  return (
    <section style={{ backgroundColor: '#2F4538' }} className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          style={{ fontFamily: 'var(--font-serif)' }}
          className="text-3xl text-center text-white mb-12"
        >
          Exclusive pricing
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {PLANS.map((plan, i) => (
            <div key={i} className="bg-white rounded-lg p-6 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#2F4538' }}
              >
                <span style={{ color: '#C08A3E' }} className="text-xl">⌂</span>
              </div>
              <p style={{ color: '#23262B' }} className="font-semibold">{plan.title}</p>
              {plan.note && (
                <p className="text-xs mt-1" style={{ color: '#8A877E' }}>{plan.note}</p>
              )}
              <p className="text-sm mt-3" style={{ color: '#8A877E' }}>Starting from</p>
              <p style={{ color: '#C08A3E' }} className="text-2xl font-semibold mt-1">{plan.price}</p>
              <button
                onClick={() => onEnquire(plan.title)}
                className="mt-4 text-sm font-medium px-4 py-2 rounded-md border"
                style={{ borderColor: '#2F4538', color: '#2F4538' }}
              >
                Enquire Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}