import { Link } from 'react-router-dom'
import { FALLBACK_IMAGE } from '../utils/property'

export default function PropertyCard({ id, title, location, price, type, image }) {
  const card = (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="h-44 overflow-hidden">
        <img
          src={image || FALLBACK_IMAGE}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p style={{ color: '#23262B' }} className="font-medium">{title}</p>
          {type && (
            <span
              className="text-xs px-2 py-1 rounded-full whitespace-nowrap"
              style={{ backgroundColor: '#EFEBE0', color: '#5C5A54' }}
            >
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </span>
          )}
        </div>
        <p className="text-sm mt-1" style={{ color: '#8A877E' }}>{location}</p>
        <p style={{ color: '#2F4538' }} className="mt-2 font-medium">
          ₹{Number(price).toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  )

  return id ? <Link to={`/properties/${id}`} className="block h-full">{card}</Link> : card
}