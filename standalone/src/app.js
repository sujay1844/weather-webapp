function fetchData() {
	// Go to openweathermap and create a free account for an API key.
	const APIKey = "";

	// fetch city name from input
	let city = document.getElementById('city').value;

	let getWeather = async (city) => {
		let response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
			);
		let data = await response.json();

		// Edit the HTML to display the weather
		document.getElementById("weather-data").innerHTML = `
			${data.name} (${data.sys.country}):&ensp;${data.weather[0].description}<br>
			Temp: ${Math.round(data.main.temp) / 10.0}°C<br>
			Feels like: ${Math.round(data.main.feels_like) / 10.0}°C<br>
			Min: ${Math.round(data.main.temp_min) / 10.0 }°C &ensp; Max: ${Math.round(data.main.temp_max) / 10.0}°C<br>
			Humidity: ${data.main.humidity}%<br>`;
		// console.log(data);
	}
	getWeather(city);
}
