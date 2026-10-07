import { pool } from '../config/database.js'

// NUMERIC columns come back from pg as strings, so cast coordinates to floats
const LOCATION_COLUMNS = `
  id, name, neighborhood, address, city, state, zip, description, image, capacity,
  latitude::float AS latitude, longitude::float AS longitude, color
`

const getLocations = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT ${LOCATION_COLUMNS},
        (SELECT COUNT(*)::int FROM events WHERE events.location_id = locations.id AND start_time >= NOW()) AS upcoming_count
      FROM locations
      ORDER BY id ASC
    `)
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getLocationById = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Location id must be a number' })
  }

  try {
    const { rows } = await pool.query(`SELECT ${LOCATION_COLUMNS} FROM locations WHERE id = $1`, [id])
    if (rows.length === 0) {
      return res.status(404).json({ error: `Location ${id} not found` })
    }
    res.status(200).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  getLocations,
  getLocationById
}
