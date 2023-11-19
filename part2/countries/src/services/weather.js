import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (lat, lon) => {
  const request = axios.get(`${baseUrl}units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`)
  return request.then(response => response.data)
}

export default getWeather