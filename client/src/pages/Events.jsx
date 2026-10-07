import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'
import { Loading, ErrorMessage } from '../components/Status'

const SORTS = {
  soonest: { label: 'Date: soonest first', compare: (a, b) => new Date(a.start_time) - new Date(b.start_time) },
  latest: { label: 'Date: latest first', compare: (a, b) => new Date(b.start_time) - new Date(a.start_time) },
  venue: {
    label: 'Venue: A–Z',
    compare: (a, b) =>
      a.location_name.localeCompare(b.location_name) || new Date(a.start_time) - new Date(b.start_time)
  },
  title: { label: 'Event name: A–Z', compare: (a, b) => a.title.localeCompare(b.title) }
}

const WHEN_OPTIONS = {
  all: 'All events',
  upcoming: 'Upcoming only',
  past: 'Past only'
}

const Events = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // keep filters in the URL so a filtered view can be shared or bookmarked
  const [searchParams, setSearchParams] = useSearchParams()
  const locationFilter = searchParams.get('location') || 'all'
  const sortKey = SORTS[searchParams.get('sort')] ? searchParams.get('sort') : 'soonest'
  const when = WHEN_OPTIONS[searchParams.get('when')] ? searchParams.get('when') : 'all'

  const updateParam = (key, value, defaultValue) => {
    const next = new URLSearchParams(searchParams)
    if (value === defaultValue) next.delete(key)
    else next.set(key, value)
    setSearchParams(next, { replace: true })
  }

  useEffect(() => {
    document.title = 'Miami Live · All events'

    const fetchData = async () => {
      try {
        const [eventsData, locationsData] = await Promise.all([
          EventsAPI.getAllEvents(),
          LocationsAPI.getAllLocations()
        ])
        setEvents(eventsData)
        setLocations(locationsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const visibleEvents = useMemo(() => {
    const now = Date.now()
    return events
      .filter((event) => locationFilter === 'all' || String(event.location_id) === locationFilter)
      .filter((event) => {
        const isPast = new Date(event.start_time).getTime() <= now
        if (when === 'upcoming') return !isPast
        if (when === 'past') return isPast
        return true
      })
      .sort(SORTS[sortKey].compare)
  }, [events, locationFilter, sortKey, when])

  return (
    <main className="container page">
      <section className="hero hero-compact">
        <span className="eyebrow">Every venue, every night</span>
        <h1>All events</h1>
        <p className="lead">Browse every show across Miami. Filter by venue or sort to plan your week.</p>
      </section>

      {loading && <Loading label="Loading events…" />}
      {error && <ErrorMessage title="Couldn't load events" message={error} />}

      {!loading && !error && (
        <>
          <div className="filters" role="region" aria-label="Filter and sort events">
            <div className="chip-group" role="group" aria-label="Filter by venue">
              <button
                type="button"
                className={`chip ${locationFilter === 'all' ? 'is-selected' : ''}`}
                aria-pressed={locationFilter === 'all'}
                onClick={() => updateParam('location', 'all', 'all')}
              >
                All venues
              </button>
              {locations.map((location) => {
                const value = String(location.id)
                const selected = locationFilter === value
                return (
                  <button
                    key={location.id}
                    type="button"
                    className={`chip ${selected ? 'is-selected' : ''}`}
                    style={{ '--accent': location.color }}
                    aria-pressed={selected}
                    onClick={() => updateParam('location', value, 'all')}
                  >
                    <span className="chip-dot" aria-hidden="true" />
                    {location.name}
                  </button>
                )
              })}
            </div>

            <div className="select-group">
              <label className="select">
                <span>Show</span>
                <select value={when} onChange={(e) => updateParam('when', e.target.value, 'all')}>
                  {Object.entries(WHEN_OPTIONS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="select">
                <span>Sort</span>
                <select value={sortKey} onChange={(e) => updateParam('sort', e.target.value, 'soonest')}>
                  {Object.entries(SORTS).map(([value, { label }]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <p className="results-count muted" aria-live="polite">
            Showing {visibleEvents.length} of {events.length} events
          </p>

          {visibleEvents.length > 0 ? (
            <div className="event-list">
              {visibleEvents.map((event) => (
                <Event key={event.id} event={event} showLocation />
              ))}
            </div>
          ) : (
            <p className="empty-state">No events match these filters.</p>
          )}
        </>
      )}
    </main>
  )
}

export default Events
