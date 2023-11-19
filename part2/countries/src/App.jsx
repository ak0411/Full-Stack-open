import { useState, useEffect } from 'react'
import getCountries from './services/countries'
import getWeather from './services/weather'
import SearchForm from './components/SearchForm'
import Content from './components/Content'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getCountries().then(initialCountries => {
      setCountries(initialCountries) 
    })
    .catch(error => {
      console.log('Cannot load countries')
    })
  }, [])

  useEffect(() => {
    const countriesToShow = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase()))
    setFilteredCountries(countriesToShow)
  }, [search])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      getWeather(filteredCountries[0].capitalInfo.latlng[0], filteredCountries[0].capitalInfo.latlng[1])
      .then(weatherData => {
        setWeather(weatherData)
      })
      .catch(error => {
        console.log('Cannot load weather')
      })
    }
  }, [filteredCountries])

  const handleView = selectedCountry => {
    setFilteredCountries(filteredCountries.filter(country => 
      country.name.common.toLowerCase().includes(selectedCountry.name.common.toLowerCase())))
  }
  
  return (
    <>
      <SearchForm value={search} onChange={(event) => setSearch(event.target.value)} />
      <Content countries={filteredCountries} search={search} handleView={handleView} weather={weather} />
    </>
  )
}

export default App