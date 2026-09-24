export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
         <h3 className="text-white text-lg font-semibold mb-3">BhoomiConnect</h3>
            <p className="text-sm text-gray-400">
                 Rooted in trust, connected to home.
            </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/listings" className="hover:text-white">Listings</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Contact</h4>
          <p className="text-sm text-gray-400">Ujjain, Madhya Pradesh</p>
          <p className="text-sm text-gray-400">support@realestateapp.com</p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} RealEstateApp. All rights reserved.
      </div>
    </footer>
  )
}