import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getCurrentTimeAdjusted } from "../lib/format";

const Clock = ({ timezone }) => {
  // State to hold the current time and date
  const adjustedTime = getCurrentTimeAdjusted(timezone);

  const [currentTime, setCurrentTime] = useState(
    format(adjustedTime, "hh:mm a")
  );
  const [currentDate, setCurrentDate] = useState(
    format(adjustedTime, "dd.MM.yyyy")
  );

  useEffect(() => {
    // Update current time and date every second
    const intervalId = setInterval(() => {
      const adjustedTime = getCurrentTimeAdjusted(timezone);
      setCurrentTime(format(adjustedTime, "hh:mm a"));
      setCurrentDate(format(adjustedTime, "dd.MM.yyyy"));
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Render the current time and date
  return (
    <>
      <h2 className="text-2xl font-semibold">{currentDate}</h2>
      <h2 className="text-2xl font-semibold">{currentTime}</h2>
    </>
  );
};

export default Clock;
