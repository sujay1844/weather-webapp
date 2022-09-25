function fetchData() {
	let city = document.getElementById('city').value;
	(async () => {
		let data = await sendRequest(city);
		editHTML(data);
	})();
}
function editHTML(data) {
	// Edit the HTML to display the weather
	document.getElementById("weather-data").innerHTML = `
		${data.name} (${data.sys.country}):&ensp;${data.weather[0].description}<br>
		Temp: ${Math.round(data.main.temp) / 10.0}°C<br>
		Feels like: ${Math.round(data.main.feels_like) / 10.0}°C<br>
		Min: ${Math.round(data.main.temp_min) / 10.0 }°C &ensp; Max: ${Math.round(data.main.temp_max) / 10.0}°C<br>
		Humidity: ${data.main.humidity}%<br>`;
}
async function sendRequest(city) {
	const APIURL = 'http://localhost:8081/api';
	const cityData = { name: city};

	let response = await fetch(APIURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify(cityData),
	})
	.catch(err => console.log(err));
	let data = await response.json();
	return data;
}
