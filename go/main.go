package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// We set Gin to release mode to remove debug messages
	gin.SetMode(gin.DebugMode)
	// gin.SetMode(gin.ReleaseMode)

	r := gin.Default()

	r.GET("/ping", pong)
	r.POST("/api", getWeather)

	r.Run("0.0.0.0:8082")
}

func pong(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

type CityData struct {
	City string `json:"name"`
}

func getWeather(c *gin.Context) {
	// Bind the received json to a struct to process data
	var jsonData CityData
	c.BindJSON(&jsonData)

	weatherData := fetchWeather(jsonData.City)

	// Since golang doesn't handle json well by Default
	// We map it using the encoding/json library
	var jsonMap map[string]interface{}
	json.Unmarshal([]byte(weatherData), &jsonMap)

	// Send back 200 status and the mapped json data
	c.IndentedJSON(http.StatusOK, jsonMap)
}

func fetchWeather(city string) (string){
	// My API key works upto one request per second
	const APIKey = "8ce3cf9a578c63f103908752ed6733df"

	url := "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey

	// Fetch data from the API
	req, _ := http.Get(url)
	// Extract the body and return it
	body, _ := ioutil.ReadAll(req.Body)
	return string(body)
}
