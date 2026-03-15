import React, { useEffect, useState } from "react";
import { getWeather, getForecast } from "../../services/weatherApi";

const ForecastDisplay = () => {
  const [city] = useState("Manila"); // default city
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Current weather
      const current = await getWeather(city);

      // 5-day forecast
      const forecastData = await getForecast(city);

      setWeather(current);
      // Filter forecast to daily (every 8th item = 24h steps in 3h intervals)
      const dailyForecast = forecastData.list.filter((_, i) => i % 8 === 0);
      setForecast(dailyForecast);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 429) {
        setError("API rate limit reached. Please try again later.");
      } else {
        setError("Failed to fetch weather data.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoading(true);
          setError(null);
          const current = await getWeather({ lat: latitude, lon: longitude });
          const forecastData = await getForecast({ lat: latitude, lon: longitude });
          setWeather(current);
          const dailyForecast = forecastData.list.filter((_, i) => i % 8 === 0);
          setForecast(dailyForecast);
        } catch (err) {
          setError("Failed to fetch geolocation weather.");
        } finally {
          setLoading(false);
        }
      },
      (err) => setError("Unable to retrieve your location.")
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-[var(--lyre-brown)]">Weather Dashboard</h2>

      {/* Geolocation Button */}
      <button
        type="button"
        onClick={handleGeolocation}
        className="px-4 py-2 bg-[var(--accent-gold)] text-white rounded hover:opacity-90 transition mb-4"
      >
        Use My Location
      </button>

      {loading && <p className="text-[var(--text-muted)]">Loading weather...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Current Weather */}
      {weather && (
        <div className="bg-white p-6 shadow rounded-xl flex items-center space-x-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-24 h-24"
          />
          <div>
            <h3 className="text-xl font-bold text-[var(--secondary-green)] mb-1">
              {weather.name}, {weather.sys?.country}
            </h3>
            <p className="text-[var(--text-main)] font-semibold">
              {Math.round(weather.main.temp)}°C - {weather.weather[0].description}
            </p>
            <p className="text-[var(--text-muted)] text-sm">
              Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
            </p>
          </div>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {forecast.map((day) => (
            <div
              key={day.dt}
              className="bg-[var(--bg-cream)] p-4 shadow rounded-lg text-center"
            >
              <p className="font-semibold text-[var(--secondary-green)]">
                {new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="mx-auto w-16 h-16"
              />
              <p className="text-[var(--text-main)] font-bold">
                {Math.round(day.main.temp)}°C
              </p>
              <p className="text-[var(--text-muted)] text-sm">{day.weather[0].main}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForecastDisplay;