import './App.css';
import clouds from './assets/images/clouds.png';
import humidity from './assets/images/humidity.png';
import wind from './assets/images/wind.png';
import rain from './assets/images/rain.png';
import mist from './assets/images/mist.png';
import snow from './assets/images/snow.png';
import drizzle from './assets/images/drizzle.png';
import clear from './assets/images/clear.png';
import { useState } from 'react';

function App() {
  const apiKey = "d02f528da9277408e18b86fdbf114ec9";
  const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  async function checkWeather() {
    if (!city) return;
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    const data = await response.json();
    setWeather(data);
    setCity('');
  }

  function getWeatherIcon(condition) {
    switch (condition) {
      case "Clouds": return clouds;
      case "Clear": return clear;
      case "Rain": return rain;
      case "Drizzle": return drizzle;
      case "Mist": return mist;
      case "Snow": return snow;
      default: return clear;
    }
  }

  return (
    <div className="container">
      <div className="searchBox">
        <input
          type="text"
          placeholder="Enter a city..."
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button onClick={checkWeather} className="search-button">Search</button>
      </div>

      {weather && weather.main && (
        <div className="weather">
          <div className="temperature">
            <img className="weather-icon" src={getWeatherIcon(weather.weather[0].main)} alt="weather" />
            <div>
              <h1 className="temp">{Math.round(weather.main.temp)}°F</h1>
              <h2 className="city">{weather.name}</h2>
            </div>
            <h2 className='description'>{weather.weather[0].description}</h2>
          </div>
          <div className="details">
            <div className="col">
              <img src={humidity} alt="humidity" />
              <div>
                <p className="humidity">{weather.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="wind" />
              <div>
                <p className="wind">{weather.wind.speed} mph</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
