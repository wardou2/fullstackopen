import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ country }) => {
  const key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const [lat, lng] = country.capitalInfo.latlng;
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric`
      )
      .then(({ data }) => {
        console.log(data);
        setWeather(data);
      });
  }, []);

  if (!weather) return <></>;

  return (
    <>
      <h3>Weather in {country.capital[0]}</h3>
      <div>temperature {weather.main.temp} Celcius</div>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      ></img>
      <div>wind {weather.wind.speed} mph</div>
    </>
  );
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>{`capital ${country.capital[0]}`}</div>
      <div>{`area ${country.area}`}</div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.entries(country.languages).map((entry) => {
            return <li key={entry[0]}>{entry[1]} </li>;
          })}
        </ul>
      </div>
      <img src={country.flags.png} alt="flag"></img>
      <Weather country={country} />
    </div>
  );
};

function App() {
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [customShow, setCustomShow] = useState(false);

  const showResults = results.filter((result) =>
    result.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(({ data }) => {
      setResults(data);
    });
  }, []);

  useEffect(() => {
    if (showResults.length === 1) {
      setCurrentCountry(0);
    } else if (!customShow) {
      setCurrentCountry(null);
    }
  }, [showResults, customShow]);

  const handleChange = (e) => {
    setFilter(e.target.value);
    setCustomShow(false);
  };

  const handleShowCountry = (i) => {
    setCurrentCountry(i);
    setCustomShow(true);
  };

  console.log(currentCountry);
  return (
    <div>
      <div>
        find countries
        <input value={filter} onChange={handleChange} />
        {showResults.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : currentCountry !== null ? (
          <CountryDetails country={showResults[currentCountry]} />
        ) : (
          <ul>
            {showResults.map((res, i) => (
              <li key={res.name.common}>
                {res.name.common}
                <button type="button" onClick={() => handleShowCountry(i)}>
                  show
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
