/**
 * Retrieves current weather data based on geographic coordinates.
 * @param {object} req - The request object containing latitude and longitude.
 * @param {object} res - The response object.
 * @returns {object} - The current weather data.
 */
export const getCurrentWeatherByCoordinates = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        // Validate coordinates
        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Invalid coordinates" });
        }

        // Construct URL for fetching weather data
        const url = `${process.env.BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_KEY}`;

        // Fetch weather data
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        // Handle response errors
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        // Parse response data
        const data = await response.json();

        // Return weather data
        return res.json(data);
    } catch (error) {
        console.error('Error in getCurrentWeatherByCoordinates:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Retrieves location data based on city name.
 * @param {object} req - The request object containing the city name.
 * @param {object} res - The response object.
 * @returns {object} - The location data.
 */
export const getLocationByCity = async (req, res) => {
    try {
        const { location } = req.body;

        // Validate location
        if (!location) {
            return res.status(400).json({ error: "Invalid location" });
        }

        // Construct URL for fetching location data
        const url = `${process.env.BASE_URL}/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.API_KEY}`;

        // Fetch location data
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Handle response errors
        if (!response.ok) {
            throw new Error('Failed to fetch location data');
        }

        // Parse response data
        const data = await response.json();

        // Return location data
        return res.json(data);
    } catch (error) {
        console.error('Error in getLocationByCity:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Retrieves 5-day weather forecast based on geographic coordinates.
 * @param {object} req - The request object containing latitude and longitude.
 * @param {object} res - The response object.
 * @returns {object} - The 5-day weather forecast data.
 */
export const get5DaysForecastByCoordinates = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        // Validate coordinates
        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Invalid coordinates" });
        }

        // Construct URL for fetching forecast data
        const url = `${process.env.BASE_URL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_KEY}`;

        // Fetch forecast data
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        // Handle response errors
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        // Parse response data
        const data = await response.json();

        // Return forecast data
        return res.json(data);
    } catch (error) {
        console.error('Error in get5DaysForecastByCoordinates:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
