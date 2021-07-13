import React, { useState } from "react";
import Info from "./components/info"
import Form from "./components/form"
import Weather from "./components/weather"


const API_KEY = "2e99b841e2f195e533356cf1e4c98668"

const App = () => {
  const [weather, setWeather] = useState({
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  })

  const gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city) {
      const api_url = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      setWeather({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined,
      })

    } else {
      setWeather({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите название города"
      })
    }
  }

  return (
    <div className="wrapper">
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 info">
              <Info />
            </div>
            <div className="col-sm-7 form">
              <Form weatherMethod={gettingWeather} />
              <Weather
                temp={weather.temp}
                city={weather.city}
                country={weather.country}
                pressure={weather.pressure}
                sunset={weather.sunset}
                error={weather.error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App;