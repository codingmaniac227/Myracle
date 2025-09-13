import express from 'express';
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

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


app.get('/test', (req, res) => {
    console.log(res.getHeaders())
    res.send('Hello from the test route!');
})


app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})