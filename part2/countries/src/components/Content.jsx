import CountryDetail from "./CountryDetail"

const Content = ({countries}) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countries.length <= 10 && countries.length > 1) {
        return (
        <ul>
            {countries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
        </ul>
        )
    } else if (countries.length === 1) {
        return <CountryDetail country={countries[0]} />
    } else {
        return null
    }
}

export default Content
  