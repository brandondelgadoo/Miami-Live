import useNow from '../hooks/useNow'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const pad = (n) => String(n).padStart(2, '0')

const Countdown = ({ startTime }) => {
  const now = useNow()
  const remaining = new Date(startTime).getTime() - now

  if (remaining <= 0) {
    return <p className="countdown countdown-past">Event has passed</p>
  }

  const days = Math.floor(remaining / DAY)
  const hours = Math.floor((remaining % DAY) / HOUR)
  const minutes = Math.floor((remaining % HOUR) / MINUTE)
  const seconds = Math.floor((remaining % MINUTE) / SECOND)

  const units = [
    { label: 'days', value: days },
    { label: 'hrs', value: pad(hours) },
    { label: 'min', value: pad(minutes) },
    { label: 'sec', value: pad(seconds) }
  ]

  return (
    <div className={`countdown ${remaining < DAY ? 'countdown-soon' : ''}`}>
      <span className="countdown-label">{remaining < DAY ? 'Starting soon' : 'Starts in'}</span>
      {/* screen readers get a single summary instead of a value that changes every second */}
      <span className="visually-hidden">
        {days} days, {hours} hours and {minutes} minutes
      </span>
      <div className="countdown-units" aria-hidden="true">
        {units.map((unit) => (
          <span key={unit.label} className="countdown-unit">
            <strong>{unit.value}</strong>
            <small>{unit.label}</small>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Countdown
