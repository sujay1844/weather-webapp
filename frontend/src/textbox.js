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
