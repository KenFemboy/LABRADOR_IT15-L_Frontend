import React, { useEffect, useState } from 'react';
import CourseDistributionChart from './CourseDistributionChart';
import { getWeather } from '../../services/weatherApi';

const Information = () => {
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoadingWeather(true);
      setError(null);
      try {
        // Example: Manila
        const data = await getWeather('Manila');
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather.');
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
      

      {/* Weather Card */}
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
                {weather.main.temp}°C - {weather.weather[0].description}
              </p>
              <p className="text-gray-500 text-sm">
                Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
              </p>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Information;