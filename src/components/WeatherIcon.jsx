const WeatherIcon = ({ name }) => {
  return (
    <img
      className="w-28 h-28"
      src={`https://openweathermap.org/img/wn/${name}@2x.png`}
      alt="weather-icon"
    />
  );
};

export default WeatherIcon;
