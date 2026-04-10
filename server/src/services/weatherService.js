export const fetchWeather = async (city = 'Nagpur') => {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error('OPENWEATHER_API_KEY is missing');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return {
    city: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    condition: data.weather?.[0]?.main,
    description: data.weather?.[0]?.description,
    icon: data.weather?.[0]?.icon
  };
};
