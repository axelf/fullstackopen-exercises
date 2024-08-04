import { useState, useEffect } from "react";
import axios from "axios";
import weatherService from "./services/weather";

function App() {
	const [countries, setCountries] = useState([]);
	const [countriesFiltered, setCountriesFiltered] = useState([]);
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	useEffect(() => {
		if (countriesFiltered.length === 1) {
			const country = countriesFiltered[0];

			weatherService.getCityWeather(country.capital[0], country.cca2).then((weather) => {
				setWeatherData(weather);
			});
		}
	}, [countriesFiltered]);

	const findCountries = (e) => {
		const value = e.target.value;
		if (value === "") {
			setCountriesFiltered([]);
			return;
		}

		const found = countries.filter((country) => {
			const regexp = new RegExp(value, "i");
			return country.name.common.match(regexp);
		});

		setCountriesFiltered(found);
	};

	const findCountryByName = (name) => {
		const found = countries.find((country) => {
			return country.name.common === name;
		});

		setCountriesFiltered([found]);
	};

	const render = () => {
		if (countriesFiltered.length > 10) {
			return <div>Too many matches, specify another filter</div>;
		}

		if (countriesFiltered.length === 1 && weatherData) {
			const country = countriesFiltered[0];

			return (
				<>
					<h2>{country.name.common}</h2>
					<p>Capital: {country.capital}</p>
					<p>
						Area: {country.area} m<sup>2</sup>
					</p>
					<p>Languages:</p>
					<ul>
						{Object.keys(country.languages).map((key) => {
							return <li key={key}>{country.languages[key]}</li>;
						})}
					</ul>
					<div>
						<img src={country.flags.svg} width="160px" />
					</div>
					<h2>Weather in {country.capital}</h2>
					<p>Temperature: {weatherData.main.temp} Celcius</p>
					<p>
						<img
							src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
							alt={weatherData.weather[0].description}
						/>
					</p>
					<p>Wind: {weatherData.wind.speed} m/s</p>
				</>
			);
		}

		return countriesFiltered.map((country) => {
			return (
				<div key={country.cca2}>
					{country.name.common}{" "}
					<button
						onClick={() => {
							findCountryByName(country.name.common);
						}}
					>
						show
					</button>
				</div>
			);
		});
	};

	return (
		<div>
			find countries <input type="text" onChange={findCountries} />
			{render()}
		</div>
	);
}

export default App;
