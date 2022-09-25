import fetch from 'node-fetch';
import express from 'express';
const app = express();
const PORT = 8081;

app.use(express.json());
app.listen(
	PORT,
	() => console.log(`app running on http://localhost:${PORT}`)
);

// Test API
app.get('/text', (req, res) => {
	res.status(200).send({
		foo: 'bar'
	});
});

app.post('/api', (req, res) => {
	const { name } = req.body;

	// Name cannot be empty
	!name && res.status(422).send({ message: 'Invalid name'});

	(async () => {
		res.status(200).send(await fetchData(name))
	})();
});
async function fetchData(city) {
	// This API key can handle one request every second
	const APIKey = "8ce3cf9a578c63f103908752ed6733df";

	let response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`);
	let data = await response.json();

	return data;
}
