import { useState, useEffect } from 'react'
import getCountries from './services/countries'
import SearchForm from './components/SearchForm'
import Content from './components/Content'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getCountries().then(initialCountries => {
    setCountries(initialCountries) 
    })
    .catch(error => {
      console.log('Cannot load countries')
    })
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase()))
  
  return (
    <>
      <SearchForm value={search} onChange={(event) => setSearch(event.target.value)} />
      <Content countries={countriesToShow} />
    </>
  )
}

export default App
