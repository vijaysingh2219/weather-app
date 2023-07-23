import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Clock from "./Clock";
import Forecast from "./Forecast";
import Footer from "./Footer";
import Header from "./Header";
import Icon from "./Icon";
import { coordinatesURL } from "../lib/api";
import {
  convertDateToTimeZone,
  convertDegreeToDirection,
  formatTimeInTimezone,
} from "../lib/format";

const Weather = () => {
  // Extract latitude and longitude from URL query parameters
  const location = useLocation().search;
  const params = new URLSearchParams(location);
  const latitude = params.get("lat");
  const longitude = params.get("lon");

  // State variables for weather data and formatted date/time
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetch weather data from backend API
        const response = await fetch(coordinatesURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        // Parse JSON response
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  if (!weatherData) return null;

  // Destructure weather data
  const { name, main, weather, wind, sys, visibility, timezone } = weatherData;

  // Render weather details
  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto flex flex-col p-4 rounded-lg bg-gray-200 dark:bg-gray-600">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <Clock timezone={timezone} />
        </div>
        <div className="self-center m-8">
          <p className="text-9xl">{Math.round(main.temp)}°</p>
          <p className="text-2xl pl-2">{weather[0].main}</p>
        </div>
        <div className="grid grid-cols-2 mt-8 gap-6">
          <WeatherDetail
            name="Air Pressure"
            value={`${main.pressure} hPa`}
            icon="fa-solid fa-temperature-half"
          />
          <WeatherDetail
            name="Humidity"
            value={`${main.humidity}%`}
            icon="fa-solid fa-droplet"
          />
          <WeatherDetail
            name="Visibility"
            value={`${visibility} meters`}
            icon="fa-solid fa-smog"
          />
          <WeatherDetail
            name="Wind"
            value={`${convertDegreeToDirection(wind.deg)} - ${wind.speed} m/s`}
            icon="fa-solid fa-wind"
          />
          <WeatherDetail
            name="Sunrise"
            value={formatTimeInTimezone(
              convertDateToTimeZone(new Date(sys.sunrise * 1000), timezone)
            )}
            icon="fa-solid fa-sun"
          />
          <WeatherDetail
            name="Sunset"
            value={formatTimeInTimezone(
              convertDateToTimeZone(new Date(sys.sunset * 1000), timezone)
            )}
            icon="fa-regular fa-moon"
          />
        </div>
      </div>
      <Forecast latitude={latitude} longitude={longitude} />
      <Footer />
    </>
  );
};

// Component to render individual weather details
function WeatherDetail({ name, value, icon }) {
  return (
    <div>
      <Icon name={icon} />
      <p className="text-lg">{name}:</p>
      <p className="text-2xl font-medium">{value}</p>
    </div>
  );
}

export default Weather;
