export default function PropertyCard({ title, location, price, type, image }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p style={{ color: '#23262B' }} className="font-medium">{title}</p>
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{ backgroundColor: '#EFEBE0', color: '#5C5A54' }}
          >
            {type}
          </span>
        </div>
        <p className="text-sm mt-1" style={{ color: '#8A877E' }}>{location}</p>
        <p style={{ color: '#2F4538' }} className="mt-2 font-medium">₹{price.toLocaleString('en-IN')}</p>
      </div>
    </div>
  )
}