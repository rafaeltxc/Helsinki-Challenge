import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const findWeatherByCoutry = (lat, lon) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        .then(response => response.data)
        .catch(err => console.log(err))
}

export {
    findWeatherByCoutry
}
