import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.listen(
	PORT,
	() => console.log(`app running on http://localhost:${PORT}`)
);

// Test API
app.get('/ping',  (req, res) => {
	res.status(200).send({
		message: 'pong'
	});
});

app.post('/api',  (req, res) => {
	const { name } = req.body;

	// Name cannot be empty
	!name && res.status(422).send({ message: 'Invalid name'});

	(async () => {
		res.status(200).send(await fetchData(name))
	})();
});
async function fetchData(city) {
	let APIKey = getAPIKey()

	let response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`);
	let data = await response.json();

	return data;
}

function getAPIKey() {
	dotenv.config()
	let APIKEY = process.env.APIKEY;
	return APIKEY;
}
