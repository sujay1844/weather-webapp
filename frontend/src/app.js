const REMOTE = 0;

function fetchData() {
	let city = document.getElementById('city').value;
	let backend = getBackend();

	document.getElementById("weather-data").innerHTML = `Backend: ${backend}<br>Fetching data...`
	document.getElementById("weather-data").innerHTML = `<img id="buffer" 
		src="images/buffer.gif" 
		alt="Fetching data...<br>Backend: ${backend}">
		<br>Backend: ${backend}`;
	sendRequest(city, backend);
}

function editHTML(data) {
	let html;
	try {
		html = ` ${data.name} (${data.sys.country}):&ensp;${data.weather[0].description}<br>
			Temp: ${Math.round(data.main.temp) / 10.0}°C<br>
			Feels like: ${Math.round(data.main.feels_like) / 10.0}°C<br>
			Min: ${Math.round(data.main.temp_min) / 10.0 }°C &ensp; Max: ${Math.round(data.main.temp_max) / 10.0}°C<br>
			Humidity: ${data.main.humidity}%<br>`;
	}
	catch(err) {
		if(data.hasOwnProperty('message')) {
			html = data.message;
		} else {
			html = `An error occured.\n Error message: ${err}`;
		}
	}
	// Edit the HTML to display the weather
	document.getElementById("weather-data").innerHTML = html;
}

async function sendRequest(city, backend) {
	let APIURL = getAPIURL(backend, REMOTE);
	axios({
		method: 'get',
		url: APIURL + "/get/" + city,
	})
	.then(res => res.data)
	.then(data => editHTML(data))
	// .catch(err => cityNotFound(city, err));
}

function getAPIURL(backend, remote) {
	if (backend == "node") {
		if (remote == 0) {
			return "https://weather-webapp-backend-node.herokuapp.com/api"
		} else {
			return "http://localhost:5000/api"
		}
	}
	else if (backend == "go") {
		if (remote == 0) {
			return "https://weather-webapp-backend-go.herokuapp.com/weather"
		} else {
			return "http://localhost:3000/weather"
		}
	} else {
		if (remote == 0) {
			return "https://weather-webapp-backend-go.herokuapp.com/weather"
		} else {
			return "http://localhost:3000/weather"
		}
	}
}

function setBackend(backend) {
	document.cookie = `backend=${backend}`;
}

function getBackend() {
	let cookieData = document.cookie.split(';');
	try {
		// Finds the index of the backend data in the cookie
		let index = -1;
		for (let i = 0; i < cookieData.length; i++) {
			if (cookieData[i].includes("backend")) {
				index = i;
				break;
			} else {
				index = -1;
			}
		}
		if (index != -1) {
			let backend = cookieData[index].trim().substring(8).trim();
			return backend;
		} else {
			throw "Backend not selected";
		}
	}
	catch(err) {
		console.log("Backend not selected. Using go(default). Error: "+err)
		setBackend("go");
		return "go";
	}
}

// Pressing enter in a textbox doesn't do anything by default.
// Here a button click is simulated when enter is pressed.
document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("city").addEventListener("keypress", (event) => {
		if (event.key == "Enter") {
			document.getElementById("submit").click();
		}
	});
	document.getElementById("city").addEventListener("keyup", (event) => {
		let city = document.getElementById('city').value;
		sendSearchData(city, getBackend());
	})
});
async function sendSearchData(city, backend) {
	let APIURL = getAPIURL(backend, REMOTE);
	axios({
		method: 'get',
		url: APIURL + "/search/" + city,
	})
	.then(res => res.data)
	.then(data => dropdown(data))
}
function dropdown(data) {
	let html = "";
	for (i =0; i< data.length; i++) {
		html += `${data[i].name}, ${data[i].country} <br>`;
	}

	document.getElementById("weather-data").innerHTML = html;
}
