import { useNavigate } from 'react-router-dom'
import FallbackImage from './FallbackImage'

// The map's viewBox is 1000 x 500 and covers this slice of Miami
const BOUNDS = { north: 25.81, south: 25.755, west: -80.235, east: -80.11 }
const WIDTH = 1000
const HEIGHT = 500

const project = (latitude, longitude) => ({
  x: ((longitude - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * WIDTH,
  y: ((BOUNDS.north - latitude) / (BOUNDS.north - BOUNDS.south)) * HEIGHT
})

const NEIGHBORHOOD_LABELS = [
  { text: 'WYNWOOD', x: 60, y: 120 },
  { text: 'DOWNTOWN', x: 250, y: 300 },
  { text: 'LITTLE HAVANA', x: 70, y: 470 },
  { text: 'SOUTH BEACH', x: 790, y: 470 }
]

const MiamiMap = ({ locations, activeId, onHover }) => {
  const navigate = useNavigate()
  const activeLocation = locations.find((location) => location.id === activeId)

  const pins = locations.map((location) => ({
    ...location,
    ...project(location.latitude, location.longitude)
  }))

  const goTo = (event, id) => {
    event.preventDefault()
    navigate(`/locations/${id}`)
  }

  const activePin = pins.find((pin) => pin.id === activeId)

  return (
    <div className="map-wrapper">
      <svg
        className="miami-map"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="group"
        aria-label="Map of Miami music venues. Select a pin to see that venue's events."
      >
        <defs>
          <pattern id="streets" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" className="map-street" />
          </pattern>
          <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className="map-water-stop-1" />
            <stop offset="1" className="map-water-stop-2" />
          </linearGradient>
        </defs>

        {/* water: Biscayne Bay + Atlantic */}
        <rect width={WIDTH} height={HEIGHT} fill="url(#water)" />

        {/* mainland */}
        <path
          className="map-land"
          d="M0,0 H405 C398,60 396,100 402,140 C408,180 404,220 410,250 C414,280 400,300 392,330 C380,370 360,420 345,460 L335,500 H0 Z"
        />
        <path
          fill="url(#streets)"
          d="M0,0 H405 C398,60 396,100 402,140 C408,180 404,220 410,250 C414,280 400,300 392,330 C380,370 360,420 345,460 L335,500 H0 Z"
        />

        {/* Miami Beach barrier island */}
        <path
          className="map-land"
          d="M772,0 H880 C884,80 886,160 882,240 C878,320 872,380 858,440 L840,456 H800 C786,420 774,380 768,330 C762,270 766,200 768,140 C770,80 771,40 772,0 Z"
        />

        {/* bay islands */}
        <ellipse className="map-land" cx="505" cy="262" rx="42" ry="14" />
        <ellipse className="map-land" cx="520" cy="300" rx="70" ry="12" />
        <ellipse className="map-land" cx="772" cy="486" rx="26" ry="10" />
        {[480, 540, 600, 660, 715].map((cx) => (
          <ellipse key={cx} className="map-land" cx={cx} cy={173 - (cx - 480) / 30} rx="18" ry="7" />
        ))}

        {/* Miami River */}
        <path className="map-river" d="M396,360 C340,352 300,345 260,332 S150,300 0,272" />

        {/* causeways */}
        <path className="map-road" d="M402,27 L772,20" />
        <path className="map-road" d="M404,177 L768,165" />
        <path className="map-road" d="M408,262 L775,318" />
        {/* I-95 */}
        <path className="map-road map-highway" d="M250,0 C248,120 246,220 262,300 C280,380 330,420 345,460" />

        <text className="map-water-label" x="590" y="420">
          Biscayne Bay
        </text>
        <text className="map-water-label" x="945" y="260" transform="rotate(90 945 260)">
          Atlantic Ocean
        </text>
        {NEIGHBORHOOD_LABELS.map((label) => (
          <text key={label.text} className="map-hood-label" x={label.x} y={label.y}>
            {label.text}
          </text>
        ))}

        {pins.map((pin) => {
          const isActive = pin.id === activeId
          // keep labels on the island side for venues on Miami Beach
          const labelOnLeft = pin.x > WIDTH * 0.7

          return (
            <a
              key={pin.id}
              href={`/locations/${pin.id}`}
              className={`map-pin ${isActive ? 'is-active' : ''}`}
              style={{ '--accent': pin.color }}
              aria-label={`${pin.name}, ${pin.neighborhood}`}
              onClick={(event) => goTo(event, pin.id)}
              onMouseEnter={() => onHover(pin.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(pin.id)}
              onBlur={() => onHover(null)}
            >
              <g transform={`translate(${pin.x} ${pin.y})`}>
                <circle className="map-pin-pulse" r="10" />
                <g className="map-pin-marker">
                  <path d="M0,0 C-4,-10 -13,-15 -13,-26 A13,13 0 1 1 13,-26 C13,-15 4,-10 0,0 Z" />
                  <circle cy="-26" r="5" className="map-pin-dot" />
                </g>
                <text
                  className="map-pin-label"
                  x={labelOnLeft ? -20 : 20}
                  y="-20"
                  textAnchor={labelOnLeft ? 'end' : 'start'}
                >
                  {pin.name}
                </text>
              </g>
            </a>
          )
        })}
      </svg>

      {activeLocation && activePin && (
        <div
          className={`map-tooltip ${activePin.x > WIDTH * 0.6 ? 'on-left' : ''}`}
          style={{
            left: `${(activePin.x / WIDTH) * 100}%`,
            top: `${(activePin.y / HEIGHT) * 100}%`,
            '--accent': activeLocation.color
          }}
          aria-hidden="true"
        >
          <FallbackImage src={activeLocation.image} alt="" color={activeLocation.color} className="map-tooltip-image" />
          <div className="map-tooltip-body">
            <strong>{activeLocation.name}</strong>
            <span>{activeLocation.neighborhood}</span>
            <span className="map-tooltip-count">
              {activeLocation.upcoming_count} upcoming {activeLocation.upcoming_count === 1 ? 'show' : 'shows'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MiamiMap
