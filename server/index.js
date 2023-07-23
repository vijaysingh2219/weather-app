import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from "./src/routes/weather.js";

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Enable built-in middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Enable built-in JSON body parsing middleware
app.use(express.json());

// Routes for weather data
app.use("/weather", weatherRoutes);

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
