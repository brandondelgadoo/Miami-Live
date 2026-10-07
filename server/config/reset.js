import { pool } from './database.js'
import locationsData from './data.js'

const createTables = async (client) => {
  // events depends on locations, so drop it first
  await client.query(`
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      neighborhood VARCHAR(100) NOT NULL,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state CHAR(2) NOT NULL,
      zip VARCHAR(10) NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      capacity INTEGER,
      latitude NUMERIC(9, 6) NOT NULL,
      longitude NUMERIC(9, 6) NOT NULL,
      color VARCHAR(7) NOT NULL
    );

    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      genre VARCHAR(100),
      description TEXT NOT NULL,
      start_time TIMESTAMPTZ NOT NULL,
      price_from INTEGER,
      image TEXT NOT NULL
    );
  `)
  console.log('🎉 locations and events tables created')
}

const seedTables = async (client) => {
  for (const location of locationsData) {
    const { rows } = await client.query(
      `INSERT INTO locations
        (name, neighborhood, address, city, state, zip, description, image, capacity, latitude, longitude, color)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING id`,
      [
        location.name,
        location.neighborhood,
        location.address,
        location.city,
        location.state,
        location.zip,
        location.description,
        location.image,
        location.capacity,
        location.latitude,
        location.longitude,
        location.color
      ]
    )
    const locationId = rows[0].id
    console.log(`✅ ${location.name} added`)

    for (const event of location.events) {
      await client.query(
        `INSERT INTO events (location_id, title, genre, description, start_time, price_from, image)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [locationId, event.title, event.genre, event.description, event.start_time, event.price_from, event.image]
      )
    }
    console.log(`   ↳ ${location.events.length} events added`)
  }
}

const reset = async () => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    await createTables(client)
    await seedTables(client)
    await client.query('COMMIT')
    console.log('🌴 Database reset complete')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('⚠️ Error resetting database:', err.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

reset().catch(async (err) => {
  // e.g. missing or wrong credentials in server/.env
  console.error('⚠️ Could not connect to the database:', err.message)
  process.exitCode = 1
  await pool.end()
})
