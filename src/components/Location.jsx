import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Location = () => {
  // State to track loading state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle button click for fetching location
  const handleClick = () => {
    setLoading(true);
    if (navigator.geolocation) {
      // Get current geolocation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLoading(false);
          // Redirect to weather page with current location coordinates
          navigate(`/weather?lat=${latitude}&lon=${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setLoading(false);
    }
  };

  // Render button to fetch current location
  return (
    <div>
      <button
        onClick={handleClick}
        className="flex justify-center items-center gap-2"
      >
        <div className="text-lg">
          <i className="fa-solid fa-globe"></i>
        </div>
        <p className="text-lg font-semibold">
          {loading ? "Fetching Location..." : "Use Current Location"}
        </p>
      </button>
    </div>
  );
};

export default Location;
