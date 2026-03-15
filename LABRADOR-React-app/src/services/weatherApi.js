// weatherApi.js
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Default city if geolocation fails
const DEFAULT_CITY = "Davao City";

export const getWeather = async (cityOrCoords) => {
  try {
    let url = "";

    if (!cityOrCoords) {
      // fallback to default city
      cityOrCoords = DEFAULT_CITY;
    }

    if (typeof cityOrCoords === "string") {
      // city search
      url = `${BASE_URL}/weather?q=${cityOrCoords}&appid=${API_KEY}&units=metric`;
    } else {
      // coords search { lat, lon }
      const { lat, lon } = cityOrCoords;
      url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 5-day forecast (3-hour intervals)
export const getForecast = async (cityOrCoords) => {
  try {
    let url = "";

    if (!cityOrCoords) {
      // fallback to default city
      cityOrCoords = DEFAULT_CITY;
    }

    if (typeof cityOrCoords === "string") {
      url = `${BASE_URL}/forecast?q=${cityOrCoords}&appid=${API_KEY}&units=metric`;
    } else {
      const { lat, lon } = cityOrCoords;
      url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Forecast API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};