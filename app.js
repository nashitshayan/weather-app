const form = document.getElementById('searchForm');
const btnSearch = document.getElementById('btnSearch');

const apiKey = '4311a715553625ac01e218822f2d46f9';

const geocodingURL = (city) =>
	`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

const currentWeatherURL = (lat, lon) =>
	`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const getCoordinates = async (urlForCoords) => {
	const locationResponse = await fetch(urlForCoords);
	const locationData = await locationResponse.json();
	console.log(locationData);
	return [locationData[0].lat, locationData[0].lon];
};

const getWeatherData = async (lat, lon) => {
	const urlForWeather = currentWeatherURL(lat, lon);
	const weatherResponse = await fetch(urlForWeather);
	const weatherData = await weatherResponse.json();
	return weatherData;
};

const processWeatherData = (data) => {
	const tempData = {
		feels_like: data.main.feels_like,
		grnd_level: data.main.grnd_level,
		humidity: data.main.humidity,
		pressure: data.main.pressure,
		sea_level: data.main.sea_level,
		temp: data.main.temp,
		temp_max: data.main.temp_max,
		temp_min: data.main.temp_min,
	};
	const city = data.name;
	const country = data.sys.country;
	const description = data.weather[0].description;
	const mainHeading = data.weather[0].main;

	//console.log(tempData, city, country, description, mainHeading);
};

const fetchWeatherData = async (location) => {
	const urlForCoords = geocodingURL(location);
	const [lat, lon] = await getCoordinates(urlForCoords);
	const weatherData = await getWeatherData(lat, lon);
	//	console.log(weatherData);
	processWeatherData(weatherData);
};

const handleSubmit = (e) => {
	let input = document.getElementById('searchBar');
	//	console.log();
	fetchWeatherData(input.value);
	e.preventDefault();
};

form.addEventListener('submit', handleSubmit);
