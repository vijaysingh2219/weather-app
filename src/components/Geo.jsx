import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { geoURL } from "../lib/api";

const Geo = () => {
  // State to hold the search query and geolocation data
  const [search, setSearch] = useState("");
  const [geoData, setGeoData] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch geolocation data from the backend API
      const response = await fetch(geoURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: search }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setGeoData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {/* Render the header component */}
      <Header />
      <div className="flex flex-col items-center justify-center p-4">
        {/* Search form */}
        <form onSubmit={handleSubmit} className="flex mb-4 max-w-96 w-full">
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter location"
            className="px-4 py-2 flex-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={!search}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </form>
        {/* Display geolocation data */}
        {geoData && (
          <div className="flex flex-col mb-4 max-w-96 w-full">
            {geoData.map((geo, index) => (
              <Link
                to={`/weather?lat=${geo.lat}&lon=${geo.lon}`}
                key={index}
                className="block mb-4 p-4 max-w-96 border border-gray-300 rounded-md  hover:bg-gray-100 hover:text-blue-500"
              >
                <div>
                  <p className="text-xl font-semibold">
                    {geo.name}, {geo.state}, {geo.country}
                  </p>
                  <p className="text-gray-600">
                    Latitude: {geo.lat}, Longitude: {geo.lon}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Geo;
