import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

const Weather = ({ country }) => {
  const [weatherResult, setWeatherResult] = useState(null)
  const capital = country.capital?.[0]
  const [lat, lon] = country.capitalInfo?.latlng ?? []

  useEffect(() => {
    if (lat === undefined || lon === undefined) {
      return
    }

    weatherService
      .getWeather(lat.toString(), lon.toString())
      .then(weatherData => {
        if (weatherData.cod !== 200) {
          setWeatherResult({
            lat,
            lon,
            error: 'Weather data is not available'
          })
          return
        }

        setWeatherResult({
          lat,
          lon,
          data: weatherData
        })
      })
      .catch(() => {
        setWeatherResult({
          lat,
          lon,
          error: 'Weather data is not available'
        })
      })
  }, [lat, lon])

  if (lat === undefined || lon === undefined) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>Weather data is not available</p>
      </div>
    )
  }

  if (!weatherResult || weatherResult.lat !== lat || weatherResult.lon !== lon) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>Loading weather...</p>
      </div>
    )
  }

  if (weatherResult.error) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>{weatherResult.error}</p>
      </div>
    )
  }

  const weather = weatherResult.data

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages ?? {})

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital?.[0]}</p>
      <p>Area {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={country.flags.alt ?? `Flag of ${country.name.common}`}
        width="260"
      />

      <Weather country={country} />
    </div>
  )
}

const CountryList = ({ countries, showCountry }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => showCountry(country)}>show</button>
        </div>
      ))}
    </div>
  )
}

const Countries = ({ countries, filter, showCountry }) => {
  if (filter.trim() === '') {
    return null
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1) {
    return <CountryList countries={countries} showCountry={showCountry} />
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return <div>No matches</div>
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (country) => {
    setFilter(country.name.common)
  }

  return (
    <div>
      <label>
        find countries{' '}
        <input value={filter} onChange={handleFilterChange} />
      </label>
      <Countries
        countries={countriesToShow}
        filter={filter}
        showCountry={showCountry}
      />
    </div>
  )
}

export default App
