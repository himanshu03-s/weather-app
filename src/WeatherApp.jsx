import React, { useState } from 'react'
import SearchBox from './SearchBox'
import InfoBox from './InfoBox'

function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelsLike: 29.97,
        humidity: 8,
        temp: 32.21,
        tempMax: 32.21,
        tempMin: 32.21,
        weather: "clear sky",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div style={{textAlign:"center"}}>
        <h2>Weather App by Dalta</h2>
        <SearchBox updateInfo={updateInfo}/>
        <InfoBox info={weatherInfo} />
    </div>
  );
}

export default WeatherApp