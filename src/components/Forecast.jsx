import { useState, useEffect } from "react";
import { format } from "date-fns";
import Icon from "./WeatherIcon";
import { forecastURL } from "../lib/api";
import { convertUTCtoTimezone } from "../lib/format";

const Forecast = ({ latitude, longitude }) => {
  // State to hold the weather forecast data
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        // Fetch weather forecast data from the backend API
        const response = await fetch(forecastURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch forecast data");
        }

        // Parse the JSON response
        const data = await response.json();
        console.log(data);
        setForecastData(data);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecast();
  }, [latitude, longitude]);

  if (!forecastData) return null;

  return (
    // Display the weather forecast data
    <div className="max-w-lg mx-auto m-4 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Weather Forecast for {forecastData.city.name}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {forecastData.list.map((forecastItem, index) => (
          <ForecastItem
            key={index}
            forecastItem={forecastItem}
            timezone={forecastData.city.timezone}
          />
        ))}
      </div>
    </div>
  );
};

const ForecastItem = ({ forecastItem, timezone }) => {
  // Convert forecast time to the specified timezone
  const date = convertUTCtoTimezone(forecastItem.dt_txt, timezone);
  const formattedDate = format(date, "dd MMM");
  const formattedTime = format(date, "hh:mm a");

  return (
    // Display individual forecast item
    <div
      key={forecastItem.dt}
      className="min-w-36 flex flex-col p-4 bg-gray-200 rounded-lg"
    >
      <div className="flex justify-between">
        <p className="text-gray-600 font-semibold">{formattedDate}</p>
        <p className="text-gray-600 font-semibold">{formattedTime}</p>
      </div>
      <p className="text-gray-600 text-6xl font-bold self-center my-4">
        {Math.round(forecastItem.main.temp)}°C
      </p>
      <div className="self-center">
        <Icon name={forecastItem.weather[0].icon} />
      </div>
      <p className="text-gray-600 font-bold">{forecastItem.weather[0].main}</p>
      <p className="text-gray-500 font-semibold">
        {forecastItem.weather[0].description}
      </p>
    </div>
  );
};

export default Forecast;
