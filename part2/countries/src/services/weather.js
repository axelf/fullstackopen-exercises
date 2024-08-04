import axios from "axios";
const baseUrl = "http://api.openweathermap.org";
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_APIKEY;

const getCityWeather = (cityName, countryCode) => {
	const request = axios.get(
		`${baseUrl}/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${apiKey}`
	);

	return request
		.then((response) => {
			const geoData = response.data[0];
			return axios.get(
				`${baseUrl}/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=metric&appid=${apiKey}`
			);
		})
		.then((response) => response.data);
};

export default {
	getCityWeather,
};
