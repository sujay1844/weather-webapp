# A simple weather app

I built a simple weather app to get a deeper understanding of front-end development and APIs.
It is deployed on https://weather-webapp-basic.herokuapp.com/

This project uses Openweathermap API.

I could have made it look prettier, added animations or more functionality. But you can't learn multiple things at once.

- It uses a separate front-end and back-end.
- It supports two back-ends namely, NodeJS and Golang. You can choose which back-end to use in the homepage.
- And it uses Redis for autocomplete suggestions.

# Running it locally

- Run the following commands in a Linux terminal. (docker is required)
```bash
git clone https://github.com/sujay1844/weather-webapp.git
cd weather-webapp/
sed -i 's/^const LOCAL = 0;/const LOCAL = 1;/' ./frontend/src/app.js
sudo docker compose up -d
```
- Go to [localhost:8080](http://localhost:8080) in your web browser
- And after you're done playing around, run `sudo docker compose down`
