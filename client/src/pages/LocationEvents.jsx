import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'
import FallbackImage from '../components/FallbackImage'
import { Loading, ErrorMessage } from '../components/Status'

const LocationEvents = () => {
  const { id } = useParams()
  const [location, setLocation] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

    const fetchData = async () => {
      try {
        const [locationData, eventsData] = await Promise.all([
          LocationsAPI.getLocationById(id),
          EventsAPI.getEventsByLocation(id)
        ])
        if (ignore) return
        setLocation(locationData)
        setEvents(eventsData)
        document.title = `Miami Live · ${locationData.name}`
      } catch (err) {
        if (!ignore) setError(err)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchData()
    return () => {
      ignore = true
    }
  }, [id])

  if (loading) {
    return (
      <main className="container page">
        <Loading label="Loading venue…" />
      </main>
    )
  }

  if (error) {
    const notFound = error.status === 404 || error.status === 400
    return (
      <main className="container page">
        <ErrorMessage
          title={notFound ? 'Venue not found' : "Couldn't load this venue"}
          message={notFound ? "We couldn't find a venue at this address." : error.message}
          showHomeLink
        />
      </main>
    )
  }

  const { name, neighborhood, address, city, state, zip, description, image, capacity, color } = location

  // events arrive sorted by start time, so splitting keeps both lists in order
  const now = Date.now()
  const upcoming = events.filter((event) => new Date(event.start_time).getTime() > now)
  const past = events.filter((event) => new Date(event.start_time).getTime() <= now)

  return (
    <main className="page location-page" style={{ '--accent': color }}>
      <section className="location-hero">
        <FallbackImage src={image} alt={name} color={color} className="location-hero-image" />
        <div className="location-hero-overlay" />
        <div className="container location-hero-content">
          <Link to="/" className="back-link">
            ← All venues
          </Link>
          <span className="eyebrow">{neighborhood}</span>
          <h1>{name}</h1>
          <p className="location-hero-address">
            {address}, {city}, {state} {zip}
            {capacity > 0 && <span> · Capacity {capacity.toLocaleString()}</span>}
          </p>
          <p className="lead">{description}</p>
        </div>
      </section>

      <div className="container">
        <section className="section" aria-labelledby="upcoming-heading">
          <div className="section-header">
            <h2 id="upcoming-heading">Upcoming at {name}</h2>
            <span className="muted">
              {upcoming.length} {upcoming.length === 1 ? 'show' : 'shows'}
            </span>
          </div>

          {upcoming.length > 0 ? (
            <div className="event-list">
              {upcoming.map((event) => (
                <Event key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="empty-state">No upcoming shows here yet. Check back soon!</p>
          )}
        </section>

        {past.length > 0 && (
          <section className="section" aria-labelledby="past-heading">
            <div className="section-header">
              <h2 id="past-heading">Past events</h2>
              <span className="muted">
                {past.length} {past.length === 1 ? 'show' : 'shows'}
              </span>
            </div>
            <div className="event-list">
              {/* most recent first */}
              {[...past].reverse().map((event) => (
                <Event key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default LocationEvents
