// weatherApi.js
export const getWeather = async (city) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
    if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};