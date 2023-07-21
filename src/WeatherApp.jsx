import React, { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const fetchCoordinates = () => {
    const apiKey = "ec1e869ae49f9a3a82cfd18d1caf544f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.coord) {
          const { lat, lon } = data.coord;
          setLatitude(lat);
          setLongitude(lon);
          fetchWeatherData(lat, lon);
        } else {
          setLatitude("Not found");
          setLongitude("Not found");
          setWeatherData(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error);
        setLatitude("Error");
        setLongitude("Error");
        setWeatherData(null);
      });
  };

  const fetchWeatherData = (lat, lon) => {
    const apiKey = "ec1e869ae49f9a3a82cfd18d1caf544f";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      });
  };

  const weatherIcons = {
    Thunderstorm: "thunderstorm-icon.jpg",
    Drizzle: "drizzle-icon.jpg",
    Rain: "rain-icon.jpg",
    Snow: "snow-icon.jpg",
    Clear: "clear-icon.jpg",
    Clouds: "clouds-icon.jpg",
    Haze: "haze-icon.jpg",
    Mist: "mist-icon.jpg",
  };

  const getDefaultWeatherIcon = (weatherCondition) => {
    // Replace 'default-icon.jpg' with the path to your default weather icon image
    return weatherIcons[weatherCondition]
      ? weatherIcons[weatherCondition]
      : "default-img.jpg";
  };

  return (
    <>
      <img
        className="weather-icon"
        // src={require(`./icons/${weatherIcons[weatherData.weather[0].main]}`)}
        src={require(`./bg-img/${getDefaultWeatherIcon(
          weatherData?.weather[0].main
        )}`)}
        alt="weather img"
      />
      <div className="weather-container">
        <h1>Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="input-field"
        />

        <button onClick={fetchCoordinates} className="fetch-button">
          Find weather
        </button>

        <br />
        <br />
        <div className="weather-details">
          {latitude && longitude && (
            <p className="location-info">
              Latitude: {latitude} <br />
              Longitude: {longitude}
            </p>
          )}
        </div>
        {weatherData && (
          <div className="weather-details">
            <h2>Weather Details</h2>

            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
        {latitude === "Error" && (
          <div className="weather-error">
            Error fetching data. Please try again later.
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
