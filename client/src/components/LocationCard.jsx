import { Link } from 'react-router-dom'
import FallbackImage from './FallbackImage'

const LocationCard = ({ location, isActive, onHover }) => {
  const { id, name, neighborhood, image, color, upcoming_count: upcomingCount } = location

  return (
    <Link
      to={`/locations/${id}`}
      className={`location-card ${isActive ? 'is-active' : ''}`}
      style={{ '--accent': color }}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(id)}
      onBlur={() => onHover?.(null)}
    >
      <FallbackImage src={image} alt={name} color={color} className="location-card-image" />
      <div className="location-card-body">
        <span className="eyebrow">{neighborhood}</span>
        <h3>{name}</h3>
        <span className="location-card-meta">
          {upcomingCount > 0 ? `${upcomingCount} upcoming ${upcomingCount === 1 ? 'show' : 'shows'}` : 'No upcoming shows'}
          <span aria-hidden="true"> →</span>
        </span>
      </div>
    </Link>
  )
}

export default LocationCard
