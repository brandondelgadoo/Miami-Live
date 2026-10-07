// All venues are in Miami, so always show times in Miami's time zone
const TIME_ZONE = 'America/New_York'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: TIME_ZONE
})

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: TIME_ZONE,
  timeZoneName: 'short'
})

export const formatEventDate = (isoString) => dateFormatter.format(new Date(isoString))

export const formatEventTime = (isoString) => timeFormatter.format(new Date(isoString))

export const formatPrice = (priceFrom) => {
  if (priceFrom === null || priceFrom === undefined) return null
  return priceFrom === 0 ? 'Free' : `From $${priceFrom}`
}
