function fetchData() {
	const APIKey = "8ce3cf9a578c63f103908752ed6733df";

	let city = document.getElementById('city').value;

	let getWeather = async (city) => {
		let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`);
		let data = await response.json();
		document.getElementById("weather-data").innerHTML = `
			${data.name} (${data.sys.country}):&ensp;${data.weather[0].description}<br>
			Temp: ${Math.round(data.main.temp) / 10.0}°C<br>
			Feels like: ${Math.round(data.main.feels_like) / 10.0}°C<br>
			Min: ${Math.round(data.main.temp_min) / 10.0 }°C &ensp; Max: ${Math.round(data.main.temp_max) / 10.0}°C<br>
			Humidity: ${data.main.humidity}%<br>`;
		console.log(data);
	}
	getWeather(city);
}
