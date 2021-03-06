const form = document.getElementById('searchForm');
const btnSearch = document.getElementById('btnSearch');
const cityName = document.querySelector('.cityName');
const currentDate = document.querySelector('.currentDate');
const temp = document.querySelector('.temp');
const weatherIcon = document.querySelector('.weatherIcon');
const description = document.querySelector('.description');
const feelsLike = document.querySelector('.feelsLike');
const humidity = document.querySelector('.humidity');
const minMax = document.querySelector('.minMax');
const card = document.querySelector('.card');

const apiKey = '4311a715553625ac01e218822f2d46f9';

const fetchWeatherData = async (location) => {
	try {
		const urlForCoords = geocodingURL(location);
		const [lat, lon] = await getCoordinates(urlForCoords);
		const weatherData = await getWeatherData(lat, lon);
		//	console.log(weatherData);
		const processedData = processWeatherData(weatherData);
		updateDOM(processedData);
	} catch {
		alert('Error: City Not Found');
	}
};

const geocodingURL = (city) =>
	`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

const currentWeatherURL = (lat, lon) =>
	`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const getCoordinates = async (urlForCoords) => {
	try {
		const locationResponse = await fetch(urlForCoords);
		const locationData = await locationResponse.json();
		return [locationData[0].lat, locationData[0].lon];
	} catch {
		alert('Error: Unable to Fetch Co-ordinates');
	}
};
const getWeatherData = async (lat, lon) => {
	try {
		const urlForWeather = currentWeatherURL(lat, lon);
		const weatherResponse = await fetch(urlForWeather);
		const weatherData = await weatherResponse.json();
		return weatherData;
	} catch {
		alert('Error: Unable to Fetch Co-ordinates');
	}
};

const processWeatherData = (data) => {
	const tempData = {
		feels_like: data.main.feels_like,
		humidity: data.main.humidity,
		pressure: data.main.pressure,
		temp: data.main.temp,
		temp_max: data.main.temp_max,
		temp_min: data.main.temp_min,
	};
	const city = data.name;
	const country = data.sys.country;
	const description = data.weather[0].description;
	const mainHeading = data.weather[0].main;

	return { tempData, city, country, description, mainHeading };
};

const updateDOM = (data) => {
	// card.innerHTML = ``;
	let cDate = new Date().toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	cityName.textContent = data.city;
	currentDate.textContent = cDate;
	temp.innerHTML = `${data.tempData.temp}&#8451;`;
	//weatherIcon.textContent = data.weatherIcon;
	description.textContent = data.mainHeading;
	feelsLike.innerHTML = `Feels like: ${data.tempData.feels_like}&#8451;`;
	humidity.textContent = `Humidity: ${data.tempData.humidity}%`;
	minMax.innerHTML = `Min / Max : ${data.tempData.temp_min}&#8451; / ${data.tempData.temp_max}&#8451;`;
	card.style.display = 'block';
};

const handleSubmit = (e) => {
	let input = document.getElementById('searchBar');
	//	console.log();
	fetchWeatherData(input.value);
	e.preventDefault();
};

form.addEventListener('submit', handleSubmit);
