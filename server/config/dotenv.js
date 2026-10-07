import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load server/.env no matter which directory the process was started from
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })
