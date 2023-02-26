import { useEffect, useState } from "react";
import { findWeatherByCoutry } from "../services/openWeatherMap";

const SingleCountry = ({ data }) => {
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        findWeatherByCoutry(data.latlng[0], data.latlng[1]).then(response => {
            setWeatherData(response)
        })
    }, [data])

    return (
        <div className="singleCountry">
            <p className="countryName">{data.name.common}</p>
            <div>
                <p className="countryCapital">Capital: {data.capital}</p>
                <p className="countryArea">Area: {data.area}</p>
            </div>
            <div>
                <p className="titleLanguages">languages:</p>
                <ul className="countryLanguages">
                    {Object.values(data.languages).map((language, index) => <li key={index}>{language}</li>)}
                </ul>
            </div>
            <img className="countryFlag" src={data.flags.svg} alt={data.flags.alt} />
            {weatherData !== null ? 
            <div>
                <h2>Weather in {data.name.common}</h2>
                <p>Temperature: {weatherData.main.temp} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon"/>
                <p>Wind: {weatherData.wind.speed} m/s</p>
            </div> 
            : null}
        </div>
    )
}

export default SingleCountry;
