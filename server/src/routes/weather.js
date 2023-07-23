import { Router } from 'express';
import { getLocationByCity, getCurrentWeatherByCoordinates, get5DaysForecastByCoordinates } from '../controllers/weather.js';

// Create a new router instance
const router = Router();

/**
 * Route to retrieve location data by city name.
 * POST /weather/location
 */
router.post('/location', getLocationByCity);

/**
 * Route to retrieve current weather data by geographic coordinates.
 * POST /weather/current
 */
router.post('/current', getCurrentWeatherByCoordinates);

/**
 * Route to retrieve 5-day weather forecast by geographic coordinates.
 * POST /weather/forecast
 */
router.post('/forecast', get5DaysForecastByCoordinates);

// Export the router
export default router;
