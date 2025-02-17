import React, { useState } from "react";
import "./App.css";
import { FaSun, FaCloudRain, FaCloudSun } from "react-icons/fa";  // Importing FontAwesome icons

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearch = async () => {
    if (!city) return;
    const apiKey = "fe824cb856a37281c8c13e7a5fbbd488";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      setWeatherData(data);
      setError("");
      setSearchClicked(true);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  const getWeatherIcon = (condition) => {
    if (condition === "Rain") return <FaCloudRain size={60} />;
    if (condition === "Clear") return <FaSun size={60} />;
    return <FaCloudSun size={60} />;
  };

  return (
    <div className={`app-container ${searchClicked ? "search-clicked" : ""}`}>
      <div className={`box-title ${searchClicked ? "moved" : ""}`}>
        <h1 className="app-title">{searchClicked ? city : "Weather App"}</h1>
      </div>

      <div className={`box-search ${searchClicked ? "search-moved" : ""}`}>
        <div className="search-container">
          <input
            className="city-input"
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {weatherData && (
        <div className="temperature-display">
          <h2>{weatherData.main.temp}°C</h2>
          <div className="weather-icon">{getWeatherIcon(weatherData.weather[0].main)}</div>
        </div>
      )}

      {error && <div className="box-error"><p className="error-message">{error}</p></div>}

      {weatherData && (
        <div className="box-weather">
          <div className="weather-info left">
            <h2>Weather: {weatherData.weather[0].main}</h2>
          </div>
          <div className="weather-info middle">
            <h3>Humidity: {weatherData.main.humidity}%</h3>
          </div>
          <div className="weather-info right">
            <h3>Wind: {weatherData.wind.speed} m/s</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
