import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Miami Live API',
    endpoints: ['/api/locations', '/api/locations/:id', '/api/locations/:id/events', '/api/events', '/api/events/:id']
  })
})

app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)

// In production, serve the built React app from client/dist
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.resolve(__dirname, '../client/dist')
  app.use(express.static(clientDist))
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`🎶 Server listening on http://localhost:${PORT}`)
})
