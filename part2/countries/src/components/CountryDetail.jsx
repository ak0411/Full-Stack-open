const CountryDetail = ({country, weather}) => {
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
            <h3>Weather in {country.capital[0]}</h3>
            <div>temperature {weather.list[0].main.temp} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}/>
            <div>wind {weather.list[0].wind.speed} m/s</div>
        </div>
    )
}

export default CountryDetail