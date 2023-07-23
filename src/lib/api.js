// Retrieve the base URL from environment variables
const baseURL = import.meta.env.VITE_API_BASE_URL;

// URL for fetching weather data based on location name
export const geoURL = baseURL + "/weather/location";

// URL for fetching weather data based on geographic coordinates
export const coordinatesURL = baseURL + "/weather/current";

// URL for fetching weather forecast data
export const forecastURL = baseURL + "/weather/forecast";
