import { Link } from 'react-router-dom'
import FallbackImage from './FallbackImage'
import Countdown from './Countdown'
import { formatEventDate, formatEventTime, formatPrice } from '../utils/format'

const Event = ({ event, showLocation = false }) => {
  const price = formatPrice(event.price_from)

  return (
    <article className="event-card" style={{ '--accent': event.location_color }}>
      <FallbackImage src={event.image} alt="" color={event.location_color} className="event-card-image" />

      <div className="event-card-body">
        <div className="event-card-tags">
          {event.genre && <span className="tag">{event.genre}</span>}
          {price && <span className="tag tag-muted">{price}</span>}
        </div>

        <h3>{event.title}</h3>

        <p className="event-card-when">
          <time dateTime={event.start_time}>
            {formatEventDate(event.start_time)} · {formatEventTime(event.start_time)}
          </time>
        </p>

        {showLocation && (
          <Link to={`/locations/${event.location_id}`} className="event-card-venue">
            📍 {event.location_name}
            <span> · {event.location_neighborhood}</span>
          </Link>
        )}

        <p className="event-card-description">{event.description}</p>

        <Countdown startTime={event.start_time} />
      </div>
    </article>
  )
}

export default Event
