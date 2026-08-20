const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const getWeather = (lat, lon) => {
  if (!apiKey) {
    return Promise.reject(new Error('OpenWeather API key is missing'))
  }

  const params = new URLSearchParams({
    lat,
    lon,
    units: 'metric',
    appid: apiKey
  })

  return fetch(`${baseUrl}?${params}`).then(response => response.json())
}

export default { getWeather }
