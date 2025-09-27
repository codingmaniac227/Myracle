import express from 'express'
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"
import { sql } from './config/db.js'

dotenv.config()
const app = express()

// Parses body req
app.use(express.json())

// Allows frontend entry
app.use(cors({ origin: 'http://localhost:5173' }))

// Middleware library. Prevents Cross-Site Scripting Attacks(XSS)
app.use(helmet())
app.use(morgan("dev")) // Log request to the console

const PORT = process.env.PORT


app.use('/api/products', productRoutes)

async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

        console.log("Database initialized")
    } catch (error) {
        console.error('Error initDB', error)
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
})