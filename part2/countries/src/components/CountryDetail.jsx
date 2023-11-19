const CountryDetail = ({country}) => {
    return (
        <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
            {Object.keys(country.languages).map(language => <li key={language}>{country.languages[language]}</li>)}
        </ul>
        <img src={country.flags.svg} width='150'/>
        </div>
    )
}

export default CountryDetail