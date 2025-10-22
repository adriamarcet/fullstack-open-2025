import axios from "axios";

const OW_API_KEY = import.meta.env.VITE_OWM_API_KEY;

const getCityGeoCode = (city, code) => {
    const cityGeoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${code}&appid=${OW_API_KEY}`;
    const request = axios.get(cityGeoCode)
    return request.then(response => response.data)
}

const getOpenWeatherBase = (lat, lon) => {
    const openWeatherBaseUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OW_API_KEY}&units=metric`;
    const request = axios.get(openWeatherBaseUrl)
    return request.then(response => response.data)
}

export { getCityGeoCode, getOpenWeatherBase };