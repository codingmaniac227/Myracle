import express from 'express';
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express()

// Parses body req
app.use(express.json())

// Allows frontend entry
app.use(cors({ origin: 'http://localhost:5173' }))

// Middleware library. Prevents Cross-Site Scripting Attacks(XSS)
app.use(helmet())
app.use(morgan("dev")); // Log request to the console

const PORT = process.env.PORT;


app.use('/api/products', productRoutes)


app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})