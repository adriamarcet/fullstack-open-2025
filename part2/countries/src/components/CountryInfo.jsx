import { useEffect, useState } from "react";
import {getCityGeoCode, getOpenWeatherBase} from "../services/openweathermap";


const CountryInfo = ({data: result}) => {
    const languages = Object.values(result.languages);
    const capitalName = result.capital?.[0] || 'N/A';
    const [coords, setCoords] = useState({ lat: null, lon: null });
    const [currentWeather, setCurrentWeather] = useState({temp: null, sky: null, icon: null})

    useEffect(() => {
        getCityGeoCode(result.capital, result.cca2)
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const { lat, lon } = data[0];
                setCoords({ lat, lon });
            }
        })
        .catch(err => console.error(err));
    }, [result.capital, result.cca2]);

    useEffect(() => {
        if (coords.lat == null || coords.lon == null) return;

        getOpenWeatherBase(coords.lat, coords.lon)
            .then(result => {
                setCurrentWeather({
                    temp: result.current.temp,
                    sky: result.current.weather[0].main,
                    icon: result.current.weather[0].icon
                })
            })
            .catch(err => console.error(err));

    }, [coords.lat, coords.lon]);

    return (
        <article>
            <h1>{result.name.common}</h1>
            <ul>
                <li>Capital: {capitalName}</li>
                <li>Area: {result.area}</li>
                <li>
                    {
                        languages.length > 1 ? (
                            <>
                                <span>Spoken languages: </span>
                                <ul>
                                    {
                                        languages.map((l, idx) => <li key={idx}><span>{l}</span></li>)
                                    }
                                </ul>
                            </>
                        ) : (
                            <>
                                <span>Spoken language: </span>
                                <span>{languages[0]}</span>
                            </>
                        )
                    }
                </li>
            </ul>
            <p style={{"display": "flex", "flexDirection": "column"}}>
                <span>Flag:</span>
                <span style={{"fontSize": "5rem"}}>{result.flag}</span>
            </p>
            { currentWeather.temp !== null ? (
                <section>
                    <h2>Weather in {capitalName}</h2>
                    <ul>
                        <li>Temperature: {currentWeather.temp} °C </li>
                        <li>
                            <span>Sky: </span>
                            <span>{currentWeather.sky}</span>
                            <span><img src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`} alt="icon for this weather" /></span>
                        </li>
                    </ul>
                </section>
                ) : ''
            }
        </article>
    )
}

export default CountryInfo;