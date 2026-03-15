import React, { useEffect, useState } from 'react';
import { getWeather } from '../../services/weatherApi';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (coords = null) => {
    setLoadingWeather(true);
    setError(null);
    try {
      const data = await getWeather(coords); // coords or default city inside API
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather.');
    } finally {
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData({ lat: latitude, lon: longitude });
        },
        (err) => {
          console.warn('Geolocation failed, using default city.', err);
          fetchWeatherData(); // fallback to default city inside API
        }
      );
    } else {
      // Geolocation not supported, fallback
      fetchWeatherData();
    }
  }, []);

  return (
    <div className="bg-white p-6 shadow rounded-xl flex items-center space-x-3">
      {loadingWeather ? (
        <p className="text-gray-600">Loading weather...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : weather ? (
        <>
          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-20 h-20"
          />

          {/* Weather Info */}
          <div>
            <h2 className="text-xl font-bold text-[var(--secondary-green)] mb-1">
              {weather.name}
            </h2>
            <p className="text-gray-700 font-semibold">
              {Math.round(weather.main.temp)}°C - {weather.weather[0].description}
            </p>
            <p className="text-gray-500 text-sm">
              Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default WeatherWidget;