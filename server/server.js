import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Miami Live API' })
})

// In production, serve the built React app from client/dist
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.resolve(__dirname, '../client/dist')
  app.use(express.static(clientDist))
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`🎶 Server listening on http://localhost:${PORT}`)
})
