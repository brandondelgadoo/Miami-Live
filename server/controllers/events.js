import { pool } from '../config/database.js'

const EVENT_COLUMNS = `
  events.id, events.location_id, events.title, events.genre, events.description,
  events.start_time, events.price_from, events.image,
  locations.name AS location_name, locations.neighborhood AS location_neighborhood,
  locations.color AS location_color
`

const getEvents = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT ${EVENT_COLUMNS}
      FROM events
      JOIN locations ON locations.id = events.location_id
      ORDER BY events.start_time ASC
    `)
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getEventById = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Event id must be a number' })
  }

  try {
    const { rows } = await pool.query(
      `SELECT ${EVENT_COLUMNS}
       FROM events
       JOIN locations ON locations.id = events.location_id
       WHERE events.id = $1`,
      [id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: `Event ${id} not found` })
    }
    res.status(200).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getEventsByLocation = async (req, res) => {
  const locationId = parseInt(req.params.id, 10)
  if (Number.isNaN(locationId)) {
    return res.status(400).json({ error: 'Location id must be a number' })
  }

  try {
    const { rows } = await pool.query(
      `SELECT ${EVENT_COLUMNS}
       FROM events
       JOIN locations ON locations.id = events.location_id
       WHERE events.location_id = $1
       ORDER BY events.start_time ASC`,
      [locationId]
    )
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  getEvents,
  getEventById,
  getEventsByLocation
}
