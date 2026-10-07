import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import MiamiMap from '../components/MiamiMap'
import LocationCard from '../components/LocationCard'
import { Loading, ErrorMessage } from '../components/Status'

const Locations = () => {
  const [locations, setLocations] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Miami Live · Pick a venue'

    const fetchLocations = async () => {
      try {
        const data = await LocationsAPI.getAllLocations()
        setLocations(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  return (
    <main className="container page">
      <section className="hero">
        <span className="eyebrow">305 · Live music guide</span>
        <h1>
          Find your next show in <span className="gradient-text">Miami</span>
        </h1>
        <p className="lead">
          From arena tours on the bay to sunrise sets on the Terrace, pick a venue on the map to see what's playing.
        </p>
      </section>

      {loading && <Loading label="Loading venues…" />}
      {error && <ErrorMessage title="Couldn't load venues" message={error} />}

      {!loading && !error && (
        <>
          <section className="map-panel" aria-labelledby="map-heading">
            <h2 id="map-heading" className="visually-hidden">
              Venue map
            </h2>
            <MiamiMap locations={locations} activeId={activeId} onHover={setActiveId} />
          </section>

          <section className="section" aria-labelledby="venues-heading">
            <div className="section-header">
              <h2 id="venues-heading">The venues</h2>
              <Link to="/events" className="text-link">
                See every event →
              </Link>
            </div>
            <div className="location-grid">
              {locations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  isActive={location.id === activeId}
                  onHover={setActiveId}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default Locations
