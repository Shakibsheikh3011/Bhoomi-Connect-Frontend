export default function AboutSection() {
  return (
    <section style={{ backgroundColor: '#F6F3ED' }} className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2
            style={{ fontFamily: 'var(--font-serif)', color: '#2F4538' }}
            className="text-3xl mb-5"
          >
            Built on trust, made for living
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#5C5A54' }}>
             Every listing on BhoomiConnect is verified before it goes live — no fake photos,
            no outdated prices. We work directly with owners and trusted developers to make sure
             what you see is exactly what you get.
</p>
          <p className="text-sm leading-relaxed mt-4" style={{ color: '#5C5A54' }}>
            From your first search to moving in, our team is available to answer questions,
            arrange site visits, and guide you through paperwork.
          </p>
          <button
            style={{ backgroundColor: '#C08A3E' }}
            className="mt-6 text-white px-6 py-3 rounded-md text-sm font-medium hover:opacity-90"
          >
            Learn more
          </button>
        </div>

        <div style={{ backgroundColor: '#2F4538' }} className="rounded-lg p-8 text-white">
          <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-2xl mb-6">
            Why buyers trust us
          </h3>
          <ul className="space-y-5 text-sm">
            <li>
              <p className="font-medium">Verified listings</p>
              <p className="text-white/70 mt-1">Every property checked before it's published</p>
            </li>
            <li>
              <p className="font-medium">1,200+ properties</p>
              <p className="text-white/70 mt-1">Across Ujjain and 18 nearby cities</p>
            </li>
            <li>
              <p className="font-medium">Dedicated support</p>
              <p className="text-white/70 mt-1">From search to site visit to paperwork</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}